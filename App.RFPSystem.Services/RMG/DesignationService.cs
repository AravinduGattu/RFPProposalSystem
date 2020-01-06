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
    public class DesignationService : BaseService, ISyncDesignation
    {
        string strConString = Constants.DBConnection;
        
        public void Dispose()
        {
            //throw new NotImplementedException();
        }

        public async Task<List<Designation>> GetList(int id, string code, string status, string startDate, string endDate)
        {
            _ = new List<Designation>();
            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand(" [rmg].[sp_GetDesignationMaster]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                if (id > 0)
                    cmd.Parameters.AddWithValue("@Designation_ID", id);
                cmd.Parameters.AddWithValue("@Designation_Code", code);
                cmd.Parameters.AddWithValue("@Designation_Status", status);
                cmd.Parameters.AddWithValue("@Designation_StartDate", startDate);
                cmd.Parameters.AddWithValue("@Designation_EndDate", endDate);

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
            List<Designation> list = ConvertDataTable<Designation>(dt);
            return list;
        }

        public async Task<int> Save(Designation item)
        {
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("[rmg].[sp_Department]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Designation_ID", item.Designation_ID);
                cmd.Parameters.AddWithValue("@Designation_Code", item.Designation_Code);
                cmd.Parameters.AddWithValue("@Designation_Description", item.Designation_Description);
                cmd.Parameters.AddWithValue("@Designation_Status", item.Designation_Status);
                cmd.Parameters.AddWithValue("@Designation_StartDate", item.Designation_StartDate);
                cmd.Parameters.AddWithValue("@Designation_EndDate", item.Designation_EndDate);
                cmd.Parameters.AddWithValue("@Designation_Flag", item.Designation_Flag == 0 ? 1 : 2);
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
                cmd.Parameters.AddWithValue("@Table", "Designation");
                return await cmd.ExecuteNonQueryAsync();
            }
        }

    }
}
