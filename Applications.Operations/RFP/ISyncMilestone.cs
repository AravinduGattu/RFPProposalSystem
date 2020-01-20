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
    public interface ISyncMilestone : IDisposable
    {
        Task<List<Milestone>> GetList(int proposalId, int milestoneId);
        Task<int> Save(Milestone item);
        Task<int> SaveList(List<Milestone> list);
        Task<int> Delete(int id);
    }
}
