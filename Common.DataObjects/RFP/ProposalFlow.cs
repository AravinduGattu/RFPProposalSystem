using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects.RFP
{
    public class ProposalFlow : AuditFields
    {
        public int ID { get; set; }
        public string ProposalStatus { get; set; }
        public string Description { get; set; }
        public UserRole Role { get; set; }
        public int ApproveID { get; set; }
        public string ApproveTxt { get; set; }
        public int RejectID { get; set; }
        public string RejectTxt { get; set; }
        public int Status { get; set; }
    }
}
