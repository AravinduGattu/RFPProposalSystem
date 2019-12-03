using Common.DataObjects;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Applications.Operations
{
    public interface ISyncUserInfo : IDisposable
    {
        //Task<IEnumerable<UserInfo>> rFPUsersInformation();
        Task<List<UserInfo>> GetList(string userId, int role, int stream);
        Task<int> Save(UserInfo item);
        Task<int> UpdateLoginTime(int id);
        Task<int> UpdateLogoutTime(int id);
        Task<int> Delete(int id);
    }
}
