using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RMG.Models;
namespace RMG.Controllers
{
    [Route("api/[controller]")]
    public class ReportsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }


        [HttpGet("[action]")]
        public APIResponse getAllEPMDetails(string query)
        {
                ReportsContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ReportsContext)) as ReportsContext;
                return context.getAllEPMDetails(query);
        }

        [HttpGet("[action]")]
        public object getAllEPM()
        {
            ReportsContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ReportsContext)) as ReportsContext;
            return context.GetAllEPM();
        }
        
        [HttpGet("[action]")]
        public object loadLocation()
        {
            ReportsContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ReportsContext)) as ReportsContext;
            return context.loadLocation();
        }

        [HttpGet("[action]")]
        public object loadPMNames()
        {
            ReportsContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ReportsContext)) as ReportsContext;
            return context.loadPMNames();
        }

        [HttpPost("[action]")]
        public int ImportTimeSheet([FromBody]List<Timesheet> timesheet)
        {
            ReportsContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ReportsContext)) as ReportsContext;
            foreach (RMG.Models.Timesheet time in timesheet)
            {
                context.ImportTimesheets(time);
            }
            return 1;
        }
        [HttpPut("[action]")]
        public int updateEmpProjInfo([FromBody]ReportsEPMAttribute pobj)
        {
            ReportsContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.ReportsContext)) as ReportsContext;
            context.updateEmpProjInfo(pobj);
            return 1;
        }



    }
}