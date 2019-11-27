using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Threading.Tasks;
using App.RFPSystem.Services;
using Application.RulesSetup;
using Applications.Operations;
using Common.DataObjects;
using LiteDB;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
//using System.Web.Mvc;

namespace Application.RFPSystem.Controllers
{
    //[Route("api/V1/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        [Route("api/V1/Authenticate")]
        [HttpPost]
        public async Task<IActionResult> Authenticate([FromForm]usersInfo usersInfo)
        {
            IEnumerable<RFPUsersInformation> allUsers = new List<RFPUsersInformation>();

            using (ISyncRFPUsersInformation getAllUsers = new UserServices())
            {
                allUsers = await getAllUsers.rFPUsersInformation();
            }

            if (!string.IsNullOrEmpty(usersInfo.userName) && !string.IsNullOrEmpty(usersInfo.accessKey))
            {
                RFPUsersInformation rFPUsersInformation =
                    allUsers.ToList().Find(c => (c.Email == usersInfo.userName) && (c.AccessKey == usersInfo.accessKey));

                return Ok(rFPUsersInformation);
            }
            else
            {
                return Ok(null);
            }
        }

        [Route("api/V1/UserList")]
        [HttpPost]
        public async Task<IActionResult> UsersInformation([FromForm]usersInfo usersInfo)
        {
            IEnumerable<RFPUsersInformation> allUsers = new List<RFPUsersInformation>();

            using (ISyncRFPUsersInformation getAllUsers = new UserServices())
            {
                allUsers = await getAllUsers.rFPUsersInformation();
            }

            if (!string.IsNullOrEmpty(usersInfo.userName) && !string.IsNullOrEmpty(usersInfo.accessKey))
            {
                RFPUsersInformation rFPUsersInformation =
                    allUsers.ToList().Find(c => (c.Email == usersInfo.userName) && (c.AccessKey == usersInfo.accessKey));

                return Ok(rFPUsersInformation);
            }
            else
            {
                return Ok(allUsers);
            }
        }

    }
}