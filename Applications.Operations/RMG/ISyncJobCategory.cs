/*
 * Author: Siva Priya Dadi
 * Date: 08-Jan-2020
 */
using Common.DataObjects;
using Common.DataObjects.RMG;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Applications.Operations.RMG
{
   public interface ISyncJobCategory :IDisposable
    {
        Task<List<JobCategory>> GetList(int id, string code, string description,int jobFamilyId, string status, string startDate, string endDate);
        Task<int> Save(JobCategory item);
        Task<int> Delete(int id);
    }
}
