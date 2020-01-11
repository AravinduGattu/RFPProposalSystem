using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMG.Models
{
    public class LoginResponse
    {
        
        public bool ValidUser { get; set; }

        public bool ValidPwd { get; set; }

        public string UserType { get; set; }

        public string empId { get; set; }

        public string lastLoginDate { get; set; }



    }
}
