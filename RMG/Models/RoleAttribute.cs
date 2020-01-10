
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMG.Models
{
    public class RoleAttribute
    {

        public string Employee_Id { get; set; }

        public string Employee_Name { get; set; }

        public string Role_Projects { get; set; }

        public string Project_Name { get; set; }

        public string Role_Designation { get; set; }

        public string Role_Description { get; set; }

        public string Role_Status { get; set; }

        public string Role_StartDate { get; set; }

        public string Role_EndDate { get; set; }

        // public int flag { get; set; }

        public string Role_CreatedBy { get; set; }

        public DateTime Role_CreatedDate = DateTime.Now;

        public string LastUpdatedBy { get; set; }

        public DateTime Role_LastUpdatedDate = DateTime.Now;

    }
}
