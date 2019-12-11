using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects
{
    public class Assignment
    {
        public int ID { get; set; }
        public int ProposalID { get; set; }
        public string Task { get; set; }
        public string Name { get; set; }
        public DateTime AssignmentDate { get; set; }
        public TaskStatus Status { get; set; }
        public string StatusName { get; set; }

    }
}
