using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects.RMG
{
    public class PracticeMaster : AuditFields
    {
        public int Practice_ID { get; set; }
        public string Practice_Description { get; set; }
        public string Practice_Status { get; set; }
        public DateTime Practice_StartDate { get; set; }
        public DateTime Practice_EndDate { get; set; }
        public int Practice_Flag { get; set; }
    }
}
