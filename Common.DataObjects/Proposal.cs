﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects
{
    
    public class Schedule
    {
        public string milestone { get; set; }
        public DateTime scheduleStartDate { get; set; }
        public DateTime scheduleEndDate { get; set; }
        public string remarks { get; set; }
    }

   
    public class Proposal
    {
        public int ID { get; set; }
        public string ProposalID { get; set; }
        public string RequestType { get; set; }
        public string RFPCode { get; set; }
        public string OpportunityName { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string PracticeID { get; set; }
        public string PracticeLead { get; set; }
        public string Customer { get; set; }
        public int LocationID { get; set; }
        public string Scope { get; set; }
        public string Description { get; set; }
        public string SubmittedBy { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public DateTime RFPSubmissionDate { get; set; }
        public string POC { get; set; }
        public string AdditionalRemarks { get; set; }
        public ProposalRequestType ProposalStatus { get; set; }
    }

    public class ProposalGrid
    {
        public int ID { get; set; }
        public string CreatedBy { get; set; }
        public string ProposalID { get; set; }
        public string RFPCode { get; set; }
        public ProposalRequestType ProposalStatus { get; set; }
        public string RequestType { get; set; }       
        public DateTime ReleaseDate { get; set; }
        public string OpportunityName { get; set; }
        public string Scope { get; set; }
    }
}
