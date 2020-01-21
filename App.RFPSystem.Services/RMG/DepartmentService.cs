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
    public class DepartmentService : BaseService, ISyncDepartment
    {
        string strConString = Constants.DBConnectionRMG;

        public void Dispose()
        {
            //throw new NotImplementedException();
        }

        public async Task<List<Department>> GetList(int id, string code, string status, string startDate, string endDate)
        {
            _ = new List<Department>();
            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("rmg.sp_GetDepartmentMaster", con);
                cmd.CommandType = CommandType.StoredProcedure;
                if (id > 0)
                    cmd.Parameters.AddWithValue("@Dept_ID", id);
                cmd.Parameters.AddWithValue("@Department_Code", code);
                cmd.Parameters.AddWithValue("@Department_Status", status);
                cmd.Parameters.AddWithValue("@Department_StartDate", startDate);
                cmd.Parameters.AddWithValue("@Department_EndDate", endDate);

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
            List<Department> list = ConvertDataTable<Department>(dt);
            return list;
        }

        public async Task<int> Save(Department item)
        {
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("rmg.sp_Department", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Dept_ID", item.Dept_ID);
                cmd.Parameters.AddWithValue("@Department_Code", item.Department_Code);
                cmd.Parameters.AddWithValue("@Department_Description", item.Department_Description);
                cmd.Parameters.AddWithValue("@Department_Status", item.Department_Status);
                cmd.Parameters.AddWithValue("@Department_StartDate", item.Department_StartDate);
                cmd.Parameters.AddWithValue("@Department_EndDate", item.Department_EndDate);
                cmd.Parameters.AddWithValue("@Department_Flag", item.Department_Flag == 0 ? 1 : 2);
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
                cmd.Parameters.AddWithValue("@Table", "Department");
                return await cmd.ExecuteNonQueryAsync();
            }
        }

    }
}
