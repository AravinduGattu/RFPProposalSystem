using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using RMG.Models;

namespace test_mysql.Controllers
{
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        [HttpGet("[action]")]
        //public IEnumerable<RMG.Models.Employee> GetAllEmployee()
        public object GetAllEmployee()
        {
            EmployeeContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.EmployeeContext)) as EmployeeContext;
            return context.GetAllEmployee();
        }
        [HttpGet("[action]")]
        // public IEnumerable<RMG.Models.Employee> empSearchQuery(string query)
        public object empSearchQuery(string query)
        {
            EmployeeContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.EmployeeContext)) as EmployeeContext;
            return context.empSearchQuery(query);
        }
        [HttpPost("[action]")]
        public object AddEmployee([FromBody]Employee employee)//List<RMG.Models.Employee>
        {
            EmployeeContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.EmployeeContext)) as EmployeeContext;
            
              return context.AddEmployee(employee);
            
           // return employee;
        }
        [HttpPut("[action]")]
        public object UpdateEmployee([FromBody]Employee employee)
        {
            EmployeeContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.EmployeeContext)) as EmployeeContext;
           return context.UpdateEmployee(employee);
            
        }
        [HttpGet("[action]")]
        public void DeleteEmployee(string Emp_Id)
        {
            EmployeeContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.EmployeeContext)) as EmployeeContext;
            context.DeleteEmployee(Emp_Id);
        }

        [HttpGet("[action]")]
        public IEnumerable<RMG.Models.Designation> GetAllDesignation()
        {
            EmployeeContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.EmployeeContext)) as EmployeeContext;
            return context.GetAllDesignation();
        }

        [HttpGet("[action]")]
        public IEnumerable<RMG.Models.Department> GetAllDepartment()
        {
            EmployeeContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.EmployeeContext)) as EmployeeContext;
            return context.GetAllDepartment();
        }

        [HttpGet("[action]")]
        public IEnumerable<RMG.Models.EdgePractice> GetAllEdgePractice()
        {
            EmployeeContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.EmployeeContext)) as EmployeeContext;
            return context.GetAllEdgePractice();
        }
        [HttpGet("[action]")]
        public IEnumerable<RMG.Models.CoeDescription> GetAllCoeDescription()
        {
            EmployeeContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.EmployeeContext)) as EmployeeContext;
            return context.GetAllCoeDescription();
        }

        [HttpGet("[action]")]
        public IEnumerable<RMG.Models.BaseLocation> GetAllCity()
        {
            EmployeeContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.EmployeeContext)) as EmployeeContext;
            return context.GetAllCity();
        }
        [HttpGet("[action]")]
        public IEnumerable<RMG.Models.BusinessGroup> GetAllBusinessGroup()
        {
            EmployeeContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.EmployeeContext)) as EmployeeContext;
            return context.GetAllBusinessGroup();
        }
        [HttpGet("[action]")]
        public IEnumerable<RMG.Models.Employee> GetAllReportingToAndEmail()
        {
            EmployeeContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.EmployeeContext)) as EmployeeContext;
            return context.GetAllReportingToAndEmail();
        }
        [HttpPost("[action]")]
        public int ImportEmployee([FromBody]List<Employee> employee)//List<RMG.Models.Employee>
        {
            EmployeeContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.EmployeeContext)) as EmployeeContext;
            foreach (RMG.Models.Employee emp in employee)
            {
                context.AddEmployee(emp);
            }
            return 1;
        }

        [HttpGet("[action]")]
        public object GetAllJobFamilyDropdown()
        {
            EmployeeContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.EmployeeContext)) as EmployeeContext;
            return context.GetAllJobFamilyDropdown();
        }


        [HttpGet("[action]")]
        public object GetAllCategoryDropdown(string jobFam)
        {
            EmployeeContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.EmployeeContext)) as EmployeeContext;
            return context.GetAllCategoryDropdown(jobFam);
        }


        [HttpGet("[action]")]
        public object GetAllSubCategoryDropdown(string category)
        {
            EmployeeContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.EmployeeContext)) as EmployeeContext;
            return context.GetAllSubCategoryDropdown(category);
        }

        [HttpGet("[action]")]
        public object getDDAllJobs()
        {
            EmployeeContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.EmployeeContext)) as EmployeeContext;
            return context.getDDAllJobs();
        }


        [HttpGet("[action]")]
        public object getDDAllCategories()
        {
            EmployeeContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.EmployeeContext)) as EmployeeContext;
            return context.getDDAllCategories();
        }


        [HttpGet("[action]")]
        public object getDDAllsubCategories()
        {
            EmployeeContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.EmployeeContext)) as EmployeeContext;
            return context.getDDAllsubCategories();
        }



    }
}