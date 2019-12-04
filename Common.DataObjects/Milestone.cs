using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects
{
    public class Milestone
    {
        /// <summary>
        /// AUto generated
        /// </summary>
        public int ID { get; set; }
        //Foreign Key
        public int MilestoneID { get; set; }
        public int ProposalID { get; set; }
        public MilestoneMaster MilestoneMaster { get; set; }
        public DateTime MilestoneStartDate { get; set; }
        public DateTime MilestoneEndDate { get; set; }
        /// <summary>
        /// Length Max
        /// </summary>
        public string Remarks { get; set; }
    }

    public class MilestoneMaster
    {
        public int MilestoneID { get; set; }

        /// <summary>
        /// Length 50
        /// </summary>
        public string Milestone { get; set; }

        /// <summary>
        /// Length Max
        /// </summary>
        public string Description { get; set; }
        
    }
}
