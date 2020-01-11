using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMG.Models
{
    public class Bussinessgroupatt
    {
        public string bg_description { get; set; }
        public string bg_status { get; set; }
        public string bg_startdate { get; set; }
        public string bg_enddate { get; set; }
        public string Created_By { get; set; }
        public DateTime Created_Date = DateTime.Now;
        public string Last_Updated_By { get; set; }
        public DateTime Last_Updated_Date = DateTime.Now;
    }
}
