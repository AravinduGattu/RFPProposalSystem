/*
 * Author: Satya Kalasapati
 * Date: 03-Dec-2019
 */
using Common.DataObjects;
using Common.DataObjects.RFP;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Applications.Operations.RFP
{
    public interface ISyncProposal : IDisposable
    {
        Task<List<Proposal>> GetList(int status, int proposalId, int userId, int role);
        Task<List<ProposalGrid>> GetGrid(int status, int proposalId, int userId, int role);
        Task<int> UpdateStatus(int proposalID, int userID, int status);
        Task<int> Save(Proposal item);
        Task<int> Delete(int id);
    }
}
