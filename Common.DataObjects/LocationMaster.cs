using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects
{
    public class Location : AuditFields
    {
        public int ID { get; set; }

        public string LocationName { get; set; }

        public string LocationCode { get; set; }
        
    }
}
