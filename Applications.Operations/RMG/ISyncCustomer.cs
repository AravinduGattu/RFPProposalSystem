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
    public interface ISyncCustomer : IDisposable
    {
        Task<List<Customer>> GetList(int id, string code, string status, string name, string country, int locationid,string poc);
        Task<int> Save(Customer item);
        Task<int> Delete(int id);
    }
}
