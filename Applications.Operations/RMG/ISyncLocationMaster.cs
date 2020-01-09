
using Common.DataObjects;
using Common.DataObjects.RMG;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Applications.Operations
{
    public interface ISyncLocationMaster : IDisposable
    {
        Task<List<LocationMaster>> GetList(int id, string code, string status, string country, string city, string region,string postalcode);
        Task<int> Save(LocationMaster item);
        Task<int> Delete(int id);
    }
}
