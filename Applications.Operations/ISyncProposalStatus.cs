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
    public interface ISyncProposalStatus : IDisposable
    {
        Task<List<ProposalStatus>> GetList(int status, int proposalId);
        Task<int> Save(ProposalStatus item);
        Task<int> Delete(int id);
    }
}
