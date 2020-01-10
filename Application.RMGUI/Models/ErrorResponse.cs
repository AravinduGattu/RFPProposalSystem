using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMG.Models
{
    public class ErrorResponse
    {


        public bool ErrorStatus { get; set; }

        public string ErrorMsg { get; set; }

        public int ErrorCode { get; set; }
    }
}
