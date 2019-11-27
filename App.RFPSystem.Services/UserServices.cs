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
                    new RFPUsersInformation { Id=1, AccessKey = "QWERTYUIOP", Environment="Sandbox", Name = "Narayana", Email="Narayana@pactera.com", Role = ProposalUsers.DeliveryTeamLead, Stream = Stream.Engineering  },
                    new RFPUsersInformation { Id=2, AccessKey = "ASDFGHJKL", Environment="Sandbox", Name = "Sreekanth", Email="Sreekanth@pactera.com", Role = ProposalUsers.PracticeLead, Stream = Stream.Digitalization },
                    new RFPUsersInformation { Id=3, AccessKey = "LKJHGFDSA", Environment="Sandbox", Name = "Sashi", Email="Sashi@pactera.com" , Role = ProposalUsers.DeliveryTeamLead, Stream = Stream.Globalization },
                    new RFPUsersInformation { Id=4, AccessKey = "POIUYTREWQ", Environment="Sandbox", Name = "Phani", Email="Phani@pactera.com" , Role = ProposalUsers.PracticeLead, Stream = Stream.Digitalization },
                    new RFPUsersInformation { Id=5, AccessKey = "#EDCXSW@", Environment="Sandbox", Name = "Thomson", Email="Thomson@pactera.com" , Role = ProposalUsers.SalesLead, Stream = Stream.EmergingTech },
                    new RFPUsersInformation { Id=6, AccessKey = "!QAZ@WSX", Environment="Sandbox", Name = "maruthi", Email="maruthi@pactera.com" , Role = ProposalUsers.PursuitTeamLead, Stream = Stream.Engineering },
                    new RFPUsersInformation { Id=6, AccessKey = "ZAQ!XSW@", Environment="Sandbox", Name = "Aravind.Gattu", Email="Aravind.Gattu@pactera.com" , Role = ProposalUsers.PursuitTeamLead, Stream = Stream.Globalization }
                };


            return await Task.Run(() => rFPUsersInformation);
        }
    }
}
