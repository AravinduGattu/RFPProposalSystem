using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RMG.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RMG.Controllers
{
    [Route("api/[controller]")]
    public class VendorController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<RMG.Models.Vendor> GetAllVendor()
        {
            VendorContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.VendorContext)) as VendorContext;

            return context.GetAllVendor();
        }
        [HttpGet("[action]")]
        public IEnumerable<RMG.Models.Vendor> vendorSearchQuery(string query)
        {
            VendorContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.VendorContext)) as VendorContext;

            return context.vendorSearchQuery(query);
        }


        [HttpPost("[action]")]
        //[Route("api/Vendor/create")]
        public int AddVendor([FromBody]Vendor vendor)
        {
            VendorContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.VendorContext)) as VendorContext;

            context.AddVendor(vendor);

            return 1;

        }
        [HttpPut("[action]")]
        // [Route("api/Vendor/Edit")]
        public int UpdateVendor([FromBody]Vendor vendor)
        {
            VendorContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.VendorContext)) as VendorContext;
            context.UpdateVendor(vendor);
            return 1;
        }


        //[HttpGet("[action]")]
        //// [Route("api/Vendor/Delete")]
        //public int DeleteVendor(string vendor_code)
        //{
        //    VendorContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.VendorContext)) as VendorContext;
        //    context.DeleteVendor(vendor_code);
        //    return 1;
        //}
        [HttpPost("[action]")]
        //[Route("api/Vendor/create")]
        public int ImportVendor([FromBody]List<Vendor> vendor)
        {
            VendorContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.VendorContext)) as VendorContext;
            foreach (RMG.Models.Vendor vn in vendor)
            {
                context.AddVendor(vn);
            }
            return 1;

        }
    }
}
