using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects
{
    public enum UserRole
    {
        SalesLead = 1,
        PracticeLead = 2,
        PursuitTeamLead = 3,
        DeliveryTeamLead = 4,
        DevLead = 5,
        TestLead = 6,
        JuniorDeveloper = 7,
        JuniorTester = 8,
        SeniorDeveloper = 9,
        SeniorTester = 10,
    }

    public enum Stream
    {
        Engineering = 1,
        Digitalization = 2,
        Globalization = 3,
        EmergingTech = 4
    }
    public enum ProposalRequestType
    {
        Drafted = 1,
        //PRLApprove
        Draft_Reviewed = 2,
        //PRLReject
        Draft_Rejected = 3,
        Draft_Resubmit = 4,
        //PULApprove
        Solution_Created = 5,
        //PRLApprove
        Solution_Reviwed = 6,
        //PRLApprove
        Pricing_Created = 7,
        //PRLReject
        Solution_Rejected = 8,
        //PRLReject
        Solution_Resubmit = 9,
        //SL
        Presentation_Submited = 10,
        //PRL 
        Assigned_To_Delivery_Team = 11,
        //DL
        Accept = 12
    }
}
