﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using App.RFPSystem.Services;
using Applications.Operations;
using Common.DataObjects;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Application.RMGSystem.Controllers
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

                using (Applications.Operations.RFP.ISyncUserInfo service = new App.RFPSystem.Services.RFP.UserService())
                {
                    user = await service.Authenticate(userInfo.userName, userInfo.accessKey);
                }

                if (user == null)
                {
                    return Unauthorized();
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

                using (Applications.Operations.RFP.ISyncUserInfo service = new App.RFPSystem.Services.RFP.UserService())
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