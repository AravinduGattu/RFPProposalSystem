using Common.DataObjects;
using Common.DataObjects.RFP;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net;
using System.Threading.Tasks;

namespace Applications.Operations
{
    public interface IAsyncValidations:IDisposable
    {
        Task<ValidateResponse> ValidateProposalUser(UserRole proposalUser);

        Task<IActionResult> CustomActionResult(Exception exception, HttpStatusCode statusCodeResult);

        Task<ValidateResponse> validateProposalRequest(Proposal rFPRequestDataModel);

        Task<ValidateResponse> validateProposalStatus(ProposalStatus proposalStatus);
    }
}
