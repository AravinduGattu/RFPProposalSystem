using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public string UserID {
            get {
                if (string.IsNullOrEmpty(Request.Headers["AuthToken"]))
                    return null;
                return Cipher.Decrypt(Request.Headers["AuthToken"], Constants.Token).Split('~')[0];
                
            }
        }
    }
}