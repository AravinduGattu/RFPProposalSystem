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
    public class JobtitleController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<JobtitleAttribute> GetAllJobs()
        {
            JobtitleContext context = HttpContext.RequestServices.GetService(typeof(JobtitleContext)) as JobtitleContext;

            return context.GetAllJobs();
        }

        [HttpGet("[action]")]
        public IEnumerable<JobtitleAttribute> jobSearchQuery(string query)
        {
            JobtitleContext context = HttpContext.RequestServices.GetService(typeof(JobtitleContext)) as JobtitleContext;
            return context.jobSearchQuery(query);
        }


        [HttpPost("[action]")]

        public int AddJobs([FromBody]JobtitleAttribute job)                                                             //department -> call from context(obj) 
        {
            JobtitleContext context = HttpContext.RequestServices.GetService(typeof(JobtitleContext)) as JobtitleContext;

            context.AddJobs(job);
            //context.methodname of context adddept(obj)
            return 1;

        }
        [HttpPut("[action]")]
        // [Route("api/customer/Edit")]
        public int UpdateJob([FromBody]JobtitleAttribute job)
        {
            JobtitleContext context = HttpContext.RequestServices.GetService(typeof(JobtitleContext)) as JobtitleContext;
            context.UpdateJob(job);
            return 1;
        }

        [HttpGet("[action]")]
        public void DisableJob(string job_title_code)
        {
            JobtitleContext context = HttpContext.RequestServices.GetService(typeof(JobtitleContext)) as JobtitleContext;
            context.DisableJob(job_title_code);
        }
        [HttpPost("[action]")]
        public int ImportJobs([FromBody]List<JobtitleAttribute> job)//department -> call from context(obj) 
        {
            JobtitleContext context = HttpContext.RequestServices.GetService(typeof(JobtitleContext)) as JobtitleContext;
            foreach (RMG.Models.JobtitleAttribute jta in job)
            {
                context.AddJobs(jta);
            }
            //context.methodname of context adddept(obj)
            return 1;

        }
    }
}
