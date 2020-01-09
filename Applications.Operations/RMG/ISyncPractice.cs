
using Common.DataObjects;
using Common.DataObjects.RMG;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Applications.Operations
{
    public interface ISyncPractice : IDisposable
    {
        Task<List<PracticeMaster>> GetList(int id, string name, string status, string startDate, string endDate);
        Task<int> Save(PracticeMaster item);
        Task<int> Delete(int id);
    }
}
    