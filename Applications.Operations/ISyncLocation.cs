using Common.DataObjects;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Applications.Operations
{
    public interface ISyncLocation : IDisposable
    {
        Task<List<Location>> GetList(string name, string code);
        Task<int> Save(Location item);
        Task<int> Delete(int id);
    }
}
