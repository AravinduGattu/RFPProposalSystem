using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RMG.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RMG.Controllers
{
    [Route("api/[controller]")]
    public class JobDescriptionController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<RMG.Models.JobDescriptionAttribute> GetAllJobDescrption()
        {
            JobDescriptionContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.JobDescriptionContext)) as JobDescriptionContext;

            return context.GetAllJobDescrption();
        }

        [HttpGet("[action]")]
        public IEnumerable<RMG.Models.JobDescriptionAttribute> jobdescriptionSearchQuery(string query)
        {
            JobDescriptionContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.JobDescriptionContext)) as JobDescriptionContext;

            return context.jobdescriptionSearchQuery(query);
        }


        [HttpPost("[action]")]        
        public int AddJobDescription([FromBody]JobDescriptionAttribute jobdescription)
        {
            JobDescriptionContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.JobDescriptionContext)) as JobDescriptionContext;

            context.AddJobDescription(jobdescription);
            return 1;

        }

        [HttpPut("[action]")]     
        public int UpdateJobDescription([FromBody]JobDescriptionAttribute jobdescription)
        {
            JobDescriptionContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.JobDescriptionContext)) as JobDescriptionContext;
            context.UpdateJobDescription(jobdescription);
            return 1;
        }
        // For Jobtitle DropDown
        [HttpGet("[action]")]
        public IEnumerable<JobtitedrpdownAttribute> GetJobtitleDropdown()
        {
            JobDescriptionContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.JobDescriptionContext)) as JobDescriptionContext;
            return context.GetJobtitleDropdown();
        }

        //// For  Project Name DropDown
        //[HttpGet("[action]")]
        //public IEnumerable<projectdrp_TA_Attribute> GetProjectnameDropdown()
        //{
        //    JobDescriptionContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.JobDescriptionContext)) as JobDescriptionContext;
        //    return context.GetProjectnameDropdown();
        //}

        // For  Skills DropDown
        [HttpGet("[action]")]
        public IEnumerable<SkillAttribute> GetSkillDropdown()
        {
            JobDescriptionContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.JobDescriptionContext)) as JobDescriptionContext;
            return context.GetSkillDropdown();
        }
        [HttpPost("[action]")]
        public int ImportJobDescription([FromBody]List<JobDescriptionAttribute> jobdescription)
        {
            JobDescriptionContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.JobDescriptionContext)) as JobDescriptionContext;
            foreach (RMG.Models.JobDescriptionAttribute jd in jobdescription)
            {
                context.AddJobDescription(jd);
            }
            return 1;
        }

    }
}
