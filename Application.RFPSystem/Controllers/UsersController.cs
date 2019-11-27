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
        public async Task<IActionResult> Authenticate([FromForm]userInfo userInfo)
        {
            IEnumerable<RFPUsersInformation> allUsers = new List<RFPUsersInformation>();

            using (ISyncRFPUsersInformation getAllUsers = new UserServices())
            {
                allUsers = await getAllUsers.rFPUsersInformation();
            }

            if (!string.IsNullOrEmpty(userInfo.userName) && !string.IsNullOrEmpty(userInfo.accessKey))
            {
                RFPUsersInformation rFPUsersInformation =
                    allUsers.ToList().Find(c => (c.Email == userInfo.userName) && (c.AccessKey == userInfo.accessKey));

                return Ok(rFPUsersInformation);
            }
            else
            {
                return Ok(null);
            }
        }

        [Route("api/V1/UserList")]
        [HttpGet]
        public async Task<IActionResult> UsersInformation(string userId, int? role, int? stream)
        {
            IEnumerable<RFPUsersInformation> allUsers = new List<RFPUsersInformation>();

            using (ISyncRFPUsersInformation getAllUsers = new UserServices())
            {
                allUsers = await getAllUsers.rFPUsersInformation();
            }

            allUsers = allUsers.ToList().FindAll(c => (string.IsNullOrEmpty(userId) || c.Email == userId) && 
                (!role.HasValue || role.Value == 0 || c.Role == (ProposalUsers)role.Value) &&
                (!stream.HasValue || stream.Value == 0 || c.Stream == (Stream)stream.Value));

            return Ok(allUsers);
        }

    }
}