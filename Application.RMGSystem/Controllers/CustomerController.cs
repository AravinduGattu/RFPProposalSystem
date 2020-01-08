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
    public class CustomerController : BaseController
    {
        [Route("api/V1/Customer/GetList")]
        [HttpGet]
        public async Task<IActionResult> GetList(int? id, string code, string status, string name, string country, int locationid, string poc)
        {
            try
            {
                IEnumerable<Customer> list  = new List<Customer>();

                using (ISyncCustomer service = new CustomerService())
                {
                    list = await service.GetList(id ?? 0, code, status, name, country, locationid, poc);
                }

                return Ok(list);
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [Route("api/V1/Customer/Save")]
        [HttpPost]
        public async Task<IActionResult> Save(Customer item)
        {
            try
            {
                bool status = false;
                using (ISyncCustomer service = new CustomerService())
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

        [Route("api/V1/Customer/Delete")]
        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                bool status = false;
                using (ISyncCustomer service = new CustomerService())
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