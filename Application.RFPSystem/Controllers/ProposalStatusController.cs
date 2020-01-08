using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Threading.Tasks;
using App.RFPSystem.Services;
using App.RFPSystem.Services.RFP;
using Application.RulesSetup;
using Applications.Operations;
using Applications.Operations.RFP;
using Common.DataObjects;
using Common.DataObjects.RFP;
using LiteDB;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
//using System.Web.Mvc;

namespace Application.RFPSystem.Controllers
{
    [Authorize]
    [ApiController]
    public class ProposalStatusController : BaseController
    {
        [Route("api/V1/ProposalStatus/GetList")]
        [HttpGet]
        public async Task<IActionResult> GetList(int status, int proposalId)
        {
            try
            {
                IEnumerable<ProposalStatus> list = new List<ProposalStatus>();

                using (ISyncProposalStatus service = new ProposalStatusService())
                {
                    list = await service.GetList(status, proposalId);
                }

                return Ok(list);
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [Route("api/V1/ProposalStatus/Save")]
        [HttpPost]
        public async Task<IActionResult> Save(ProposalStatus item)
        {
            try
            {
                bool status = false;
                using (ISyncProposalStatus service = new ProposalStatusService())
                {
                    status = await service.Save(item) > 0;
                }

                return Ok(status);
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [Route("api/V1/ProposalStatus/Delete")]
        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                bool status = false;
                using (ISyncProposalStatus service = new ProposalStatusService())
                {
                    status = await service.Delete(id) > 0;
                }

                return Ok(status);
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }
        }

    }
}