﻿using App.RFPSystem.Services;
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
    public class MilestonesMasterController : BaseController
    {
        [Route("api/V1/MilestonesMaster/GetList")]
        [HttpGet]
        public async Task<IActionResult> GetList(string name)
        {
            try
            {
                IEnumerable<MilestoneMaster> list = new List<MilestoneMaster>();

                using (ISyncMilestoneMaster service = new MilestoneMasterService())
                {
                    list = await service.GetList(name);
                }

                return Ok(list);
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [Route("api/V1/MilestonesMaster/Save")]
        [HttpPost]
        public async Task<IActionResult> Save(MilestoneMaster item)
        {
            try
            {
                bool status = false;
                using (ISyncMilestoneMaster service = new MilestoneMasterService())
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

        [Route("api/V1/MilestonesMaster/Delete")]
        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                bool status = false;
                using (ISyncMilestoneMaster service = new MilestoneMasterService())
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