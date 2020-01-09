using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects.RMG
{
    public class JobSubCategory : AuditFields
    {
        public int SubCategory_ID { get; set; }
        public string SubCategory_Code { get; set; }
        public string SubCategory_Description { get; set; }
        public int JobFamily_ID { get; set; }
        public string JobFamily_Description { get; set; }
        public int Category_ID { get; set; }
        public string Category_Description { get; set; }
        public DateTime SubCategory_StartDate { get; set; }
        public DateTime SubCategory_EndDate { get; set; }
        public string SubCategory_Status { get; set; }
        public int SubCategory_Flag { get; set; }
    }
}
