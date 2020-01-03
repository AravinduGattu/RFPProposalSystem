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
    public class FilesUploadController : BaseController
    {
        [Route("api/V1/FilesUpload/GetList")]
        [HttpGet]
        public async Task<IActionResult> GetList(string name, string category, int proposalId)
        {
            try
            {
                IEnumerable<FileUpload> list  = new List<FileUpload>();

                using (ISyncFileUpload service = new FileUploadService())
                {
                    list = await service.GetList(name, category, proposalId);
                }

                return Ok(list);
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [Route("api/V1/FilesUpload/Save")]
        [HttpPost]
        public async Task<IActionResult> Save(FileUpload item)
        {
            try
            {
                bool status = false;
                using (ISyncFileUpload service = new FileUploadService())
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

        [Route("api/V1/FilesUpload/Delete")]
        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                bool status = false;
                using (ISyncFileUpload service = new FileUploadService())
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