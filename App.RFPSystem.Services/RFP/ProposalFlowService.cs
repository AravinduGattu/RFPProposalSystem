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
                SqlCommand cmd = new SqlCommand("sp_GETProposalFlow", con);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
            List<ProposalFlow> list = ConvertDataTable<ProposalFlow>(dt);
            //list.ForEach(x => x.StatusName = ((Common.DataObjects.RFP.TaskStatus)x.Status).ToString());
            return list;
        }

        public async Task<int> Save(ProposalFlow item)
        {
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_ProposalFlow", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", item.ID);
                cmd.Parameters.AddWithValue("@ProposalStatus", item.ProposalStatus);
                cmd.Parameters.AddWithValue("@Role", (int)item.Role);
                cmd.Parameters.AddWithValue("@CanApprove", item.CanApprove);
                cmd.Parameters.AddWithValue("@CanReject", item.CanReject);
                cmd.Parameters.AddWithValue("@Status", item.ID == 0 ? 1 : 2);
                cmd.Parameters.AddWithValue("@UserID", item.CreatedBy);
                return await cmd.ExecuteNonQueryAsync();
            }
        }

    }
}
