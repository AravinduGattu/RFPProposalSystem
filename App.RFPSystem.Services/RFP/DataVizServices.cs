using Applications.Operations;
using Common.DataObjects;
using Common.DataObjects.RFP;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace App.RFPSystem.Services
{
    public class DataVizServices : ISyncDataViz
    {
        public Task<DatavizCategory_Proposal> datavizCategory_Proposal()
        {

            DatavizCategory_Proposal datavizCategory_Proposal = new DatavizCategory_Proposal();
            datavizCategory_Proposal.data = datavizForProposalCategoryByUsers().Result;

            return Task.Run(() => datavizCategory_Proposal);

            
        }

        public Task<IEnumerable<DatavizForProposalCategoryByUsers>> datavizForProposalCategoryByUsers()
        {

            IEnumerable<DatavizForProposalCategoryByUsers> datavizForProposalCategoryByUsers = new List<DatavizForProposalCategoryByUsers>
            {
                new DatavizForProposalCategoryByUsers{  category = UserRole.SalesLead.ToString(), status =categoryStatus.Submitted, proposalsCount="5", userName="Thomson@pactera.com" },
                new DatavizForProposalCategoryByUsers{  category = UserRole.SalesLead.ToString(), status =categoryStatus.Submitted, proposalsCount="4", userName="Thomson@pactera.com" },
                new DatavizForProposalCategoryByUsers{  category = UserRole.SalesLead.ToString(), status =categoryStatus.InProcess, proposalsCount="3", userName="Thomson@pactera.com" },
                new DatavizForProposalCategoryByUsers{  category = UserRole.PursuitTeamLead.ToString(), status =categoryStatus.Pending, proposalsCount="6", userName="maruthi@pactera.com" },
                new DatavizForProposalCategoryByUsers{  category = UserRole.PursuitTeamLead.ToString(), status =categoryStatus.Pending, proposalsCount="7", userName="maruthi@pactera.com" },
                new DatavizForProposalCategoryByUsers{  category = UserRole.PursuitTeamLead.ToString(), status =categoryStatus.Completed, proposalsCount="3", userName="Aravind.Gattu@pactera.com" },
                new DatavizForProposalCategoryByUsers{  category = UserRole.PracticeLead.ToString(), status =categoryStatus.InProcess, proposalsCount="1", userName="Phani@pactera.com" },
            };



            return Task.Run(() => datavizForProposalCategoryByUsers);
        }

        public void Dispose()
        {
            //throw new NotImplementedException();
        }
    }
}
