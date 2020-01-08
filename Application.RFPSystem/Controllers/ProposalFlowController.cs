using App.RFPSystem.Services.RFP;
using Applications.Operations.RFP;
using Common.DataObjects.RFP;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
//using System.Web.Mvc;

namespace Application.RFPSystem.Controllers
{
    //[Authorize]
    [ApiController]
    public class ProposalFlowController : BaseController
    {
        [Route("api/V1/ProposalFlow/GetList")]
        [HttpGet]
        public async Task<IActionResult> GetList()
        {
            try
            {
                IEnumerable<ProposalFlow> list = new List<ProposalFlow>();

                using (ISyncProposalFlow service = new ProposalFlowService())
                {
                    list = await service.GetList();
                }

                return Ok(list);
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }
        }
    }
}