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
    [Authorize]
    [ApiController]
    public class MilestonesController : BaseController
    {
        [Route("api/V1/Milestones/GetList")]
        [HttpGet]
        public async Task<IActionResult> GetList(int proposalId, int milestoneId)
        {
            try
            {
                IEnumerable<Milestone> list  = new List<Milestone>();

                using (ISyncMilestone service = new MilestoneService())
                {
                    list = await service.GetList(proposalId, milestoneId);
                }

                return Ok(list);
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [Route("api/V1/Milestones/Save")]
        [HttpPost]
        public async Task<IActionResult> Save(Milestone item)
        {
            try
            {
                bool status = false;
                using (ISyncMilestone service = new MilestoneService())
                {
                    item.CreatedBy = item.ModifiedBy = UserID;
                    status = await service.Save(item) > 0;
                }

                return Ok(status);
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [Route("api/V1/Milestones/Delete")]
        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                bool status = false;
                using (ISyncMilestone service = new MilestoneService())
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