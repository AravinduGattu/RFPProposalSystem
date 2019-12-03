using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects
{
    public class ProposalStatus
    {
        public int Id { get; set; }
        public int ProposalID { get; set; }
        public string Date { get; set; }
        public string Status { get; set; }
        public string Accceptance { get; set; }
        public string RFPUserID { get; set; }
    }
}
