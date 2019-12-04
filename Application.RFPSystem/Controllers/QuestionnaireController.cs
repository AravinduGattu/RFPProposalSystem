using App.RFPSystem.Services;
using Applications.Operations;
using Common.DataObjects;
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
    public class QuestionnaireController : ControllerBase
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
                    status = await service.Save(item) > 0;
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