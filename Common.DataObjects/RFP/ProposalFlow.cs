using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects.RFP
{
    public class ProposalFlow : AuditFields
    {
        public int ID { get; set; }
        public string ProposalStatus { get; set; }
        public UserRole Role { get; set; }
        public bool CanApprove { get; set; }
        public bool CanReject { get; set; }
        public int Status { get; set; }
    }
}
