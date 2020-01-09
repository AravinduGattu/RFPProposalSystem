using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects.RFP
{
    public class ProposalStatus // : AuditFields
    {
        public int ID { get; set; }
        public int ProposalID { get; set; }
        public string RequestType { get; set; }
        public DateTime Date { get; set; }
        public int Status { get; set; }
        public string StatusName { get; set; }
        public string StatusDescription { get; set; }
        public string Acceptance { get; set; }
        public int UserID { get; set; }
        public string CreatedByName { get; set; }
    }
}
