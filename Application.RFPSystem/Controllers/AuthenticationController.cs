using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using App.RFPSystem.Services;
using Applications.Operations;
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

                IEnumerable<UserInfo> allUsers = new List<UserInfo>();

                using (ISyncUserInfo service = new UserService())
                {
                   // allUsers = await service.rFPUsersInformation();
                }

                UserInfo user =
                        allUsers.ToList().Find(c => (c.EmailID == userInfo.userName) && (c.AccessKey == userInfo.accessKey));

                string str = user.ID + "~" + DateTime.Now.ToString("yyyyMMddHHmmss");
                var strEncryptred = await Task.Run(() => Cipher.Encrypt(str, Constants.Token));
                user.AccessKey = strEncryptred;

                using (ISyncUserInfo service = new UserService())
                {
                    //update asynchronously
                    service.UpdateLoginTime(user.ID);
                }

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
                    //update asynchronously
                    await service.UpdateLogoutTime(id);
                }

                return Ok();
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }
        }
    }
}