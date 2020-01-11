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
    public class JobSubCategoryController : BaseController
    {
        [Route("api/V1/JobSubCategory/GetList")]
        [HttpGet]
        public async Task<IActionResult> GetList(int? id, string code, string description, int jobFamilyId, int categoryId, string status, string startDate, string endDate)
        {
            try
            {
                IEnumerable<JobSubCategory> list = new List<JobSubCategory>();

                using (ISyncJobSubCategory service = new JobSubCategoryService())
                {
                    list = await service.GetList(id ?? 0, code, description, jobFamilyId, categoryId, status, startDate, endDate);
                }

                return Ok(list);
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [Route("api/V1/JobSubCategory/Save")]
        [HttpPost]
        public async Task<IActionResult> Save(JobSubCategory item)
        {
            try
            {
                bool status = false;
                using (ISyncJobSubCategory service = new JobSubCategoryService())
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

        [Route("api/V1/JobSubCategory/Delete")]
        [HttpPut]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                bool status = false;
                using (ISyncJobSubCategory service = new JobSubCategoryService())
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
