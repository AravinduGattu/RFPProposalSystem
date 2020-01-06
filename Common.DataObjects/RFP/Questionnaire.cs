using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects.RFP
{
    public class Questionnaire : AuditFields
    {
        public int ID { get; set; }
        public int ProposalID { get; set; }
        /// <summary>
        /// Length 50
        /// </summary>
        public string Area { get; set; }
        /// <summary>
        /// Length 100
        /// </summary>
        public string Question { get; set; }
        /// <summary>
        /// Max Length
        /// </summary>
        public string Answer { get; set; }
        /// <summary>
        /// Max Length
        /// </summary>
        public string Remarks { get; set; }        
    }
}
