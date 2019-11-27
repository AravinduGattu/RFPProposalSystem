using Applications.Operations;
using Common.DataObjects;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace App.RFPSystem.Services
{
    public class UserServices : ISyncRFPUsersInformation
    {
        public void Dispose()
        {
            //throw new NotImplementedException();
        }

        public async Task<IEnumerable<RFPUsersInformation>> rFPUsersInformation()
        {
            IList<RFPUsersInformation> rFPUsersInformation =
                new List<RFPUsersInformation>
                {
                    new RFPUsersInformation { Id=1, AccessKey = "QWERTYUIOP",Environment="Sandbox", Name = "Narayana", Email="Narayana@pactera.com",Role="DeliveryTeamLead"  },
                    new RFPUsersInformation { Id=2, AccessKey = "ASDFGHJKL",Environment="Sandbox", Name = "Sreekanth", Email="Sreekanth@pactera.com", Role = "PracticeLead" },
                    new RFPUsersInformation { Id=3, AccessKey = "LKJHGFDSA",Environment="Sandbox", Name = "Sashi", Email="Sashi@pactera.com" , Role="DeliveryTeamLead"},
                    new RFPUsersInformation { Id=4, AccessKey = "POIUYTREWQ",Environment="Sandbox", Name = "Phani", Email="Phani@pactera.com" , Role="PracticeLead"},
                    new RFPUsersInformation { Id=5, AccessKey = "#EDCXSW@",Environment="Sandbox", Name = "Thomson", Email="Thomson@pactera.com" , Role="SalesLead"},
                    new RFPUsersInformation { Id=6, AccessKey = "!QAZ@WSX",Environment="Sandbox",Name = "maruthi", Email="maruthi@pactera.com" , Role="PursuitTeamLead"},
                    new RFPUsersInformation { Id=6, AccessKey = "ZAQ!XSW@",Environment="Sandbox",Name = "Aravind.Gattu", Email="Aravind.Gattu@pactera.com" , Role="PursuitTeamLead"}
                };


            return await Task.Run(() => rFPUsersInformation);
        }
    }
}
