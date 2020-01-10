using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using RMG.Models;

namespace RMG.Controllers
{
    [Route("api/[controller]")]
    public class AdminConfigController : Controller
    {
        [HttpPost("[action]")]
        public object AddCoe([FromBody]CoeAtt coe)
        {
            AdminConfigContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AdminConfigContext)) as AdminConfigContext;
           return context.AddCoe(coe);
           
        }
        [HttpPut("[action]")]
        public object UpdateCoe([FromBody]CoeAtt coe)
        {
            AdminConfigContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AdminConfigContext)) as AdminConfigContext;
           return context.UpdateCoe(coe);
            
        }
        [HttpGet("[action]")]
       // public IEnumerable<RMG.Models.CoeAtt> GetAllCoe()
        public object GetAllCoe()
        {
            AdminConfigContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AdminConfigContext)) as AdminConfigContext;
            return context.GetAllCOE();
        }
        [HttpGet("[action]")]
        //public IEnumerable<RMG.Models.EdgePracticeAtt> GetAllEdgePractice()
        public object GetAllEdgePractice()
        {
            AdminConfigContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AdminConfigContext)) as AdminConfigContext;
            return context.GetAllEdgePractice();
        }

        [HttpGet("[action]")]
        public object GetAllDesignation()
        {
            AdminConfigContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AdminConfigContext)) as AdminConfigContext;
            return context.GetAllDesignation();
        }

        [HttpGet("[action]")]
        public object GetAllDepartments()
        {
            AdminConfigContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AdminConfigContext)) as AdminConfigContext;
            return context.GetAllDepartments();
        }
        [HttpGet("[action]")]
        public object GetAllBusinessgroup()
        {
            AdminConfigContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AdminConfigContext)) as AdminConfigContext;
            return context.GetAllBusinessgroup();
        }
        [HttpGet("[action]")]
        //public IEnumerable<RMG.Models.EdgePracticeAtt> EdgePracticeSearchQuery(string query)
        public object EdgePracticeSearchQuery(string query)
        {
            AdminConfigContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AdminConfigContext)) as AdminConfigContext;
            return context.EdgePracticeSearchQuery(query);
        }
        [HttpGet("[action]")]
        public object DepartmentSearchQuery(string query)
        {
            AdminConfigContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AdminConfigContext)) as AdminConfigContext;
            return context.DepartmentSearchQuery(query);
        }
        [HttpGet("[action]")]
        public object DesignationSearchQuery(string query)
        {
            AdminConfigContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AdminConfigContext)) as AdminConfigContext;
            return context.DesignationSearchQuery(query);
        }
        [HttpGet("[action]")]
       // public IEnumerable<RMG.Models.CoeAtt> CoeSearchQuery(string query)
         public object CoeSearchQuery(string query)
        {
            AdminConfigContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AdminConfigContext)) as AdminConfigContext;
            return context.CoeSearchQuery(query);
        }
        [HttpGet("[action]")]
        public object BussinessgroupSearchQuery(string query)
        {
            AdminConfigContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AdminConfigContext)) as AdminConfigContext;
            return context.BussinessgroupSearchQuery(query);
        }

        [HttpPost("[action]")]
        public object AddEdgepractice([FromBody]EdgePracticeAtt edge)
        {
            AdminConfigContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AdminConfigContext)) as AdminConfigContext;
           return context.AddEdgePractice(edge);
            
        }
         [HttpPut("[action]")]
        public object UpdateEdgePractice([FromBody]EdgePracticeAtt edge)
        {
            AdminConfigContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AdminConfigContext)) as AdminConfigContext;
           return context.UpdateEdgePractice(edge);
           
        }
         [HttpPost("[action]")]
        public object AddDepartment([FromBody]DeptAtt dept)
        {
            AdminConfigContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AdminConfigContext)) as AdminConfigContext;
            return context.AddDepartment(dept);
            
        }
        [HttpPut("[action]")]
        public object UpdateDepartment([FromBody]DeptAtt dept)
        {
            AdminConfigContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AdminConfigContext)) as AdminConfigContext;
           return context.UpdateDepartment(dept);
          
        }
        [HttpPost("[action]")]
        public object AddDesignation([FromBody] DesignAtt designation)
        {
            AdminConfigContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AdminConfigContext)) as AdminConfigContext;
            return context.AddDesignation(designation);
            
        }
        [HttpPut("[action]")]
        public object UpdateDesignation([FromBody]DesignAtt desg)
        {
            AdminConfigContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AdminConfigContext)) as AdminConfigContext;
          return  context.UpdateDesigantion(desg);
          
        }
        [HttpPost("[action]")]
        public object AddBusinessGroup([FromBody] Bussinessgroupatt business)
        {
            AdminConfigContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AdminConfigContext)) as AdminConfigContext;
            return context.AddBusinessGroup(business);
        }
        [HttpPut("[action]")]
        public object UpdateBusinessGroup([FromBody]Bussinessgroupatt business)
        {
            AdminConfigContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AdminConfigContext)) as AdminConfigContext;
           return context.UpdateBusinessGroup(business);
        }
        [HttpGet("[action]")]
        public IEnumerable<RMG.Models.FindEmpAtt> GetEmpDropList()
        {
            FindEmp context = HttpContext.RequestServices.GetService(typeof(RMG.Models.FindEmp)) as FindEmp;
            return context.GetAllEmplist();
        }
        [HttpPost("[action]")]
        public int ImportCoe([FromBody]List<CoeAtt> coe)
        {
            AdminConfigContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AdminConfigContext)) as AdminConfigContext;
            foreach(RMG.Models.CoeAtt co in coe)
            {
                context.AddCoe(co);
            }
            return 1;
        }
        [HttpPost("[action]")]
        public int ImportEdgepractice([FromBody]List<EdgePracticeAtt> edge)
        {
            AdminConfigContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AdminConfigContext)) as AdminConfigContext;
            foreach (RMG.Models.EdgePracticeAtt ed in edge)
            {
                context.AddEdgePractice(ed);
            }
            return 1;
        }
        [HttpPost("[action]")]
        [Route("api/AdminConfig/ImportDepartment")]
        public int ImportDepartment([FromBody]List<DeptAtt> dept)
        {
            AdminConfigContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AdminConfigContext)) as AdminConfigContext;
            foreach (RMG.Models.DeptAtt dpt in dept)
            {
                context.AddDepartment(dpt);
            }
            return 1;
        }
        [HttpPost("[action]")]
        public int ImportDesignation([FromBody] List<DesignAtt> designation)
        {
            AdminConfigContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AdminConfigContext)) as AdminConfigContext;
            foreach (RMG.Models.DesignAtt dsn in designation)
            {
                context.AddDesignation(dsn);
            }
            return 1;
        }
        [HttpPost("[action]")]
        public int ImportBusinessGroup([FromBody] List<Bussinessgroupatt> business)
        {
            AdminConfigContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AdminConfigContext)) as AdminConfigContext;
            foreach (RMG.Models.Bussinessgroupatt bg in business)
            {
                context.AddBusinessGroup(bg);
            }
            return 1;
        }
    }
}