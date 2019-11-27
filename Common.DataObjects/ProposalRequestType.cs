using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects
{
    public enum ProposalRequestType
    {
        Project=1,
        Resource=2
    }

    public static class Constants
    {
        public static string DBPath = @"\\10.130.0.14\RFP\RFPData.db";
    }
}
