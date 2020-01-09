using App.RFPSystem.Services;
using App.RFPSystem.Services.RMG;
using Applications.Operations;
using Applications.Operations.RMG;
using Common.DataObjects;
using Common.DataObjects.RFP;
using Common.DataObjects.RMG;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace Application.RMGSystem.Controllers
{
    [Authorize]
    [ApiController]
    public class JobCategoryController :BaseController
    {
        [Route("api/V1/JobCategory/GetList")]
        [HttpGet]
        public async Task<IActionResult> GetList(int? id, string code, string description, int jobFamilyId, string status, string startDate, string endDate)
        {
            try
            {
                IEnumerable<JobCategory> list = new List<JobCategory>();

                using (ISyncJobCategory service = new JobCategoryService())
                {
                    list = await service.GetList(id ?? 0, code, description, jobFamilyId, status, startDate, endDate);
                }

                return Ok(list);
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [Route("api/V1/JobCategory/Save")]
        [HttpPost]
        public async Task<IActionResult> Save(JobCategory item)
        {
            try
            {
                bool status = false;
                using (ISyncJobCategory service = new JobCategoryService())
                {
                    item.CreatedBy = item.ModifiedBy = UserID.ToString();
                    status = await service.Save(item) > 0;
                }

                return Ok(status);
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [Route("api/V1/JobCategory/Delete")]
        [HttpPut]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                bool status = false;
                using (ISyncJobCategory service = new JobCategoryService())
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

