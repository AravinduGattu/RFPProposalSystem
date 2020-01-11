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
    public class AssignPanelController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<RMG.Models.AssignPanel> GetAllPanel()
        {
            AssignPanelContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AssignPanelContext)) as AssignPanelContext;

            return context.GetAllAssignPanel();
        }
        [HttpGet("[action]")]
        public IEnumerable<RMG.Models.AssignPanel> assignpanelSearchQuery(string query)
        {
            AssignPanelContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AssignPanelContext)) as AssignPanelContext;

            return context.assignpanelSearchQuery(query);
        }


        [HttpPost("[action]")]
        //[Route("api/Panel/create")]
        public int AddAssignPanel([FromBody]AssignPanel assignpanel)
        {
            AssignPanelContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AssignPanelContext)) as AssignPanelContext;

            context.AddAssignPanel(assignpanel);

            return 1;

        }
        [HttpPut("[action]")]
        // [Route("api/Panel/Edit")]
        public int UpdateAssignPanel([FromBody]AssignPanel assignpanel)
        {
            AssignPanelContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AssignPanelContext)) as AssignPanelContext;
            context.UpdateAssignPanel(assignpanel);
            return 1;
        }


        //[HttpGet("[action]")]
        //// [Route("api/Panel/Delete")]
        //public int DeletePanel(string panel_code)
        //{
        //    PanelContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.PanelContext)) as PanelContext;
        //    context.DeletePanel(panel_code);
        //    return 1;
        //}
        [HttpGet("[action]")]
        public IEnumerable<PanelDropDown> PanelDropdown()
        {
            AssignPanelContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AssignPanelContext)) as AssignPanelContext;
            return context.PanelDropdown();
        }
        [HttpPost("[action]")]
        //[Route("api/Panel/create")]
        public int ImportAssignPanel([FromBody]List<AssignPanel> assignpanel)
        {
            AssignPanelContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.AssignPanelContext)) as AssignPanelContext;
            foreach (RMG.Models.AssignPanel ap in assignpanel)
            {
                context.AddAssignPanel(ap);
            }
            return 1;
        }
    }
}
