/*
 * Author: Siva Priya Dadi
 * Date: 07-Jan-2020
 */
using Common.DataObjects;
using Common.DataObjects.RMG;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Applications.Operations.RMG
{
    public interface ISyncJobFamily : IDisposable
    {
        Task<List<JobFamily>> GetList(int id, string code, string description, string status, string startDate, string endDate);
        Task<int> Save(JobFamily item);
        Task<int> Delete(int id);
    }
}
