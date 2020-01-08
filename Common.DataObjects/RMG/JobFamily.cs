using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects.RMG
{
    public class JobFamily : AuditFields
    {
        public int JobFamily_ID { get; set; }
        public string JobFamily_Code { get; set; }
        public string JobFamily_Description { get; set; }
        public DateTime JobFamily_StartDate { get; set; }
        public DateTime JobFamily_EndDate { get; set; }
        public string JobFamily_Status { get; set; }
        public int JobFamily_Flag { get; set; }
    }
}
