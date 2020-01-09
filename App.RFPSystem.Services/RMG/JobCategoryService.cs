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
    public class JobCategoryService : BaseService, ISyncJobCategory
    {
        string strConString = Constants.DBConnectionRMG;
        public void Dispose()
        {
           // throw new NotImplementedException();
        }

        public async Task<List<JobCategory>> GetList(int id, string code, string description, int jobFamilyId, string status, string startDate, string endDate)
        {
            _ = new List<JobCategory>();
            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("[rmg].[sp_GetAllCategories]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                if (id > 0)
                cmd.Parameters.AddWithValue("@Category_ID", id);
                cmd.Parameters.AddWithValue("@Category_Code", code);
                cmd.Parameters.AddWithValue("@Category_Description", description);
                if (jobFamilyId > 0)
                {
                    cmd.Parameters.AddWithValue("@JobFamily_ID", jobFamilyId);
                }
                cmd.Parameters.AddWithValue("@Category_Status", status);
                cmd.Parameters.AddWithValue("@Category_StartDate", startDate);
                cmd.Parameters.AddWithValue("@Category_EndDate", endDate);

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
            List<JobCategory> list = ConvertDataTable<JobCategory>(dt);
            return list;

        }

        public async Task<int> Save(JobCategory item)
        {
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("[rmg].[sp_CategoryMasterInsertAndUpdate]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Category_ID", item.Category_ID);
                cmd.Parameters.AddWithValue("@Category_Code", item.Category_Code);
                cmd.Parameters.AddWithValue("@Category_Description", item.Category_Description);
                cmd.Parameters.AddWithValue("@Category_Status", item.Category_Status);
                cmd.Parameters.AddWithValue("@JobFamily_ID", item.JobFamily_ID);
                cmd.Parameters.AddWithValue("@Category_StartDate", item.Category_StartDate);
                cmd.Parameters.AddWithValue("@Category_EndDate", item.Category_EndDate);
                cmd.Parameters.AddWithValue("@Category_Flag", item.Category_Flag == 0 ? 1 : 2);
                cmd.Parameters.AddWithValue("@Category_CreatedBy", item.CreatedBy);
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
                cmd.Parameters.AddWithValue("@Table", "[rmg].[Job_Category_Master]");
                return await cmd.ExecuteNonQueryAsync();
            }
        }

    }
}
