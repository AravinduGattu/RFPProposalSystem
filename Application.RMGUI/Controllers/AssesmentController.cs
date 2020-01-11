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
    public class AssesmentController : Controller
    {

        [HttpGet("[action]")]
        public IEnumerable<AssessmentAttribute> GetAllAssesments()
        {
            AssessmentContext context = HttpContext.RequestServices.GetService(typeof(AssessmentContext)) as AssessmentContext;

            return context.GetAllAssesments();
        }

        [HttpPost("[action]")]

        [HttpGet("[action]")]
        public IEnumerable<AssessmentAttribute> assesmentSearchQuery(string query)
        {
            AssessmentContext context = HttpContext.RequestServices.GetService(typeof(AssessmentContext)) as AssessmentContext;
            return context.assesmentSearchQuery(query);
        }


        [HttpPost("[action]")]

        public int AddAssesments([FromBody]AssessmentAttribute ass)                                                             //department -> call from context(obj) 
        {
            AssessmentContext context = HttpContext.RequestServices.GetService(typeof(AssessmentContext)) as AssessmentContext;

            context.AddAssesments(ass);
            return 1;

        }

        [HttpGet("[action]")]
        public IEnumerable<AsesmtApplicantDrpDwn> GetAsesmntEmployeeDrpDwn()
        {
            AssessmentContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AssessmentContext)) as AssessmentContext;
            return context.GetAsesmntEmployeeDrpDwn();
        }


        [HttpPost("[action]")]
        public int ImportAssesments([FromBody]List<AssessmentAttribute> ass)//department -> call from context(obj) 
        {
            AssessmentContext context = HttpContext.RequestServices.GetService(typeof(AssessmentContext)) as AssessmentContext;
            foreach (RMG.Models.AssessmentAttribute aa in ass)
            {
                context.AddAssesments(aa);
            }
            return 1;

        }

    }
}
