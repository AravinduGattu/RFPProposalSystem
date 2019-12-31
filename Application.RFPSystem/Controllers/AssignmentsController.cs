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
    public class AssignmentsController : BaseController
    {
        [Route("api/V1/Assignments/GetList")]
        [HttpGet]
        public async Task<IActionResult> GetList(int proposalId, int assignmentId)
        {
            try
            {
                IEnumerable<Assignment> list  = new List<Assignment>();

                using (ISyncAssignment service = new AssignmentService())
                {
                    list = await service.GetList(proposalId, assignmentId);
                }

                return Ok(list);
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [Route("api/V1/Assignments/Save")]
        [HttpPost]
        public async Task<IActionResult> Save(Assignment item)
        {
            try
            {
                bool status = false;
                using (ISyncAssignment service = new AssignmentService())
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

        [Route("api/V1/Assignments/Delete")]
        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                bool status = false;
                using (ISyncAssignment service = new AssignmentService())
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