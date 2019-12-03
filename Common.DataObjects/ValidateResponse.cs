using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Common.DataObjects
{
    public class ValidateResponse
    {
        public bool NoErrors { get; set; }

        public Exception exception { get; set; }

        public Task<IActionResult> controllerBase { get; set; }

        public Proposal RequestBody { get; set; }
    }
}
