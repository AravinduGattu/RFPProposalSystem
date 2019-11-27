using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Threading.Tasks;
using App.RFPSystem.Services;
using Application.RulesSetup;
using Applications.Operations;
using Common.DataObjects;
using LiteDB;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
//using System.Web.Mvc;

namespace Application.RFPSystem.Controllers
{
    //[Route("api/V1/[controller]")]
    [ApiController]
    public class RFPController : ControllerBase
    {
        [Route("api/V1/GetProposals")]
        [HttpGet]
        public async Task<IActionResult> GetProposals(string requestID)
        {
            try
            {
                using (var dbComponent = new LiteDatabase(Constants.DBPath))
                {
                    List<RFPRequestDataModel> rFPRequestDataModels = new List<RFPRequestDataModel>();
                    LiteCollection<RFPRequestDataModel> getRequestModels =
                        dbComponent.GetCollection<RFPRequestDataModel>("RequestProposals");

                    if (string.IsNullOrEmpty(requestID))
                    {
                        var listAll = getRequestModels.FindAll().ToList();



                        listAll.ForEach(x => rFPRequestDataModels.Add(x));

                        return Ok(listAll);

                    }
                    else
                    {
                        var matchResponse = getRequestModels.Find(x => x.RFPCode.Equals(requestID)).Any();

                        if (matchResponse)
                        {
                            var results = getRequestModels.Find(x => x.RFPCode.Equals(requestID)).ToList();

                            results.ForEach(x => rFPRequestDataModels.Add(x));

                            return Ok(results);
                        }
                        else
                        {
                            return Ok(new { Reason = "Not Found", Response = "No Record on " + requestID });
                        }

                    }
                }
            }
            catch (Exception ex)
            {
                return Ok(ex);
            }
        }

        [Route("api/V1/CreateProposal")]
        [HttpPost]
        public async Task<IActionResult> CreateRequest([FromForm]RFPRequestDataModel proposalDataModel)
        {
            try
            {

                RFPRequestDataModel rFPRequestDataModel =
                    JsonConvert.DeserializeObject<RFPRequestDataModel>(Request.Form["proposalData"]);

                using (IAsyncValidations asyncValidations = new ValdiateRules())
                {

                    ValidateResponse validateResponse =
                        await asyncValidations.validateProposalRequest(rFPRequestDataModel);

                    if (validateResponse.NoErrors)
                    {
                        using (var dbComponent = new LiteDatabase(Constants.DBPath))
                        {
                            LiteCollection<RFPRequestDataModel> createRequestModel =
                                dbComponent.GetCollection<RFPRequestDataModel>("RequestProposals");

                            var matchResponse =
                                createRequestModel.Find(rFPRequest => rFPRequest.RFPCode.Equals(rFPRequestDataModel.RFPCode)).Any();


                            if (!matchResponse)
                            {

                                createRequestModel.Insert(rFPRequestDataModel);

                                createRequestModel.EnsureIndex(rFPRequest => rFPRequest.RFPCode);

                            }
                            else
                            {
                                return Ok(new { Reason = "Duplicate Request by ID" + rFPRequestDataModel.RFPCode, InvalidRequest = Request.Form["proposalData"].ToString() });
                            }
                        }

                        return Ok(new { Reason = "Success", Response = Request.Form["proposalData"].ToString() });
                    }
                    else
                    {
                        return Ok(validateResponse);
                    }
                }
            }
            catch (Exception ex)
            {
                return Ok(ex);
            }


        }

    }
}