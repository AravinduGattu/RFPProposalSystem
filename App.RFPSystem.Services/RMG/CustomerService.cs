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
    public class CustomerService : BaseService, ISyncCustomer
    {
        string strConString = Constants.DBConnection;
        
        public void Dispose()
        {
            //throw new NotImplementedException();
        }

        public async Task<List<Customer>> GetList(int id, string code, string status,string name, string country, int locationid, string poc)
        {
            _ = new List<Customer>();
            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand(" rmg.sp_GetAllCustomer", con);
                cmd.CommandType = CommandType.StoredProcedure;
                if (id > 0)
                    cmd.Parameters.AddWithValue("@Customer_ID", id);
                cmd.Parameters.AddWithValue("@Customer_Code", code);
                cmd.Parameters.AddWithValue("@Customer_Status", status);
                cmd.Parameters.AddWithValue("@Country", country);
                cmd.Parameters.AddWithValue("@Customer_Name", name);
                cmd.Parameters.AddWithValue("@Location_ID", locationid);
                cmd.Parameters.AddWithValue("@Customer_PoC", poc);

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
            List<Customer> list = ConvertDataTable<Customer>(dt);
            return list;
        }

        public async Task<int> Save(Customer item)
        {
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("rmg.sp_Department", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Customer_ID", item.Customer_ID);
                cmd.Parameters.AddWithValue("@Customer_Code", item.Customer_Code);
                cmd.Parameters.AddWithValue("@Customer_Name", item.CreatedByName);
                cmd.Parameters.AddWithValue("@Customer_Status", item.Customer_Status);
                cmd.Parameters.AddWithValue("@Country", item.Country);
                cmd.Parameters.AddWithValue("@Location_ID", item.Location_ID);
                cmd.Parameters.AddWithValue("@Customer_PoC", item.Customer_POC);
                cmd.Parameters.AddWithValue("@Customer_Flag", item.Customer_Flag == 0 ? 1 : 2);
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
                cmd.Parameters.AddWithValue("@Table", "rmg.Customer_Master");
                return await cmd.ExecuteNonQueryAsync();
            }
        }

    }
}
