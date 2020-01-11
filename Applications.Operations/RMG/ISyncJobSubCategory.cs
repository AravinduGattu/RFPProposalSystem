/*
 * Author: Siva Priya Dadi
 * Date: 09-Jan-2020
 */

using Common.DataObjects;
using Common.DataObjects.RMG;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Applications.Operations.RMG
{
    public interface ISyncJobSubCategory : IDisposable
    {
        Task<List<JobSubCategory>> GetList(int id, string code, string description, int jobFamilyId, int categoryId, string status, string startDate, string endDate);
        Task<int> Save(JobSubCategory item);
        Task<int> Delete(int id);
    }
}
