using Common.DataObjects;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Applications.Operations
{
    public interface ISyncMilestoneMaster : IDisposable
    {
        Task<List<MilestoneMaster>> GetList(string name);
        Task<int> Save(MilestoneMaster item);
        Task<int> Delete(int id);
    }
}
