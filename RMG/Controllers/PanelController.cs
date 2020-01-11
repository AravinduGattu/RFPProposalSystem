using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RMG.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RMG.Controllers
{
    [Route("api/[controller]")]
    public class PanelController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<RMG.Models.Panel> GetAllPanel()
        {
           PanelContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.PanelContext)) as PanelContext;

            return context.GetAllPanel();
        }
        [HttpGet("[action]")]
        public IEnumerable<RMG.Models.Panel> panelSearchQuery(string query)
        {
            PanelContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.PanelContext)) as PanelContext;

            return context.panelSearchQuery(query);
        }


        [HttpPost("[action]")]
        //[Route("api/Panel/create")]
        public int AddPanel([FromBody]Panel panel)
        {
            PanelContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.PanelContext)) as PanelContext;

            context.AddPanel(panel);

            return 1;

        }
        [HttpPut("[action]")]
        // [Route("api/Panel/Edit")]
        public int UpdatePanel([FromBody]Panel panel)
        {
            PanelContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.PanelContext)) as PanelContext;
            context.UpdatePanel(panel);
            return 1;
        }


        [HttpGet("[action]")]
        // [Route("api/Panel/Delete")]
        public int DeletePanel(string panel_code)
        {
            PanelContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.PanelContext)) as PanelContext;
            context.DeletePanel(panel_code);
            return 1;
        }
        [HttpGet("[action]")]
        public IEnumerable<EmployeeNameDropdown> EmployeeNameDropdown()
        {
            PanelContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.PanelContext)) as PanelContext;
            return context.EmployeeNameDropdown();
        }

        [HttpGet("[action]")]
        public IEnumerable<RMG.Models.Designation> GetAllDesignation()
        {
            PanelContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.PanelContext)) as PanelContext;
            return context.GetAllDesignation();
        }
        [HttpPost("[action]")]
        //[Route("api/Panel/create")]
        public int ImportPanel([FromBody]List<Panel> panel)
        {
            PanelContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.PanelContext)) as PanelContext;
            foreach (RMG.Models.Panel pn in panel)
            {
                context.AddPanel(pn);
            }
            return 1;

        }
    }
}
