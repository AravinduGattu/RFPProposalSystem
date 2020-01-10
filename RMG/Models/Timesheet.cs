using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMG.Models
{
    public class Timesheet
    {
        public string employee_No { get; set; }

        public string resource { get; set; }

        public string project_pactera_legal_entity { get; set; }

        public string timecard_id { get; set; }

        public string project_id { get; set; }

        public string approver { get; set; }

        public string project_name { get; set; }

        public string project_department { get; set; }

        public string status { get; set; }

        public DateTime start_Date { get; set; }

        public DateTime end_Date { get; set; }

        public string sunday_hours { get; set; }

        public string monday_hours { get; set; }

        public string tuesday_hours { get; set; }

        public string wednesday_hours { get; set; }

        public string thursday_hours { get; set; }

        public string friday_hours { get; set; }

        public string saturday_hours { get; set; }

        public string total_hours { get; set; }
    }
}
