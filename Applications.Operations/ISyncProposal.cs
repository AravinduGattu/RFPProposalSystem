/*
 * Author: Satya Kalasapati
 * Date: 03-Dec-2019
 */
using Common.DataObjects;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Applications.Operations
{
    public interface ISyncProposal : IDisposable
    {
        Task<List<Proposal>> GetList(int status, int proposalId, int userId, int role);
        Task<List<ProposalGrid>> GetGrid(int status, int proposalId, int userId, int role);
        Task<int> Save(Proposal item);
        Task<int> Delete(int id);
    }
}
