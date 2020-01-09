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
    public class LocationController : BaseController
    {
        [Route("api/V1/LocationMaster/GetList")]
        [HttpGet]
        public async Task<IActionResult> GetList(int? id,  string code, string status, string country, string city, string region, string postalcode)
        {
            try
            {
                IEnumerable<LocationMaster> list  = new List<LocationMaster>();

                using (ISyncLocationMaster service = new LocationService())
                {
                    list = await service.GetList(id ?? 0, code, status, country, city,region,postalcode);
                }

                return Ok(list);
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [Route("api/V1/LocationMaster/Save")]
        [HttpPost]
        public async Task<IActionResult> Save(LocationMaster item)
        {
            try
            {
                bool status = false;
                using (ISyncLocationMaster service = new LocationService())
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

        [Route("api/V1/LocationMaster/Delete")]
        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                bool status = false;
                using (ISyncLocationMaster service = new LocationService())
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