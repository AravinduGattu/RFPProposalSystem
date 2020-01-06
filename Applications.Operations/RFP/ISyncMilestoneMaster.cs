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
    public interface ISyncMilestoneMaster : IDisposable
    {
        Task<List<MilestoneMaster>> GetList(string name);
        Task<int> Save(MilestoneMaster item);
        Task<int> Delete(int id);
    }
}
