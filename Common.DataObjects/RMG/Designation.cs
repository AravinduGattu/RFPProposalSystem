using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects.RMG
{
    public class Designation : AuditFields
    {
        public int Designation_ID  { get; set; }
        public string Designation_Code { get; set; }
        public string Designation_Description { get; set; }
        public string Designation_Status { get; set; }
        public DateTime Designation_StartDate { get; set; }
        public DateTime Designation_EndDate { get; set; }
        public int Designation_Flag { get; set; }
    }
}
