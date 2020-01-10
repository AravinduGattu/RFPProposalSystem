using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMG.Models
{
    public class ProjectAttribute
    {

        public string Project_Name { get; set; }

        public string Project_Code { get; set; }

        public string Project_Description { get; set; }

        public string Project_StartDate { get; set; }

        public string Project_EndDate { get; set; }

        public string Project_Status { get; set; }

        public string Project_LocationId { get; set; }

        public string Project_Location { get; set; }

        public string Project_Billable { get; set; }

        public string Customer_Details { get; set; }

        public DateTime Created_On = DateTime.Now;

        public string Created_By { get; set; }

         public string Last_Updated_By { get; set; }

        public DateTime Updated_On = DateTime.Now;
    }
}
