using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMG.Models
{
    public class VendorContext
    {
        public string ConnectionString { get; set; }

        public VendorContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }
        public List<Vendor> GetAllVendor()
        {
            List<Vendor> list = new List<Vendor>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_AllVendors", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new Vendor()
                        {
                            vendor_code = reader["vendor_code"].ToString(),
                            vendor_name = reader["vendor_name"].ToString(),
                            email = reader["email"].ToString(),
                            vendor_site = reader["vendor_site"].ToString(),
                             mobile = reader["mobile"].ToString(),
                            telephone = reader["telephone"].ToString(),
                            vendor_status = reader["vendor_status"].ToString(),
                            vendor_startdate = reader["vendor_startdate"].ToString(),
                            vendor_enddate = reader["vendor_enddate"].ToString(),
                        });
                    }
                }
            }
            return list;

        }
       
        public List<Vendor> vendorSearchQuery(string pquery)
        {
            List<Vendor> list = new List<Vendor>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string query = pquery;
                MySqlCommand cmd = new MySqlCommand(query, conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new Vendor()
                        {
                            vendor_code = reader["vendor_code"].ToString(),
                            vendor_name = reader["vendor_name"].ToString(),
                            email = reader["email"].ToString(),
                            vendor_site = reader["vendor_site"].ToString(),
                         telephone = reader["telephone"].ToString(),
                            mobile = reader["mobile"].ToString(),
                            vendor_status = reader["vendor_status"].ToString(),
                            vendor_startdate = reader["vendor_startdate"].ToString(),
                            vendor_enddate = reader["vendor_enddate"].ToString(),
                        });
                    }
                }
            }
            return list;
        }
        public void AddVendor(Vendor vendor)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_AddVendor", conn);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;


                //cmd.Parameters.AddWithValue("vendor_code", vendor.vendor_code);
                cmd.Parameters.AddWithValue("vendor_name", vendor.vendor_name);
                cmd.Parameters.AddWithValue("email", vendor.email);
                cmd.Parameters.AddWithValue("vendor_site", vendor.vendor_site);
                cmd.Parameters.AddWithValue("telephone", vendor.telephone);
                cmd.Parameters.AddWithValue("mobile", vendor.mobile);
                //cmd.Parameters.AddWithValue("vendor_status", vendor.vendor_status);
                cmd.Parameters.AddWithValue("vendor_startdate", Convert.ToDateTime(vendor.vendor_startdate).Date);
                cmd.Parameters.AddWithValue("vendor_enddate", Convert.ToDateTime(vendor.vendor_enddate).Date);


                cmd.ExecuteNonQuery();
                conn.Close();
            }

        }
        public void UpdateVendor(Vendor vendor)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_UpdateVendor", conn);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                
                cmd.Parameters.AddWithValue("pvendor_code", vendor.vendor_code);
                cmd.Parameters.AddWithValue("vendor_name", vendor.vendor_name);
                cmd.Parameters.AddWithValue("email", vendor.email);
                cmd.Parameters.AddWithValue("vendor_site", vendor.vendor_site);
                cmd.Parameters.AddWithValue("telephone", vendor.telephone);
                cmd.Parameters.AddWithValue("mobile", vendor.mobile);
                cmd.Parameters.AddWithValue("vendor_status", vendor.vendor_status);
                cmd.Parameters.AddWithValue("vendor_startdate", vendor.vendor_startdate);
                cmd.Parameters.AddWithValue("vendor_enddate", vendor.vendor_enddate);


                cmd.ExecuteNonQuery();
                conn.Close();
            }

        }


    }

}
//vendor_id 
//vendor_code 
//vendor_name 
//vendor_site 
//vendor_contact 
//contact 
//vendor_status 
//vendor_startdate 
//vendor_enddate 
