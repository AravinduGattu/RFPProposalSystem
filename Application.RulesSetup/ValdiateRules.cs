using App.RFPSystem.Services;
using Applications.Operations;
using Common.DataObjects;
using Common.DataObjects.RFP;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Application.RulesSetup
{
    public class ValdiateRules : ControllerBase, IAsyncValidations
    {
        public void Dispose()
        {
            //throw new NotImplementedException();
        }


        public async Task<ValidateResponse> validateProposalRequest(Proposal rFPRequestDataModel)
        {

            ValidateResponse validateResponse = new ValidateResponse();
            validateResponse.NoErrors = true;

            IEnumerable<UserInfo> allUsers = new List<UserInfo>();

           // allUsers = await new UserService().rFPUsersInformation();

            UserInfo rFPUsersInformation =
                    allUsers.ToList().Find(x => x.EmployeeName == rFPRequestDataModel.CreatedByName.ToString());

            if(rFPUsersInformation != null)
            {
                if(rFPUsersInformation.Role == UserRole.SalesLead)
                {
                    return await Task.Run(() => validateResponse);
                }
                else
                {
                    validateResponse.NoErrors = false;
                    validateResponse.exception = new ArgumentException("User Must be " + UserRole.SalesLead.ToString());
                    validateResponse.controllerBase = CustomActionResult(validateResponse.exception, HttpStatusCode.Forbidden);
                    validateResponse.RequestBody = rFPRequestDataModel;
                }
            }
            else
            {
                validateResponse.NoErrors = false;
                validateResponse.exception = new ArgumentException("User Must be " + UserRole.SalesLead.ToString());
                validateResponse.controllerBase = CustomActionResult(validateResponse.exception, HttpStatusCode.Forbidden);
                validateResponse.RequestBody = rFPRequestDataModel;
            }

            return await Task.Run(() => validateResponse);
        }

        public async Task<ValidateResponse> validateProposalStatus(ProposalStatus proposalStatus)
        {

            ValidateResponse validateResponse = new ValidateResponse();
            validateResponse.NoErrors = true;

            IEnumerable<UserInfo> allUsers = new List<UserInfo>();

            //allUsers = await new UserService().rFPUsersInformation();

            UserInfo rFPUsersInformation =
                    allUsers.ToList().Find(x => x.EmployeeID == proposalStatus.UserID.ToString());

            return await Task.Run(() => validateResponse);
        }

        public async Task<ValidateResponse> ValidateProposalUser(UserRole proposalUser)
        {
            ValidateResponse validateResponse = new ValidateResponse();
            validateResponse.NoErrors = true;

            if (proposalUser != UserRole.SalesLead)
            {
                validateResponse.NoErrors = false;
                validateResponse.exception = new ArgumentException("User Must be "+ UserRole.SalesLead.ToString());
                validateResponse.controllerBase = CustomActionResult(validateResponse.exception, HttpStatusCode.Forbidden);
            }

            return await Task.Run(() => validateResponse);
        }

        public async Task<IActionResult> CustomActionResult(Exception exception, HttpStatusCode statusCodeResult)
        {
            switch(statusCodeResult)
            {
                case HttpStatusCode.Forbidden: return Forbid(exception.InnerException.ToString());
                case HttpStatusCode.Unauthorized: return Unauthorized(exception.InnerException.ToString());

                default: return Ok("Success");       
            }
        }
    }
}
