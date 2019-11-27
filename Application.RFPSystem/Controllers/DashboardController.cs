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
    public class DashboardController : ControllerBase
    {
        [Route("api/V1/GetDataViz")]
        [HttpGet]
        public async Task<IActionResult> GetDatavisualization()
        {
            Task<DatavizCategory_Proposal> datavizCategory_Proposal;

            using (ISyncDataViz syncDataViz = new DataVizServices())
            {
                datavizCategory_Proposal = syncDataViz.datavizCategory_Proposal();
            }

            return Ok(datavizCategory_Proposal);
        }

        [Route("api/V1/GetProposalsGrid")]
        [HttpGet]
        public async Task<IActionResult> GetProposalsGrid(string requestID)
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
    }
}