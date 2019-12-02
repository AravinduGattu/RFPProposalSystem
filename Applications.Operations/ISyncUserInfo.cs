using Common.DataObjects;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Applications.Operations
{
    public interface ISyncUserInfo:IDisposable
    {
        Task<IEnumerable<UserInfo>> rFPUsersInformation();
        Task<List<UserInfo>> GetList();
        Task<UserInfo> GetByName(string name);
        Task<int> Save(UserInfo item);
        Task<int> Delete(string name);
    }
}
