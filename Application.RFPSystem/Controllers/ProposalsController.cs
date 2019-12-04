using App.RFPSystem.Services;
using Applications.Operations;
using Common.DataObjects;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.RFPSystem.Controllers
{
    //[Authorize]
    [ApiController]
    public class ProposalsController : ControllerBase
    {
        [Route("api/V1/Proposals/GetList")]
        [HttpGet]
        public async Task<IActionResult> GetList(int status, int proposalId, int userId)
        {
            try
            {
                IEnumerable<Proposal> list = new List<Proposal>();

                using (ISyncProposal service = new ProposalService())
                {
                    list = await service.GetList(status, proposalId, userId);
                }

                return Ok(list);
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [Route("api/V1/Proposals/GetGrid")]
        [HttpGet]
        public async Task<IActionResult> GetGrid(int status, int proposalId, int userId)
        {
            try
            {
                IEnumerable<ProposalGrid> list = new List<ProposalGrid>();

                using (ISyncProposal service = new ProposalService())
                {
                    list = await service.GetGrid(status, proposalId, userId);
                }

                return Ok(list);
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [Route("api/V1/Proposals/Save")]
        [HttpPost]
        public async Task<IActionResult> Save([FromForm]Proposal item)
        {
            try
            {
                bool status = false;
                using (ISyncProposal service = new ProposalService())
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

        [Route("api/V1/Proposals/Delete")]
        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                bool status = false;
                using (ISyncProposal service = new ProposalService())
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