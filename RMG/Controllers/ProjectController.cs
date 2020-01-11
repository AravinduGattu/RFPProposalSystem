using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using RMG.Models;
using Newtonsoft.Json;
namespace Projects.Controllers
{
    [Route("api/[controller]")]
    public class ProjectsController : Controller
    {
        //ProjectContext project_obj = new ProjectContext();                       //class name of context file


        [HttpGet("[action]")]
        public object GetAllProjects()
        {
            ProjectContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ProjectContext)) as ProjectContext;
            return context.GetAllProjects();
        }


        [HttpGet("[action]")]
       // [Route("api/Projects/searchQuery")]
        public object searchQuery(string query)
        {

           

            ProjectContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ProjectContext)) as ProjectContext;
            
            return context.searchQuery(query);
          
        }


        [HttpPost("[action]")]
        [Route("api/Projects/AddProjects")]
        public object AddProjects([FromBody] ProjectAttribute project)
        {
            ProjectContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ProjectContext)) as ProjectContext;
            //foreach (RMG.Models.ProjectAttribute p in project)
            //{
                 return context.AddProjects(project);
            //}
            //return 1;
        }

        [HttpPut("[action]")]
        // [Route("api/customer/Edit")]
        public object UpdateProject([FromBody] ProjectAttribute project)
        {
            ProjectContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ProjectContext)) as ProjectContext;
           return context.UpdateProject(project);
            //return 1;
        }

        [HttpGet("[action]")]
        public void DisableProject(string Project_ID)
        {
            ProjectContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ProjectContext)) as ProjectContext;
            context.DisableProject(Project_ID);
        }
        [HttpGet("[action]")]
        public IEnumerable<BaseLocation> GetAllCity()
        {
            ProjectContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ProjectContext)) as ProjectContext;
            return context.GetAllCity();
        }
        [HttpGet("[action]")]
        public IEnumerable<CustomerDetails> GetAllCustomerDetails()
        {
            ProjectContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ProjectContext)) as ProjectContext;
            return context.GetAllCustomerDetails();
        }
        [HttpPost("[action]")]
        [Route("api/Projects/AddProjects")]
        public int ImportProjects([FromBody] List<ProjectAttribute> project)
        {
            ProjectContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ProjectContext)) as ProjectContext;
            foreach (RMG.Models.ProjectAttribute p in project)
            {
                context.AddProjects(p);
            }
            return 1;
        }

        [HttpGet("[action]")]
        public object GetAllProjectCodeAndName()
        {
            ProjectContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ProjectContext)) as ProjectContext;
            return context.GetAllProjectCodeAndName();
        }
    }
}