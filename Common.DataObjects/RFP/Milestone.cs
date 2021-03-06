﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects.RFP
{
    public class Milestone : AuditFields
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

    public class MilestoneMaster : AuditFields
    {
        public int ID { get; set; }

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
