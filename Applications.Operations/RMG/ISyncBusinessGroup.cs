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

namespace Applications.Operations.RMG
{
    public interface ISyncBusinessGroup : IDisposable
    {
        Task<List<BusinessGroup>> GetList(int id, string code, string status, string startDate, string endDate);
        Task<int> Save(BusinessGroup item);
        Task<int> Delete(int id);
    }
}
