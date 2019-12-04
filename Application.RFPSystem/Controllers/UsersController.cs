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
        //[Route("api/V1/Authenticate")]
        //[HttpPost]
        //public async Task<IActionResult> Authenticate([FromForm]userInfo userInfo)
        //{
        //    IEnumerable<UserInfo> allUsers = new List<UserInfo>();

        //    using (ISyncUserInfo getAllUsers = new UserService())
        //    {
        //        allUsers = await getAllUsers.rFPUsersInformation();
        //    }

        //    if (!string.IsNullOrEmpty(userInfo.userName) && !string.IsNullOrEmpty(userInfo.accessKey))
        //    {
        //        UserInfo rFPUsersInformation =
        //            allUsers.ToList().Find(c => (c.EmailID == userInfo.userName) && (c.AccessKey == userInfo.accessKey));

        //        return Ok(rFPUsersInformation);
        //    }
        //    else
        //    {
        //        return Ok(null);
        //    }
        //}

        [Route("api/V1/Users/GetList")]
        [HttpGet]
        public async Task<IActionResult> GetList(int userId, int role, int stream)
        {
            try
            {
                IEnumerable<UserInfo> list = new List<UserInfo>();

                using (ISyncUserInfo service = new UserService())
                {
                    list = await service.GetList(userId, role, stream, null, null, null);
                }

                return Ok(list);
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [Route("api/V1/Users/Save")]
        [HttpPost]
        public async Task<IActionResult> Save([FromForm]UserInfo item)
        {
            try
            {
                bool status = false;
                using (ISyncUserInfo service = new UserService())
                {
                    status = await service.Save(item) > 0;
                }

                return Ok(status);
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [Route("api/V1/Users/Delete")]
        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                bool status = false;
                using (ISyncUserInfo service = new UserService())
                {
                    status = await service.Delete(id) > 0;
                }

                return Ok(status);
            }
            catch (System.Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        //[Route("api/V1/UserList")]
        //[HttpGet]
        //public async Task<IActionResult> UsersInformation(string userId, int role, int stream)
        //{
        //    IEnumerable<UserInfo> allUsers = new List<UserInfo>();

        //    using (ISyncUserInfo getAllUsers = new UserService())
        //    {
        //        allUsers = await getAllUsers.rFPUsersInformation();
        //    }

        //    allUsers = allUsers.ToList().FindAll(c => (string.IsNullOrEmpty(userId) || c.EmailID == userId) && 
        //        (!role.HasValue || role.Value == 0 || c.Role == (ProposalUsers)role.Value) &&
        //        (!stream.HasValue || stream.Value == 0 || c.Stream == (Stream)stream.Value));

        //    return Ok(allUsers);
        //}

    }
}