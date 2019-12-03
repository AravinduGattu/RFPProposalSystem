using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects
{
    public class Questionnaire
    {
        public int QuestionnaireID { get; set; }
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
