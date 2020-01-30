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
    public class BusinessGroupService : BaseService, ISyncBusinessGroup
    {
        string strConString = Constants.DBConnectionRMG;

        public void Dispose()
        {
            //throw new NotImplementedException();
        }

        public async Task<List<BusinessGroup>> GetList(int id, string code, string status, string startDate, string endDate)
        {
            List<BusinessGroup> list = new List<BusinessGroup>();
            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("rmg.sp_GetBusinessGroup_Master", con);
                cmd.CommandType = CommandType.StoredProcedure;
                if (id > 0)
                    cmd.Parameters.AddWithValue("@Business_ID", id);
                cmd.Parameters.AddWithValue("@Business_Code", code);
                cmd.Parameters.AddWithValue("@BusinessGroup_Status", status);
                cmd.Parameters.AddWithValue("@BusinessGroup_StartDate", startDate);
                cmd.Parameters.AddWithValue("@BusinessGroup_EndDate", endDate);

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
            list = ConvertDataTable<BusinessGroup>(dt); 
            return list;
        }

        public async Task<int> Save(BusinessGroup item)
        {
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("rmg.sp_BusinessGroup", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Business_ID", item.Business_ID);
                cmd.Parameters.AddWithValue("@Business_Code", item.Business_Code);
                cmd.Parameters.AddWithValue("@Business_Description", item.Business_Description);
                cmd.Parameters.AddWithValue("@BusinessGroup_Status", item.BusinessGroup_Status);
                cmd.Parameters.AddWithValue("@BusinessGroup_StartDate", item.BusinessGroup_StartDate);
                cmd.Parameters.AddWithValue("@BusinessGroup_EndDate", item.BusinessGroup_EndDate);
                cmd.Parameters.AddWithValue("@BusinessGroup_Flag", item.BusinessGroup_Flag == 0 ? 1 : 2);
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
                cmd.Parameters.AddWithValue("@Table", "BusinessGroup");
                return await cmd.ExecuteNonQueryAsync();
            }
        }

    }
}
