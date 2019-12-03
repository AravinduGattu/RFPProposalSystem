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
    public interface ISyncMilestone : IDisposable
    {
        Task<List<Milestone>> GetList(int proposalId, int milestoneId);
        Task<int> Save(Milestone item);
        Task<int> Delete(int id);
    }
}
