using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RMG.Models;

namespace RMG.Controllers
{
    [Route("api/[controller]")]
    public class ResourceReqController : Controller
    {
        [HttpPost("[action]")]
        //  [Route("api/ResourceReqAttribute/Create")]
        public object Create([FromBody] ResourceReqAttribute resreq)
        {
            ResourceReqContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ResourceReqContext)) as ResourceReqContext;
            return context.AddResReq(resreq);
             


        }
        [HttpGet("[action]")]
        public IEnumerable<ProjectdropdownAttribute> GetProjectDropdown()
        {
            ResourceReqContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ResourceReqContext)) as ResourceReqContext;
            return context.GetProjectDropdown();
        }

        //[HttpGet("[action]")]
        //public IEnumerable<CustomerdropdownAttribute> GetCustomerDropdown()
        //{
        //    ResourceReqContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ResourceReqContext)) as ResourceReqContext;
        //    return context.GetCustomerDropdown();
        //}

        //[HttpGet("[action]")]
        //public string ResReqid()
        //{
        //    ResourceReqContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ResourceReqContext)) as ResourceReqContext;
        //    return context.ResReqid();
        //}

        //[HttpGet("[action]")]
        //public string getPResreq()
        //{
        //    ResourceReqContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ResourceReqContext)) as ResourceReqContext;
        //    return context.ResReqid();
        //}
        [HttpGet("[action]")]
        public object RRFPSearcgQuery(string query)
        {
            ResourceReqContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ResourceReqContext)) as ResourceReqContext;
            return context.RRFPSearcgQuery(query);
        }

        [HttpGet("[action]")]
        public object getRRFPDetails(string pid)
        {
            ResourceReqContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ResourceReqContext)) as ResourceReqContext;
            return context.getRRFPDetails(pid);
        }


        
        [HttpGet("[action]")]
        public object getChildResReqDetails(string pid)
        {
            ResourceReqContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ResourceReqContext)) as ResourceReqContext;
            return context.getChildResReqDetails(pid);
        }

        [HttpGet("[action]")]
        public IEnumerable<ResourceReqChildAttribute> getChildResReq(string cid)
        {
            ResourceReqContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ResourceReqContext)) as ResourceReqContext;
            return context.getChildResReq(cid);
        }

        [HttpGet("[action]")]
        public bool cancelAssignRequest(string childId)
        {
            ResourceReqContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ResourceReqContext)) as ResourceReqContext;
            return context.cancelAssignRequest(childId);
        }


        [HttpGet("[action]")]
        public bool updatePrtStatus(string pid)
        {
            ResourceReqContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ResourceReqContext)) as ResourceReqContext;
            return context.updatePrtStatus(pid);
        }


        [HttpGet("[action]")]
        public object acceptAssignRequest(string childId)
        {
            ResourceReqContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ResourceReqContext)) as ResourceReqContext;
            return context.acceptAssignRequest(childId);
        }
        

        [HttpGet("[action]")]
        public object rejectAssignProject(string childId)
        {
            ResourceReqContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ResourceReqContext)) as ResourceReqContext;
            return context.rejectAssignProject(childId);
        }

    }
}