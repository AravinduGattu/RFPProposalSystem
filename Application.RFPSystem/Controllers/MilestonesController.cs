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
    public class MilestonesController : BaseController
    {
        [Route("api/V1/Milestones/GetList")]
        [HttpGet]
        public async Task<IActionResult> GetList(int proposalId, int milestoneId)
        {
            try
            {
                IEnumerable<Milestone> list  = new List<Milestone>();

                using (ISyncMilestone service = new MilestoneService())
                {
                    list = await service.GetList(proposalId, milestoneId);
                }

                return Ok(list);
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [Route("api/V1/Milestones/Save")]
        [HttpPost]
        public async Task<IActionResult> Save(Milestone item)
        {
            try
            {
                bool status = false;
                using (ISyncMilestone service = new MilestoneService())
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

        [Route("api/V1/Milestones/SaveList")]
        [HttpPost]
        public async Task<IActionResult> SaveList(List<Milestone> list)
        {
            try
            {
                bool status = false;
                using (ISyncMilestone service = new MilestoneService())
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

        [Route("api/V1/Milestones/Delete")]
        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                bool status = false;
                using (ISyncMilestone service = new MilestoneService())
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