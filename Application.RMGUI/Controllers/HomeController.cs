using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using RMG.Models;

namespace RMG.Controllers
{
    [Route("api/[Controller]")]
    public class HomeController : Controller
    {
        
        

        [HttpGet("[action]")]
        public object getChartData()
        {
            HomeContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.HomeContext)) as HomeContext;
            return context.getChartData();
        }

    }
}