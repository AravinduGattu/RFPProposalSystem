using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using App.RFPSystem.Services;
using App.RFPSystem.Services.RFP;
using Applications.Operations;
using Applications.Operations.RFP;
using Common.DataObjects;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Application.RFPSystem.Controllers
{
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        [Route("api/V1/Authenticate")]
        [HttpPost]
        public async Task<IActionResult> Authenticate([FromForm]userInfo userInfo)
        {
            try
            {
                if (string.IsNullOrEmpty(userInfo.userName) || string.IsNullOrEmpty(userInfo.accessKey))
                {
                    return Unauthorized();                    
                }

                UserInfo user = null;

                using (ISyncUserInfo service = new UserService())
                {
                    user = await service.Authenticate(userInfo.userName, userInfo.accessKey);
                }

                if (user == null)
                {
                    return Unauthorized();
                }

                string str = user.ID + "~" + DateTime.Now.ToString("yyyyMMddHHmmss");
                var strEncryptred = await Task.Run(() => Cipher.Encrypt(str, Constants.Token));
                user.AccessKey = strEncryptred;

                return Ok(user);                
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [Route("api/V1/Logout")]
        [HttpGet]
        public async Task<IActionResult> Logout(int id)
        {
            try
            {
                if (id == 0)
                {
                    return Unauthorized();
                }

                using (ISyncUserInfo service = new UserService())
                {
                    await service.UpdateLogoutTime(id);
                }

                return Ok(true);
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }
        }
    }
}