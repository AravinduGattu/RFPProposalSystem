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

            var strDecrypted = "";
            try
            {
                var strEncrypted = Request.Headers["AuthToken"];
                strDecrypted =
                    await Task.Run(() => Cipher.Decrypt(strEncrypted, Constants.Token));

                if (string.IsNullOrEmpty(strDecrypted) || strDecrypted.IndexOf("~") == -1)
                {
                    return AuthenticateResult.Fail("Invalid AuthToken Header");
                }

                DateTime dateTime = new DateTime();
                DateTime.TryParseExact(strDecrypted.Split('~')[1], "yyyyMMddHHmmss", CultureInfo.InvariantCulture, DateTimeStyles.None, out dateTime);
                TimeSpan timeSpan = DateTime.Now.Subtract(dateTime);

                if (timeSpan.Ticks < 0 || timeSpan.Minutes > 60)
                {
                    return AuthenticateResult.Fail("Unauthorized. Invalid Token");
                }
            }
            catch
            {
                return AuthenticateResult.Fail("Invalid AuthToken Header");
            }

            var claims = new[] {
                new Claim("Id", strDecrypted.Split('~')[0]),
                new Claim("Name", "User"),
            };
            var identity = new ClaimsIdentity(claims, Scheme.Name);
            var principal = new ClaimsPrincipal(identity);
            var ticket = new AuthenticationTicket(principal, Scheme.Name);

            return AuthenticateResult.Success(ticket);
        }
    }
}
