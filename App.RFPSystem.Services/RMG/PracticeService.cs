using Applications.Operations;
using Applications.Operations.RMG;
using Common.DataObjects;
using Common.DataObjects.RMG;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace App.RFPSystem.Services.RMG
{
    public class PracticeService : BaseService, ISyncPractice
    {
        string strConString = Constants.DBConnectionRMG;

        public void Dispose()
        {
            //throw new NotImplementedException();
        }

        public async Task<List<PracticeMaster>> GetList(int id, string code, string status, string startDate, string endDate)
        {
            _ = new List<PracticeMaster>();
            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("[rmg].[sp_GetAllEdgePractice]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                if (id > 0)
                    cmd.Parameters.AddWithValue("@Practice_ID", id);
                cmd.Parameters.AddWithValue("@Practice_Description", code);
                cmd.Parameters.AddWithValue("@Practice_Status", status);
                cmd.Parameters.AddWithValue("@Practice_StartDate", startDate);
                cmd.Parameters.AddWithValue("@Practice_EndDate", endDate);

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
            List<PracticeMaster> list = ConvertDataTable<PracticeMaster>(dt);
            return list;
        }

        public async Task<int> Save(PracticeMaster item)
        {
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("[rmg].[sp_EdgePracticeInsertAndUpdate]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Practice_ID", item.Practice_ID);
                cmd.Parameters.AddWithValue("@Practice_Description", item.Practice_Description);
                cmd.Parameters.AddWithValue("@Practice_Status", item.Practice_Status);
                cmd.Parameters.AddWithValue("@Practice_StartDate", item.Practice_StartDate);
                cmd.Parameters.AddWithValue("@Practice_EndDate", item.Practice_EndDate);
                cmd.Parameters.AddWithValue("@Practice_Flag", item.Practice_Flag == 0 ? 1 : 2);
                cmd.Parameters.AddWithValue("@Delete_Flag", item.Delete_Flag == 0 ? 1 : 2);
                cmd.Parameters.AddWithValue("@UserID", item.CreatedBy);
                return await cmd.ExecuteNonQueryAsync();
            }
        }

        public async Task<int> Delete(int id)
        {
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("[rmg].[sp_Delete]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", id);
                cmd.Parameters.AddWithValue("@Table", "[rmg].[Practice_Master]");
                return await cmd.ExecuteNonQueryAsync();
            }
        }

    }
}
