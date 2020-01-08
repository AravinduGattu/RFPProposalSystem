using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects.RMG
{
    public class LocationMaster : AuditFields
    {
        public int Location_ID { get; set; }
        public string Location_Code { get; set; }
        public string County { get; set; }
        public string Location_Status { get; set; }
        public string City { get; set; }
        public string Region { get; set; }
        public string PostalCode { get; set; }
        public int Location_Flag { get; set; }
    }
}
