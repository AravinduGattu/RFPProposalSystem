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
    public class JobFamilyService : BaseService, ISyncJobFamily
    {
        string strConString = Constants.DBConnectionRMG;

        public void Dispose()
        {
            //throw new NotImplementedException();
        }

        public async Task<List<JobFamily>> GetList(int id, string code, string description, string status, string startDate, string endDate)
        {
            _ = new List<JobFamily>();
            //List<JobFamily> list = new List<JobFamily>();
            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("[rmg].[sp_GetAllJobFamily]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                if (id > 0)
                cmd.Parameters.AddWithValue("@JobFamily_ID", id);
                cmd.Parameters.AddWithValue("@JobFamily_Code", code);
                cmd.Parameters.AddWithValue("@JobFamily_Description", description);
                cmd.Parameters.AddWithValue("@JobFamily_Status", status);
                cmd.Parameters.AddWithValue("@JobFamily_StartDate", startDate);
                cmd.Parameters.AddWithValue("@JobFamily_EndDate", endDate);

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
            List<JobFamily> list = ConvertDataTable<JobFamily>(dt);
            return list;
           
        }

        public async Task<int> Save(JobFamily item)
        {
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("[rmg].[sp_JobFamilyMasterInsertAndUpdate]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@JobFamily_ID", item.JobFamily_ID);
                cmd.Parameters.AddWithValue("@JobFamily_Code", item.JobFamily_Code);
                cmd.Parameters.AddWithValue("@JobFamily_Description", item.JobFamily_Description);
                cmd.Parameters.AddWithValue("@JobFamily_Status", item.JobFamily_Status);
                cmd.Parameters.AddWithValue("@JobFamily_StartDate", item.JobFamily_StartDate);
                cmd.Parameters.AddWithValue("@JobFamily_EndDate", item.JobFamily_EndDate);
                cmd.Parameters.AddWithValue("@JobFamily_Flag", item.JobFamily_Flag == 0 ? 1 : 2);
                cmd.Parameters.AddWithValue("@JobFamily_CreatedBy", item.CreatedBy);
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
                cmd.Parameters.AddWithValue("@Table", "[rmg].[Job_Family_Master]");
                return await cmd.ExecuteNonQueryAsync();
            }
        }
    }
}
