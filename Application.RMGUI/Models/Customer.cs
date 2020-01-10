using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMG.Models
{
    public class Customer
    {
        public string business_group { get; set; }
        public string cust_code { get; set; }
        public string cust_name { get; set; }
        //public string Project_Name { get; set; }
        public string country { get; set; }
        public string city { get; set; }
        public string region { get; set; }
        public string location_id { get; set; }
        public string cust_status { get; set; }
        public string created_by { get; set; }
        public DateTime created_date = DateTime.Now;
        public string last_updated_by { get; set; }
        public DateTime last_updated_date = DateTime.Now;


    }
}
