using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMG.Models
{
    public class EdgePracticeAtt
    {
        public string EdgePractice { get; set; }
        public string EpStatus { get; set; }
        public string EpStartDate { get; set; }
        public string EpEndDate { get; set; }
        public string Created_By { get; set; }
        public DateTime Created_Date = DateTime.Now;
        public string Last_Updated_By { get; set; }
        public DateTime Last_Updated_Date = DateTime.Now;
    }
}
