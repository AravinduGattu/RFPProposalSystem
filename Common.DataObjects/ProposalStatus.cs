using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects
{
    public class ProposalStatus
    {
        public int ID { get; set; }
        public int ProposalID { get; set; }
        public string RequestType { get; set; }
        public DateTime Date { get; set; }
        public ProposalRequestType Status { get; set; }
        public string Acceptance { get; set; }
        public int UserID { get; set; }
    }
}
