using App.RFPSystem.Services;
using App.RFPSystem.Services.RMG;
using Applications.Operations;
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
    public class DepartmentsController : BaseController
    {
        [Route("api/V1/Departments/GetList")]
        [HttpGet]
        public async Task<IActionResult> GetList(int? id, string code, string status, string startDate, string endDate)
        {
            try
            {
                IEnumerable<Department> list  = new List<Department>();

                using (ISyncDepartment service = new DepartmentService())
                {
                    list = await service.GetList(id ?? 0, code, status, startDate, endDate);
                }

                return Ok(list);
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [Route("api/V1/Departments/Save")]
        [HttpPost]
        public async Task<IActionResult> Save(Department item)
        {
            try
            {
                bool status = false;
                using (ISyncDepartment service = new DepartmentService())
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

        [Route("api/V1/Departments/Delete")]
        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                bool status = false;
                using (ISyncDepartment service = new DepartmentService())
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