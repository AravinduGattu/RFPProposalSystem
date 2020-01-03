using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects.RFP
{
    public class AuditFields
    {
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedByName { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string ModifiedByName { get; set; }
    }
}
