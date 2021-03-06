﻿using System;
using System.Linq;
using System.Threading.Tasks;

namespace RMG.Models
{
    public class ResourceReqAttribute
    {
        public string Res_req_pid { get; set; }

        public string Res_req_created_by { get; set; }

        public string Requested_by_id { get; set; }

        public string Res_req_num_res { get; set; }


        public string Res_req_project_name { get; set; }
        public string Res_req_coe { get; set; }
        public string Res_req_request_for { get; set; }

        public string Res_req_customer_name { get; set; }

        public string Res_req_ccc { get; set; }


        public string Res_req_skillset { get; set; }


        public string Res_req_type_of_billing { get; set; }


        public string Res_req_location { get; set; }


        public string Res_req_category { get; set; }


        public string Res_req_practice_name { get; set; }


        public string Res_req_start_date { get; set; }


        public string Res_req_end_date { get; set; }


        public string Res_req_textarea { get; set; }


        public string Res_req_status { get; set; }

        public DateTime Res_req_created_on = DateTime.Now;

    }
}

