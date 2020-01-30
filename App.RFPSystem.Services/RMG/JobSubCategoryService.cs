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
    public class JobSubCategoryService : BaseService, ISyncJobSubCategory
    {
        string strConString = Constants.DBConnectionRMG;
        public void Dispose()
        {
          //  throw new NotImplementedException();
        }

        public async Task<List<JobSubCategory>> GetList(int id, string code, string description, int jobFamilyId, int categoryId, string status, string startDate, string endDate)
        {
            _ = new List<JobSubCategory>();
            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("rmg.sp_GetAllSubCategories", con);
                cmd.CommandType = CommandType.StoredProcedure;
                if (id > 0)
                cmd.Parameters.AddWithValue("@SubCategory_ID", id);
                cmd.Parameters.AddWithValue("@SubCategory_Code", code);
                cmd.Parameters.AddWithValue("@SubCategory_Description", description);
                if (jobFamilyId > 0)
                {
                    cmd.Parameters.AddWithValue("@JobFamily_ID", jobFamilyId);
                }
                if (categoryId > 0)
                {
                    cmd.Parameters.AddWithValue("@Category_ID", categoryId);
                }
                cmd.Parameters.AddWithValue("@SubCategory_Status", status);
                cmd.Parameters.AddWithValue("@SubCategory_StartDate", startDate);
                cmd.Parameters.AddWithValue("@SubCategory_EndDate", endDate);

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
            List<JobSubCategory> list = ConvertDataTable<JobSubCategory>(dt);
            return list;

        }

        public async Task<int> Save(JobSubCategory item)
        {
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("rmg.sp_SubCategoryMasterInsertAndUpdate", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@SubCategory_ID", item.SubCategory_ID);
                cmd.Parameters.AddWithValue("@SubCategory_Code", item.SubCategory_Code);
                cmd.Parameters.AddWithValue("@SubCategory_Description", item.SubCategory_Description);
                cmd.Parameters.AddWithValue("@SubCategory_Status", item.SubCategory_Status);
                cmd.Parameters.AddWithValue("@JobFamily_ID", item.JobFamily_ID);
                cmd.Parameters.AddWithValue("@Category_ID", item.Category_ID);
                cmd.Parameters.AddWithValue("@SubCategory_StartDate", item.SubCategory_StartDate);
                cmd.Parameters.AddWithValue("@SubCategory_EndDate", item.SubCategory_EndDate);
                cmd.Parameters.AddWithValue("@SubCategory_Flag", item.SubCategory_Flag == 0 ? 1 : 2);
                cmd.Parameters.AddWithValue("@SubCat_CreatedBy", item.CreatedBy);
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
                cmd.Parameters.AddWithValue("@Table", "[rmg].[Job_SubCategory_Master]");
                return await cmd.ExecuteNonQueryAsync();
            }
        }
    }
}
