using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects.RFP
{
    
    public class Schedule
    {
        public string milestone { get; set; }
        public DateTime scheduleStartDate { get; set; }
        public DateTime scheduleEndDate { get; set; }
        public string remarks { get; set; }
    }

   
    public class Proposal : AuditFields
    {
        public int ID { get; set; }
        public string RequestType { get; set; }
        public string RFPCode { get; set; }
        public string OpportunityName { get; set; }
        public DateTime ReleaseDate { get; set; }
        public Stream PracticeID { get; set; }
        public string PracticeName { get; set; }
        public string PracticeLead { get; set; }
        public string Customer { get; set; }
        public int LocationID { get; set; }
        public string LocationName { get; set; }
        public string Scope { get; set; }
        public string Description { get; set; }
        /// <summary>
        /// Used only for display purpose
        /// </summary>
        public string SubmittedByName { get; set; }
        public DateTime RFPSubmissionDate { get; set; }
        public string POC { get; set; }
        public string AdditionalRemarks { get; set; }
        public ProposalRequestType ProposalStatus { get; set; }
        public string ProposalStatusName { get; set; }
    }

    public class ProposalGrid
    {
        public int ID { get; set; }
        public string CreatedBy { get; set; }
        /// <summary>
        /// Used only for display purpose
        /// </summary>
        public string CreatedByName { get; set; }
        public string RFPCode { get; set; }
        public ProposalRequestType ProposalStatus { get; set; }
        public string ProposalStatusName { get; set; }
        public string RequestType { get; set; }       
        public DateTime ReleaseDate { get; set; }
        public string OpportunityName { get; set; }
        public string Scope { get; set; }
    }
}
