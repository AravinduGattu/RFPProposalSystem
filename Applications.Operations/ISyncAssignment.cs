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
    public interface ISyncAssignment : IDisposable
    {
        Task<List<Assignment>> GetList(int proposalId, int assignmentId);
        Task<int> Save(Assignment item);
        Task<int> Delete(int id);
    }
}
