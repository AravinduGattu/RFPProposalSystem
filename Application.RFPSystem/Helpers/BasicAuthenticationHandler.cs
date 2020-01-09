using Application.RFPSystem.Controllers;
using Common.DataObjects;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Globalization;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace Application.RFPSystem.Helpers
{

    public class BasicAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        public BasicAuthenticationHandler(
            IOptionsMonitor<AuthenticationSchemeOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock)
            : base(options, logger, encoder, clock)
        {

        }

        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (!Request.Headers.ContainsKey("AuthToken"))
                return AuthenticateResult.Fail("Missing AuthToken Header");

            using (Applications.Operations.RFP.ISyncToken service = new App.RFPSystem.Services.RFP.TokenService())
            {
                string token = "";
                var result = await Task.Run(() =>
                    service.ValidateToken(Request.Headers["AuthToken"], out token));
                if (!string.IsNullOrEmpty(result))
                    return AuthenticateResult.Fail(result);

                var claims = new[] {
                    new Claim("Id", token.Split('~')[0]),
                    new Claim("Role", token.Split('~')[1]),
                    new Claim("Name", "User"),
                };
                var identity = new ClaimsIdentity(claims, Scheme.Name);
                var principal = new ClaimsPrincipal(identity);
                var ticket = new AuthenticationTicket(principal, Scheme.Name);

                return AuthenticateResult.Success(ticket);
            }
        }
    }
}
