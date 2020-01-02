using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects
{
    public class Pricing
    {
        public int ID { get; set; }
        public int ProposalID { get; set; }
        public UserRole Role { get; set; }
        public string Description { get; set; }
        public int Count { get; set; }
        public int Allocation { get; set; }
        public int LocationID { get; set; }
        public string LocationName { get; set; }
        public decimal TotalHours { get; set; }
        public decimal TotalCost { get; set; }
    }
}
