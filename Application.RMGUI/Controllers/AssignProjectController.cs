using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using RMG.Models;


namespace RMG.Controllers
{
    [Route("api/[controller]")]
    public class AssignProjectController : Controller
    {
    

        [HttpGet("[action]")]
        public IEnumerable<RMG.Models.AssignProject> GetAllAssignProject()
        {
            AssignProjectContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AssignProjectContext)) as AssignProjectContext;

            return context.GetAllAssignProject();
        }
       

        [HttpGet("[action]")]
        public IEnumerable<RMG.Models.AssignProject> assignProjectSearchQuery(string query)
        {
            AssignProjectContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AssignProjectContext)) as AssignProjectContext;

            return context.assignProjectSearchQuery(query);
        }
        [HttpGet]
        [Route("api/AssignProject/Details/{id}")]
        public AssignProject Details(string Emp_Id)


        {

            AssignProjectContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AssignProjectContext)) as AssignProjectContext;

            return context.GetAssignProjectData(Emp_Id);

        }

        [HttpPost("[action]")]
       
        public int AddAssignProject([FromBody]AssignProject  assignProject)
        {
            AssignProjectContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AssignProjectContext)) as AssignProjectContext;
            
                context.AddAssignProject(assignProject);
            
            return 1;

        }

        [HttpPut("[action]")]
        // [Route("api/assignProject/Edit")]
        public int UpdateAssignProject([FromBody]AssignProject assignProject)
        {
            AssignProjectContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AssignProjectContext)) as AssignProjectContext;
            context.UpdateAssignProject(assignProject);
            return 1;
        }


        [HttpGet("[action]")]
        // [Route("api/assignProject/Delete")]
        public int DeleteAssignProject(string Emp_Id)
        {
            AssignProjectContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AssignProjectContext)) as AssignProjectContext;
            context.DeleteAssignProject(Emp_Id);
            return 1;
        }



        // For Employee DropDown
        [HttpGet("[action]")]
        public IEnumerable<EmpassignDropAttribute> GetEmployeeDropdown()
        {
            AssignProjectContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AssignProjectContext)) as AssignProjectContext;
            return context.GetEmployeeDropdown();
        }

        // For  Project Name DropDown
        [HttpGet("[action]")]
        public IEnumerable<ProjectdropdownAttribute> GetProjectDropdown()
        {
            AssignProjectContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AssignProjectContext)) as AssignProjectContext;
            return context.GetProjectDropdown();
        }

        [HttpGet("[action]")]
        public IEnumerable<BaseLocation> GetAllCity()
        {
            AssignProjectContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AssignProjectContext)) as AssignProjectContext;
            return context.GetAllCity();
        }


        


        [HttpGet("[action]")]
        // [Route("api/assignProject/Delete")]
        public object getAssignedProjDetails(string childID)
        {
            AssignProjectContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AssignProjectContext)) as AssignProjectContext;
           return context.getAssignedProjDetails(childID);
            
        }

    }



}

