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
    public class LocationService : BaseService, ISyncLocationMaster
    {
        string strConString = Constants.DBConnectionRMG;

        public void Dispose()
        {
            //throw new NotImplementedException();
        }

        public async Task<List<LocationMaster>> GetList(int id, string code, string status, string country, string city, string region, string postalcode)
        {
            _ = new List<LocationMaster>();
            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("rmg.sp_GetAllLocation", con)
                {
                    CommandType = CommandType.StoredProcedure
                };
                if (id > 0)
                    cmd.Parameters.AddWithValue("@Location_ID", id);
                cmd.Parameters.AddWithValue("@Location_Code", code);
                cmd.Parameters.AddWithValue("@County", status);
                cmd.Parameters.AddWithValue("@City", city);
                cmd.Parameters.AddWithValue("@Region", region);
                cmd.Parameters.AddWithValue("@PostalCode", postalcode);
                cmd.Parameters.AddWithValue("@Location_Status", status);
                
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
            List<LocationMaster> list = ConvertDataTable<LocationMaster>(dt);
            return list;
        }

        public async Task<int> Save(LocationMaster item)
        {
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("rmg.sp_LocationMasterInsertAndUpdate", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Location_ID", item.Location_ID);
                cmd.Parameters.AddWithValue("@Location_Code", item.Location_Code);
                cmd.Parameters.AddWithValue("@County", item.County);
                cmd.Parameters.AddWithValue("@City", item.City);
                cmd.Parameters.AddWithValue("@Region", item.Region);
                cmd.Parameters.AddWithValue("@PostalCode", item.PostalCode);
                cmd.Parameters.AddWithValue("@Location_Status", item.Location_Status);
                cmd.Parameters.AddWithValue("@Location_Flag", item.Location_Flag == 0 ? 1 : 2);
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
