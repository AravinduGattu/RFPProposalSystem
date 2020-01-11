using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects.RMG
{
    public class JobCategory : AuditFields
    {
        public int Category_ID { get; set; }
        public string Category_Code { get; set; }
        public string Category_Description { get; set; }
        public int JobFamily_ID { get; set; }
        public string JobFamily_Description { get; set; }
        public DateTime Category_StartDate { get; set; }
        public DateTime Category_EndDate { get; set; }
        public string Category_Status { get; set; }
        public int Category_Flag { get; set; }
    }
}

