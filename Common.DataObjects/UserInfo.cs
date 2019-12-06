using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects
{
    public class UserInfo
    {
        public int ID { get; set; }

        public string AccessKey { get; set; }

        public string Environment { get; set; }

        public string EmployeeName { get; set; }

        public string EmployeeID { get; set; }

        public string EmailID { get; set; }

        public UserRole Role { get; set; }

        public Stream Stream { get; set; }

        public DateTime LastLoginTime { get; set; }

        public DateTime LastLogoutTime { get; set; }

    }
}
