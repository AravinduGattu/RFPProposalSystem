using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using RMG.Models;
namespace RMG.Controllers
{
    [Route("api/[controller]")]
    public class CustomerController : Controller
    {
        //EmployeeController objEmployee = new EmployeeController();

        [HttpGet("[action]")]
        public object GetAllCustomer()
        //public IEnumerable<RMG.Models.Customer> GetAllCustomer()
        {
            CustomerContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.CustomerContext)) as CustomerContext;

            return context.GetAllCustomer();
        }

        [HttpGet("[action]")]
        public object custSearchQuery(string query)
        //public IEnumerable<RMG.Models.Customer> custSearchQuery(string query)
        {
            CustomerContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.CustomerContext)) as CustomerContext;

            return context.custSearchQuery(query);
        }



        [HttpPost("[action]")]
        //[Route("api/customer/create")]
        public object AddCustomer([FromBody]Customer customers)

               //public int AddCustomer([FromBody]Customer customers)
        {
            CustomerContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.CustomerContext)) as CustomerContext;
            
              return  context.AddCustomer(customers);

        }

        [HttpPut("[action]")]
        // [Route("api/customer/Edit")]
        public object UpdateCustomer([FromBody]Customer customer)
        //public int UpdateCustomer([FromBody]Customer customer)
        {
            CustomerContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.CustomerContext)) as CustomerContext;
            return context.UpdateCustomer(customer);
          
        }


        [HttpGet("[action]")]
        // [Route("api/customer/Delete")]
        public int DeleteCustomer(string cust_id)
        {
            CustomerContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.CustomerContext)) as CustomerContext;
            context.DeleteCustomer(cust_id);
            return 1;
        }

        [HttpGet("[action]")]
        public IEnumerable<BaseLocation> GetAllCity()
        {
            CustomerContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.CustomerContext)) as CustomerContext;
            return context.GetAllCity();
        }
        [HttpGet("[action]")]
        public IEnumerable<BaseLocation> GetAllCountry()
        {
            CustomerContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.CustomerContext)) as CustomerContext;
            return context.GetAllCountry();
        }

        [HttpGet("[action]")]
        public IEnumerable<BusinessGroup> GetAllBusinessGroups()
        {
            CustomerContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.CustomerContext)) as CustomerContext;
            return context.GetAllBusinessGroups();
        }
        [HttpPost("[action]")]
        //[Route("api/customer/create")]
        public int ImportCustomer([FromBody]List<Customer> customers)
        {
            CustomerContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.CustomerContext)) as CustomerContext;
            foreach (RMG.Models.Customer cust in customers)
            {
                context.AddCustomer(cust);
            }
            return 1;
        }
    }
}