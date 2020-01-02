using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects
{
    public class AuditFields
    {
        public int CreatedBy { get; set; }
        public string CreatedByName { get; set; }
        public int ModifiedBy { get; set; }
        public string ModifiedByName { get; set; }
    }
}
