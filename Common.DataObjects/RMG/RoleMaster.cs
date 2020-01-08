using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects.RMG
{
    public class RoleMaster : AuditFields
    {
        public int Role_ID { get; set; }
        public string Role_Name { get; set; }
        public string Role_Status { get; set; }
        public DateTime Role_StartDate { get; set; }
        public DateTime Role_EndDate { get; set; }
        public int Role_Flag { get; set; }
    }
}
