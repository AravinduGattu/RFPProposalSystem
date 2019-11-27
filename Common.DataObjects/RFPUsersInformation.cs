using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects
{
    public class RFPUsersInformation
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string userId { get; set; }

        public string AccessKey { get; set; }

        public string Environment { get; set; }

        public ProposalUsers Role { get; set; }

        public Stream Stream { get; set; }

    }
}
