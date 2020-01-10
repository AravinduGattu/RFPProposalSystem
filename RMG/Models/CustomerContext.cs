using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;


namespace RMG.Models
{
    public class CustomerContext
    {
        public string ConnectionString { get; set; }

        public CustomerContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }
        public object GetAllCustomer()
        //public List<Customer> GetAllCustomer()
        {
            List<Customer> list = new List<Customer>();
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_AllCustomers", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            list.Add(new Customer()
                            {
                                business_group = reader["bg_desc"].ToString(),
                                cust_code = reader["cust_code"].ToString(),
                                cust_name = reader["cust_name"].ToString(),
                                //Project_Name = reader["Project_Name"].ToString(),
                                country = reader["country"].ToString(),
                                location_id = reader["City"].ToString(),
                                cust_status = reader["cust_status"].ToString(),
                            });
                        }
                        response.status = true;
                        response.data = list;
                    }
                }
            }
            catch (Exception e)
            {
                response.status = false;
                response.exception = e;

            }
            return response;
        }
           
        public object custSearchQuery(string pquery)
        //public List<Customer> custSearchQuery(string pquery)
        {
            List<Customer> list = new List<Customer>();
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {

                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    string query = pquery;
                    MySqlCommand cmd = new MySqlCommand(query, conn);

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            list.Add(new Customer()
                            {
                                business_group = reader["bg_desc"].ToString(),
                                cust_code = reader["cust_code"].ToString(),
                                cust_name = reader["cust_name"].ToString(),
                                //Project_Name = reader["Project_Name"].ToString(),
                                country = reader["country"].ToString(),
                                city = reader["city"].ToString(),
                                region = reader["region"].ToString(),
                                location_id = reader["city"].ToString(),
                                cust_status = reader["cust_status"].ToString(),
                            });
                        }
                        response.status = true;
                        response.data = list;
                    }
                }
            }
            catch (Exception e)
            {
                response.status = false;
                response.exception = e;

            }
            return response;
        }

        public object AddCustomer(Customer customer)
        //public void AddCustomer(Customer customer)
        {
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection conn = GetConnection())
                {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_AddCustomer", conn);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("p_business_group", customer.business_group);
                cmd.Parameters.AddWithValue("p_cust_code", customer.cust_code);
                cmd.Parameters.AddWithValue("p_cust_name", customer.cust_name);
                //cmd.Parameters.AddWithValue("p_Project_Name", customer.Project_Name);
                //cmd.Parameters.AddWithValue("p_country", customer.country);
                cmd.Parameters.AddWithValue("p_city", customer.city);
                   // cmd.Parameters.AddWithValue("p_region", customer.region);
                    cmd.Parameters.AddWithValue("p_created_by", customer.created_by);
                cmd.Parameters.AddWithValue("p_created_date", Convert.ToDateTime(customer.created_date).Date);


                //cmd.Parameters.AddWithValue("p_cust_status", customer.cust_status);


                cmd.ExecuteNonQuery();
                conn.Close();
                    response.status = true;
                }

        }
            catch (Exception e)
            {
                response.status = false;
                response.exception = e;

            }
            return response;
        }

        public void DeleteCustomer(string cust_id)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_DeleteCustomer", conn);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("pcust_id", cust_id);


                cmd.ExecuteNonQuery();
                conn.Close();
            }

        }
        public object UpdateCustomer(Customer customer)
        //public void UpdateCustomer(Customer customer)
        {
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection conn = GetConnection())

            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_UpdateCustomer", conn);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("p_business_group", customer.business_group);
                cmd.Parameters.AddWithValue("p_cust_code", customer.cust_code);
                cmd.Parameters.AddWithValue("p_cust_name", customer.cust_name);
                    cmd.Parameters.AddWithValue("p_city", customer.city);
                    //cmd.Parameters.AddWithValue("p_country", customer.country);
                    //cmd.Parameters.AddWithValue("p_region", customer.region);
                cmd.Parameters.AddWithValue("p_cust_status", customer.cust_status);
                cmd.Parameters.AddWithValue("p_last_updated_by", customer.last_updated_by);
                cmd.Parameters.AddWithValue("p_last_updated_date", Convert.ToDateTime(customer.last_updated_date).Date);
                cmd.ExecuteNonQuery();
                conn.Close();
                response.status = true;
                }
        }
            catch (Exception e)
            {
                response.status = false;
                response.exception = e;

            }
            return response;
        }

        public List<BaseLocation> GetAllCity()
        {
            List<BaseLocation> list = new List<BaseLocation>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_Employee_BaseLocation", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new BaseLocation()
                        {

                            city = reader["city"].ToString(),
                            country = reader["country"].ToString(),
                            region = reader["Region"].ToString(),
                        });
                    }
                }
            }
            return list;
        }
        public List<BaseLocation> GetAllCountry()
        {
            List<BaseLocation> list = new List<BaseLocation>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_countrydropdown", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new BaseLocation()
                        {

                            country = reader["Country"].ToString(),
                        });
                    }
                }
            }
            return list;
        }

        public List<BusinessGroup> GetAllBusinessGroups()
        {
            List<BusinessGroup> list = new List<BusinessGroup>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_BusinessGroup", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new BusinessGroup()
                        {
                            bg_desc = reader["bg_desc"].ToString(),
                        });
                    }
                }
            }
            return list;
        }


    }
}
