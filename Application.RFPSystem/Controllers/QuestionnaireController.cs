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
    [Authorize]
    [ApiController]
    public class QuestionnaireController : BaseController
    {
        [Route("api/V1/Questionnaire/GetList")]
        [HttpGet]
        public async Task<IActionResult> GetList(string area, string question, int proposalId)
        {
            try
            {
                IEnumerable<Questionnaire> list = new List<Questionnaire>();

                using (ISyncQuestionnaire service = new QuestionnaireService())
                {
                    list = await service.GetList(area, question, proposalId);
                }

                return Ok(list);
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [Route("api/V1/Questionnaire/Save")]
        [HttpPost]
        public async Task<IActionResult> Save(Questionnaire item)
        {
            try
            {
                bool status = false;
                using (ISyncQuestionnaire service = new QuestionnaireService())
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

        [Route("api/V1/Questionnaire/SaveList")]
        [HttpPost]
        public async Task<IActionResult> SaveList(List<Questionnaire> list)
        {
            try
            {
                bool status = false;
                using (ISyncQuestionnaire service = new QuestionnaireService())
                {
                    if (list != null && list.Count() > 0)
                        list.ForEach(x => { x.CreatedBy = x.ModifiedBy = UserID; });
                    status = await service.SaveList(list) > 0;
                }

                return Ok(status);
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [Route("api/V1/Questionnaire/Delete")]
        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                bool status = false;
                using (ISyncQuestionnaire service = new QuestionnaireService())
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