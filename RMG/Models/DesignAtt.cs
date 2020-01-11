using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMG.Models
{
    public class DesignAtt
    {
        public string Designation { get; set; }

        public string DesignCode { get; set; }

        public string DesignStatus { get; set; }

        public string DesignStartDate { get; set; }

        public string DesignEndDate { get; set; }
        public string Created_By { get; set; }
        public DateTime Created_Date = DateTime.Now;
        public string Last_Updated_By { get; set; }
        public DateTime Last_Updated_Date = DateTime.Now;

    }
}
