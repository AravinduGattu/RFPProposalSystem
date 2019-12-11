using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects
{
    public class DatavizForProposalCategoryByUsers
    {
        public string userName { get; set; }

        public string proposalsCount { get; set; }

        public categoryStatus status { get; set; }

        public string category { get; set; }

    }
        
    public enum TaskStatus
    {
        Submitted = 1,
        InProcess = 2,
        Completed = 3,
        Pending = 4
    }

    public enum  categoryStatus
    {
        Submitted = 1,
        InProcess = 2,
        Completed = 3,
        Pending = 4
    }
    

    public class DatavizCategory_Proposal
    {
        public IEnumerable<DatavizForProposalCategoryByUsers> data { get; set; }
    }

}
