using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using RMG.Models;

namespace RMG.Controllers
{
    [Route("api/[controller]")]
    public class NewjobrequirementControllers :Controller
    {


        [HttpGet("[action]")]
        public IEnumerable<RMG.Models.newjobrequirementAttribute> GetAllNewJobRequirement()
        {
            newjobrequirementContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.newjobrequirementContext)) as newjobrequirementContext;

            return context.GetAllNewJobRequirement();
        }

        [HttpPost("[action]")]
        public int AddNewJob([FromBody]newjobrequirementAttribute createnewjob)
        {
            newjobrequirementContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.newjobrequirementContext)) as newjobrequirementContext;
            //foreach (RMG.Models.ProjectAttribute p in project)
            //{
            context.AddNewJob(createnewjob);
            //}
            return 1;
        }
        [HttpPost("[action]")]
        public int ImportNewJob([FromBody]List<newjobrequirementAttribute> createnewjob)
        {
            newjobrequirementContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.newjobrequirementContext)) as newjobrequirementContext;
            foreach (RMG.Models.newjobrequirementAttribute njob in createnewjob)
            {
                context.AddNewJob(njob);
            }
            return 1;
        }
    }
}
