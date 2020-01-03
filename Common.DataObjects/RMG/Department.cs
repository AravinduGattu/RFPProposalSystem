using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects.RMG
{
    public class Department : AuditFields
    {
        public int Dept_ID  { get; set; }
        public string Department_Code { get; set; }
        public string Department_Description { get; set; }
        public string Department_Status { get; set; }
        public DateTime Department_StartDate { get; set; }
        public DateTime Department_EndDate { get; set; }
        public int Department_Flag { get; set; }
    }
}
