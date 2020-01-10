using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMG.Models
{
    public class DeptAtt
    {
        public string Department { get; set; }
        public string DepartmentCode { get; set; }

        public string  DeptStatus { get; set; }

        public string DepStartDate { get; set; }

        public string DepEndDate { get; set; }
        public string Created_By { get; set; }
        public DateTime Created_Date = DateTime.Now;
        public string Last_Updated_By { get; set; }
        public DateTime Last_Updated_Date = DateTime.Now;

    }
}
