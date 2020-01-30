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
    public class RoleService : BaseService, ISyncRoleMaster
    {
        string strConString = Constants.DBConnectionRMG;

        public void Dispose()
        {
            //throw new NotImplementedException();
        }

        public async Task<List<RoleMaster>> GetList(int id, string name, string status, string startDate, string endDate)
        {
            _ = new List<RoleMaster>();
            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("rmg.sp_GetAllProjectRole", con);
                cmd.CommandType = CommandType.StoredProcedure;
                if (id > 0)
                    cmd.Parameters.AddWithValue("@Designation_ID", id);
                cmd.Parameters.AddWithValue("@Designation_Code", name);
                cmd.Parameters.AddWithValue("@Designation_Status", status);
                cmd.Parameters.AddWithValue("@Designation_StartDate", startDate);
                cmd.Parameters.AddWithValue("@Designation_EndDate", endDate);

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
            List<RoleMaster> list = ConvertDataTable<RoleMaster>(dt);
            return list;
        }

        public async Task<int> Save(RoleMaster item)
        {
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("rmg.sp_ProjectRoleInsertAndUpdate", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Role_ID", item.Role_ID);
                cmd.Parameters.AddWithValue("@Role_Name", item.Role_Name);
                cmd.Parameters.AddWithValue("@Role_Status", item.Role_Status);
                cmd.Parameters.AddWithValue("@Role_StartDate", item.Role_StartDate);
                cmd.Parameters.AddWithValue("@Role_EndDate", item.Role_EndDate);
                cmd.Parameters.AddWithValue("@Role_Flag", item.Role_Flag == 0 ? 1 : 2);
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
                SqlCommand cmd = new SqlCommand("rmg.sp_Delete", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", id);
                cmd.Parameters.AddWithValue("@Table", "Designation");
                return await cmd.ExecuteNonQueryAsync();
            }
        }

    }
}
