/*
 * Author: Satya Kalasapati
 * Date: 03-Dec-2019
 */
using Common.DataObjects;
using Common.DataObjects.RMG;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Applications.Operations
{
    public interface ISyncDepartment : IDisposable
    {
        Task<List<Department>> GetList(int id, string code, string status, string startDate, string endDate);
        Task<int> Save(Department item);
        Task<int> Delete(int id);
    }
}
