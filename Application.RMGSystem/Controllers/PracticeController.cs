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
    public class PracticeController : BaseController
    {
        [Route("api/V1/Practice/GetList")]
        [HttpGet]
        public async Task<IActionResult> GetList(int? id, string code, string status, string startDate, string endDate)
        {
            try
            {
                IEnumerable<PracticeMaster> list  = new List<PracticeMaster>();

                using (ISyncPractice service = new PracticeService())
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

        [Route("api/V1/Practice/Save")]
        [HttpPost]
        public async Task<IActionResult> Save(PracticeMaster item)
        {
            try
            {
                bool status = false;
                using (ISyncPractice service = new PracticeService())
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

        [Route("api/V1/Practice/Delete")]
        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                bool status = false;
                using (ISyncPractice service = new PracticeService())
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