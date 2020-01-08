using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects.RMG
{
    public class Customer : AuditFields
    {
        public int Customer_ID  { get; set; }
        public string Customer_Code { get; set; }
        public string Country { get; set; }
        public string Customer_Name { get; set; }
        public string Customer_POC { get; set; }
        public int Location_ID { get; set; }
        public string Customer_Status { get; set; }
        public int Customer_Flag { get; set; }
    }
}
