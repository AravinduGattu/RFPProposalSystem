/*
 * Author: Satya Kalasapati
 * Date: 03-Dec-2019
 */
using Common.DataObjects;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Applications.Operations.RFP
{
    public interface ISyncLocation : IDisposable
    {
        Task<List<Location>> GetList(string name, string code);
        Task<int> Save(Location item);
        Task<int> Delete(int id);
    }
}
