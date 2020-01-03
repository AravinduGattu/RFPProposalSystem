using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects.RMG
{
    public class BusinessGroup : AuditFields
    {
        public int Business_ID { get; set; }
        public string Business_Code { get; set; }
        public string Business_Description { get; set; }
        public string BusinessGroup_Status { get; set; }
        public DateTime BusinessGroup_StartDate { get; set; }
        public DateTime BusinessGroup_EndDate { get; set; }
        public int BusinessGroup_Flag { get; set; }
    }
}
