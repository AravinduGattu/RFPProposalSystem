using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMG.Models
{
    public class CoeAtt
    {
        public string COE { get; set; }

        public string COEStatus { get; set; }

        public string COEStartDate { get; set; }

        public string COEEndDate { get; set; }
        public string Created_By { get; set; }
        public DateTime Created_Date = DateTime.Now;
        public string Last_Updated_By { get; set; }
        public DateTime Last_Updated_Date = DateTime.Now;
    }
}
