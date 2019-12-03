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
    public class ProposalStatusController : ControllerBase
    {
        [Route("api/V1/CreateProposalStatus")]
        [HttpPost]
        public async Task<IActionResult> CreateRequest([FromForm]ProposalStatus proposalStatus)
        {
            try
            {
                ProposalStatus proposal =
                    JsonConvert.DeserializeObject<ProposalStatus>(Request.Form["proposalStatus"]);

                using (IAsyncValidations asyncValidations = new ValdiateRules())
                {

                    ValidateResponse validateResponse =
                        await asyncValidations.validateProposalStatus(proposalStatus);

                    if (validateResponse.NoErrors)
                    {
                        using (var dbComponent = new LiteDatabase(Constants.DBPath))
                        {
                            LiteCollection<ProposalStatus> createRequestModel =
                                dbComponent.GetCollection<ProposalStatus>("ProposalStatuses");

                            var matchResponse = createRequestModel.Find(proposalStat =>
                                proposalStat.RFPUserID.Equals(proposalStatus.RFPUserID)).Any();


                            if (!matchResponse)
                            {
                                createRequestModel.Insert(proposalStatus);
                                createRequestModel.EnsureIndex(propStat => propStat.RFPUserID);
                            }
                            else
                            {
                                return Ok(new { Reason = "Duplicate Request by ID" + proposalStatus.RFPUserID, InvalidRequest = Request.Form["proposalStatus"].ToString() });
                            }
                        }

                        return Ok(new { Reason = "Success", Response = Request.Form["proposalStatus"].ToString() });
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
        [Route("api/V1/GetProposalStatus")]
        [HttpGet]
        public async Task<IActionResult> GetProposalStatus(string requestID)
        {
            using (var dbComponent = new LiteDatabase(Constants.DBPath))
            {
                List<ProposalStatus>  proposalStatuses = new List<ProposalStatus>();
                LiteCollection<ProposalStatus> getRequestModels =
                    dbComponent.GetCollection<ProposalStatus>("ProposalStatuses");

                if (string.IsNullOrEmpty(requestID))
                {
                    var listAll = getRequestModels.FindAll().ToList();

                    listAll.ForEach(x => proposalStatuses.Add(x));

                    return Ok(listAll);

                }
                else
                {
                    var matchResponse = getRequestModels.Find(x => x.ProposalID.Equals(requestID)).Any();

                    if (matchResponse)
                    {
                        var results = getRequestModels.Find(x => x.ProposalID.Equals(requestID)).ToList();

                        results.ForEach(x => proposalStatuses.Add(x));

                        return Ok(results);
                    }
                    else
                    {
                        return Ok(new { Reason = "Not Found", Response = "No Record on " + requestID });
                    }

                }
            }
        }

    }
}