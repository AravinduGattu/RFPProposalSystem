using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMG.Models
{
    public class Employee
    {
        //private EmployeeContext context;
        public string bg_id { get; set; }
        public string Emp_Id { get; set; }
        public string Emp_Name { get; set; }
        public string Designation_Id { get; set; }
        public string Department_Id { get; set; }
        public string Edge_Practice_Id { get; set; }
        public string Coe_Id { get; set; }
        public string Job_Description { get; set; }
        public string Cat_Description { get; set; }
        public string Sub_Cat_Description { get; set; }
        public string Location_Id { get; set; }
        public string Location { get; set; }
        public string Joining_Date{ get; set; }
        public string Contact_Number { get; set; }
        public string Address { get; set; }
        public string Email_Id { get; set; }
        public string Reporting_To { get; set; }
        public string Reporting_To_Email { get; set; }
        public string Flag_Status { get; set; }
        public string Created_By { get; set; }
        public DateTime Created_Date = DateTime.Now;
        public string Last_Updated_By { get; set; }
        public DateTime Last_Updated_Date = DateTime.Now;

    }
}
