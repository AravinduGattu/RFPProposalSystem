using App.RFPSystem.Services;
using App.RFPSystem.Services.RFP;
using Applications.Operations;
using Applications.Operations.RFP;
using Common.DataObjects;
using Common.DataObjects.RFP;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.RFPSystem.Controllers
{
    //[Authorize]
    [ApiController]
    public class PricingController : BaseController
    {
        [Route("api/V1/Pricing/GetList")]
        [HttpGet]
        public async Task<IActionResult> GetList(int proposalId, int pricingId)
        {
            try
            {
                IEnumerable<Pricing> list  = new List<Pricing>();

                using (ISyncPricing service = new PricingService())
                {
                    list = await service.GetList(proposalId, pricingId);
                }

                return Ok(list);
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [Route("api/V1/Pricing/Save")]
        [HttpPost]
        public async Task<IActionResult> Save(Pricing item)
        {
            try
            {
                bool status = false;
                using (ISyncPricing service = new PricingService())
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

        [Route("api/V1/Pricing/Delete")]
        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                bool status = false;
                using (ISyncPricing service = new PricingService())
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