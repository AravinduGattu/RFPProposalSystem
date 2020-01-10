
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RMG.Models;

namespace RMG.Controllers
{
    [Route("api/[controller]")]
    public class RoleController : Controller
    {

        [HttpGet("[action]")]
        public object GetAllRoles()
        {
            RoleContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.RoleContext)) as RoleContext;
            return context.GetAllRoles();
        }

        [HttpGet("[action]")]
        public object rolesSearchQuery(string query)
        {
            RoleContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.RoleContext)) as RoleContext;
            return context.rolesSearchQuery(query);
        }



        [HttpPost("[action]")]
        //  [Route("api/RoleAttribute/Create")]
        public object Create([FromBody] RoleAttribute role)
        {
            RoleContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.RoleContext)) as RoleContext;
            return context.AddRole(role);
            
        }

        [HttpPut("[action]")]
        // [Route("api/FetchRoleData/UpdateRole")]
        public object UpdateRole([FromBody]RoleAttribute role)
        {
            RoleContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.RoleContext)) as RoleContext;
            return context.UpdateRole(role);
            
        }

        [HttpGet("[action]")]
        public void DisableRole(string Employee_Id)
        {
            RoleContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.RoleContext)) as RoleContext;
            context.DisableRole(Employee_Id);
        }

        [HttpGet("[action]")]
        public IEnumerable<EmpDropAttribute> GetEmployeeDropdown()
        {
            RoleContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.RoleContext)) as RoleContext;
            return context.GetEmployeeDropdown();
        }
        [HttpGet("[action]")]
        public IEnumerable<EmployeeDesignationAttribute> GetEmployeeDesignation()
        {
            RoleContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.RoleContext)) as RoleContext;
            return context.GetEmployeeDesignation();
        }

        [HttpGet("[action]")]
        public IEnumerable<ProjectdropdownAttribute> GetProjectdropdown()
        {
            RoleContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.RoleContext)) as RoleContext;
            return context.GetProjectdropdown();
        }


        [HttpGet("[action]")]
        public IEnumerable<ProjectRoleAttribute> GetProjectroledropdown()
        {
            RoleContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.RoleContext)) as RoleContext;
            return context.GetProjectroledropdown();
        }
        [HttpPost("[action]")]
        //  [Route("api/RoleAttribute/Create")]
        public int ImportRole([FromBody]List<RoleAttribute> role)
        {
            RoleContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.RoleContext)) as RoleContext;
            foreach (RMG.Models.RoleAttribute rl in role)
            {
                context.AddRole(rl);
            }
            return 1;
        }
    }
}




