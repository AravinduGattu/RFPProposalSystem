using Applications.Operations;
using Applications.Operations.RFP;
using Common.DataObjects;
using Common.DataObjects.RFP;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace App.RFPSystem.Services.RFP
{
    public class ProposalFlowService : BaseService, ISyncProposalFlow
    {
        string strConString = Constants.DBConnection;
        
        public void Dispose()
        {
            //throw new NotImplementedException();
        }

        public async Task<List<ProposalFlow>> GetList()
        {
            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_GETProposalFlow", con)
                {
                    CommandType = CommandType.StoredProcedure
                };
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
            List<ProposalFlow> list = ConvertDataTable<ProposalFlow>(dt);
            return list;
        }

    }
}
