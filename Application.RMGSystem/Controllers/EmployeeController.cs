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
    public class EmployeeController: BaseController
    {
        [Route("api/V1/Employee/GetList")]
        [HttpPost]
        public async Task<IActionResult> GetList(Employee employee)
        {
            try
            {
                IEnumerable<Employee> list = new List<Employee>();
                using (ISyncEmployee service = new EmployeeService())
                {
                    list = await service.GetList(employee);
                }

                return Ok(list);
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [Route("api/V1/Employee/Save")]
        [HttpPost]
        public async Task<IActionResult> Save(Employee employee)
        {
            try
            {
                bool status = false;
                using (ISyncEmployee service = new EmployeeService())
                {
                    employee.CreatedBy = employee.ModifiedBy = UserID.ToString();
                    status = await service.Save(employee) > 0;
                }

                return Ok(status);
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [Route("api/V1/Employee/Delete")]
        [HttpPut]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                bool status = false;
                using (ISyncEmployee service = new EmployeeService())
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
