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
    public class RoleController : BaseController
    {
        [Route("api/V1/RoleMaster/GetList")]
        [HttpGet]
        public async Task<IActionResult> GetList(int? id, string name, string status, string startDate, string endDate)
        {
            try
            {
                IEnumerable<RoleMaster> list  = new List<RoleMaster>();

                using (ISyncRoleMaster service = new RoleService())
                {
                    list = await service.GetList(id ?? 0, name, status, startDate, endDate);
                }

                return Ok(list);
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [Route("api/V1/RoleMaster/Save")]
        [HttpPost]
        public async Task<IActionResult> Save(RoleMaster item)
        {
            try
            {
                bool status = false;
                using (ISyncRoleMaster service = new RoleService())
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

        [Route("api/V1/RoleMaster/Delete")]
        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                bool status = false;
                using (ISyncRoleMaster service = new RoleService())
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