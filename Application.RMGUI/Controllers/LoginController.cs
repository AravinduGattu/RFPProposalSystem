using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RMG.Models;

namespace RMG.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {

        [HttpGet("[action]")]
        public object ValidateUser(String mailId, String password, String p_today)
        {
            LoginContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.LoginContext)) as LoginContext;
            return context.ValidateUser(mailId, password,p_today);
        }



        [HttpGet("[action]")]
        public bool ValidateUserId(String mailId)
        {
            LoginContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.LoginContext)) as LoginContext;
            return context.ValidateUserId(mailId);
        }
        [HttpGet("[action]")]
        public LoginData getLoginData(string Emp_Id)
        {
            LoginDataContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.LoginDataContext)) as LoginDataContext;
            return context.getLoginData(Emp_Id);
        }
        

        [HttpGet("[action]")]
        public UserRole getUserType(string Emp_Id)
        {
            LoginContext context = HttpContext.RequestServices.GetService(typeof(RMG.Models.LoginContext)) as LoginContext;
            return context.getUserType(Emp_Id);
        }

    }
}