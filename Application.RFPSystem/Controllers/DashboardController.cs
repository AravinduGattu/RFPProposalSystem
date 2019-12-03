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
        public async Task<IActionResult> GetProposalsGrid(string rfpUser, int? status, int? role)
        {
            try
            {
                using (var dbComponent = new LiteDatabase(Constants.DBPath))
                {
                    List<ProposalGrid> rFPRequestDataModels = new List<ProposalGrid>();
                    LiteCollection<ProposalGrid> getRequestModels =
                        dbComponent.GetCollection<ProposalGrid>("RequestProposals");

                    //role and status/user filters cannot be used together
                    if (role.HasValue && role.Value > 0)
                    {
                        ProposalUsers propRole = (ProposalUsers)role;
                        int[] arr = new int[] { };
                        switch (propRole)
                        {
                            case ProposalUsers.SalesLead:
                                arr = new int[] { (int)ProposalRequestType.Assigned_To_Delivery_Team,
                                    (int)ProposalRequestType.Drafted,
                                    (int)ProposalRequestType.Assigned_To_Delivery_Team };
                                break;
                            case ProposalUsers.PracticeLead:
                                arr = new int[] { (int)ProposalRequestType.Assigned_To_Delivery_Team,
                                    (int)ProposalRequestType.Drafted,
                                    (int)ProposalRequestType.Assigned_To_Delivery_Team };
                                break;
                            case ProposalUsers.PursuitTeamLead:
                                arr = new int[] { (int)ProposalRequestType.Assigned_To_Delivery_Team,
                                    (int)ProposalRequestType.Drafted,
                                    (int)ProposalRequestType.Assigned_To_Delivery_Team };
                                break;
                            case ProposalUsers.DeliveryTeamLead:
                                arr = new int[] { (int)ProposalRequestType.Assigned_To_Delivery_Team,
                                    (int)ProposalRequestType.Drafted,
                                    (int)ProposalRequestType.Assigned_To_Delivery_Team };
                                break;
                            default:
                                break;
                        }
                        rFPRequestDataModels = getRequestModels.Find(x =>
                                arr.Any(p => p.ToString() == x.status)).ToList();
                    }
                    else
                    {
                        rFPRequestDataModels = getRequestModels.Find(x =>
                        (string.IsNullOrEmpty(rfpUser) || x.RFPCode.Equals(rfpUser, StringComparison.InvariantCultureIgnoreCase))
                        && (status.HasValue || status.Value == 0 || x.status == status.ToString())).ToList();
                    }
                    if (rFPRequestDataModels != null && rFPRequestDataModels.Count > 0)
                    {
                        return Ok(rFPRequestDataModels);
                    }
                    else
                    {
                        return Ok(getRequestModels);
                        //return Ok(new { Reason = "Not Found", Response = "No Record on " + rfpUser });
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