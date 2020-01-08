using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.RFPSystem.Services;
using Common.DataObjects;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Application.RFPSystem.Controllers
{
    [ApiController]
    public class BaseController : ControllerBase
    {
        public BaseController()
        {
            
        }

        public int UserID {
            get {
                if (string.IsNullOrEmpty(Request.Headers["AuthToken"]))
                    return 0;
                return int.Parse(Cipher.Decrypt(Request.Headers["AuthToken"], Constants.Token).Split('~')[1]);
                
            }
        }

        public int UserRoleID
        {
            get
            {
                if (string.IsNullOrEmpty(Request.Headers["AuthToken"]))
                    return 0;
                return int.Parse(Cipher.Decrypt(Request.Headers["AuthToken"], Constants.Token).Split('~')[2]);

            }
        }
    }
}