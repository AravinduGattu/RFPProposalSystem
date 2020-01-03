using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects.RFP
{
    public class FileUpload : AuditFields
    {
        /// <summary>
        /// Auto generated
        /// </summary>
        public int ID { get; set; }
       //Foreign Key
        public int ProposalID { get; set; }
        /// <summary>
        /// Length 400
        /// </summary>
        public string FilePath { get; set; }
        /// <summary>
        /// Length 200
        /// </summary>
        public string FileName { get; set; }
        /// <summary>
        /// Length 50
        /// </summary>
        public string FileType { get; set; }
        /// <summary>
        /// Length 100
        /// </summary>
        public string Category { get; set; }
    }

}
