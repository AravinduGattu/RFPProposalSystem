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
    public class ApplicantProfileReviewController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<RMG.Models.ApplicantProfileReview> GetAllApplicantProfileShortlisted()
        {
            ApplicantProfileReviewContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ApplicantProfileReviewContext)) as ApplicantProfileReviewContext;

            return context.GetAllApplicantProfileShortlisted();
        }
        [HttpGet("[action]")]
        public IEnumerable<RMG.Models.ApplicantProfileReview> applicantprofileshortlistSearchQuery(string query)
        {
            ApplicantProfileReviewContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ApplicantProfileReviewContext)) as ApplicantProfileReviewContext;

            return context.applicantprofileshortlistSearchQuery(query);
        }


        [HttpPost("[action]")]
        //[Route("api/Panel/create")]
        public int AddApplicantProfileReview([FromBody]ApplicantProfileReview applicantProfileReview)
        {
            ApplicantProfileReviewContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ApplicantProfileReviewContext)) as ApplicantProfileReviewContext;

            context.AddApplicantProfileReview(applicantProfileReview);

            return 1;

        }
        [HttpPut("[action]")]
        // [Route("api/Panel/Edit")]
        public int UpdateApplicantProfileReview([FromBody]ApplicantProfileReview applicantProfileReview)
        {
            ApplicantProfileReviewContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ApplicantProfileReviewContext)) as ApplicantProfileReviewContext;
            context.UpdateApplicantProfileReview(applicantProfileReview);
            return 1;
        }


        [HttpGet("[action]")]
        // [Route("api/Panel/Delete")]
        public int DeleteApplicantProfileReview(string applicant_profile_review_id)
        {
            ApplicantProfileReviewContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ApplicantProfileReviewContext)) as ApplicantProfileReviewContext;
            context.DeleteApplicantProfileReview(applicant_profile_review_id);
            return 1;
        }
        [HttpGet("[action]")]
        public IEnumerable<EmployeeNameDropdown> EmployeeNameDropdown()
        {
            ApplicantProfileReviewContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ApplicantProfileReviewContext)) as ApplicantProfileReviewContext;
            return context.EmployeeNameDropdown();
        }
        [HttpGet("[action]")]
        public IEnumerable<ApplicantDropDown> ApplicantDropdown()
        {
            ApplicantProfileReviewContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ApplicantProfileReviewContext)) as ApplicantProfileReviewContext;
            return context.ApplicantDropdown();
        }
        [HttpPost("[action]")]
        //[Route("api/Panel/create")]
        public int ImportApplicantProfileReview([FromBody]List<ApplicantProfileReview> applicantProfileReview)
        {
            ApplicantProfileReviewContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ApplicantProfileReviewContext)) as ApplicantProfileReviewContext;
            foreach (RMG.Models.ApplicantProfileReview aa in applicantProfileReview)
            {
                context.AddApplicantProfileReview(aa);
            }
            return 1;

        }
    }
}
