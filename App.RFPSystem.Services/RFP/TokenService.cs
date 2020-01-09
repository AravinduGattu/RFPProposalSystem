using Applications.Operations;
using Applications.Operations.RFP;
using Common.DataObjects;
using Common.DataObjects.RFP;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace App.RFPSystem.Services.RFP
{
    public class TokenService : BaseService, ISyncToken
    {
        string strConString = Constants.DBConnection;
        
        public void Dispose()
        {
            //throw new NotImplementedException();
        }

        public string ValidateToken(string authToken, out string token)
        {
            token = null;
            try
            {
                string strDecrypted = Cipher.Decrypt(authToken, Constants.Token);
                
                if (string.IsNullOrEmpty(strDecrypted) || strDecrypted.IndexOf("~") == -1)
                {
                    return "Invalid AuthToken Header";
                }

                DateTime dateTime = new DateTime();
                DateTime.TryParseExact(strDecrypted.Split('~')[0], "yyyyMMddHHmmss", 
                    CultureInfo.InvariantCulture, DateTimeStyles.None, out dateTime);
                TimeSpan timeSpan = DateTime.Now.Subtract(dateTime);

                if (timeSpan.Ticks < 0 || timeSpan.Minutes > 60)
                {
                    return "Unauthorized. Invalid Token";
                }
                token = strDecrypted;
            }
            catch
            {   
                return "Invalid AuthToken Header";
            }
            return null;
        }
    }
}
