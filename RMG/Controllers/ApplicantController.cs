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

    public class ApplicantController : Controller
    {

        [HttpGet("[action]")]
        public IEnumerable<RMG.Models.ApplicantAttribute> GetAllApplicantprofile()
        {
            ApplicantContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ApplicantContext)) as ApplicantContext;

            return context.GetAllApplicantprofile();
        }


        [HttpGet("[action]")]
        public IEnumerable<RMG.Models.ApplicantAttribute> ApplicantsearchQuery(string query)
        {
            ApplicantContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ApplicantContext)) as ApplicantContext;

            return context.ApplicantsearchQuery(query);
        }
    }
}
    
