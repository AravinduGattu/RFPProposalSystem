using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects.RMG
{
    public class Employee :AuditFields
    {
        public int Emp_ID { get; set; }
        public string Emp_Code { get; set; }
        public string Emp_Name { get; set; }
        public int Business_ID { get; set; }
        public string Business_Description { get; set; }
        public int Designation_ID { get; set; }
        public string Designation_Description { get; set; }
        public int Practice_ID { get; set; }
        public string Practice_Description { get; set; }
        public int COE_ID { get; set; }
        public string COE_Description { get; set; }
        public int Dept_ID { get; set; }
        public string Department_Description { get; set; }
        public int Location_ID { get; set; }
        public string City { get; set; }
        public DateTime? JoiningDate { get; set; }
        public string Phone { get; set; }
        public string AlterNativePhone { get; set; }
        public string Address1 { get; set; }
        public string EmailID { get; set; }
        public string Reporting_Mgr_ID { get; set; }
        public string Rep_Emp_Name { get; set; }
        public string EMP_Status { get; set; }
        public int JobFamily_ID { get; set; }
        public string JobFamily_Description { get; set; }
        public int Category_ID { get; set; }
        public string Category_Description { get; set; }
        public int SubCategory_ID { get; set; }
        public string SubCategory_Description { get; set; }
        public int Emp_Flag { get; set; }
    }
}


