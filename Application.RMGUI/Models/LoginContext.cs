  
//
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using System.Configuration;

namespace RMG.Models
{
    public class LoginContext
    {

        public string ConnectionString { get; set; }

        public LoginContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }


        public object ValidateUser(String mailId, String pwd,String p_today)
        {
            int num =0;
            LoginResponse logResponse = new LoginResponse();
           
            APIResponse response = new APIResponse();
            logResponse.ValidUser = false;
            logResponse.ValidPwd = false;
            


            try
            {
                using (MySqlConnection connection = GetConnection())
                {
                    connection.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_ValidateUser", connection);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_user_id", mailId);
                    cmd.Parameters.AddWithValue("p_pwd", pwd);
                    cmd.Parameters.AddWithValue("p_today", p_today);

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            int i = Convert.ToInt32(reader["V_Result"]);
                            string vUserType = reader["V_UserType"].ToString();
                            string vEmpId = reader["V_Emp_Id"].ToString();
                            string vLastLoginDate = reader["V_Last_login_date"].ToString();


                            num = i;
                            if (num == 0)
                            {
                                response.status = true;
                                logResponse.ValidUser = false;
                            }

                            if (num == 1)
                            {
                                response.status = true;
                                logResponse.ValidUser = true;
                            }
                            else if (num==2)
                            {
                                response.status = true;
                                logResponse.ValidUser = true;
                                logResponse.ValidPwd = true;
                                logResponse.UserType = vUserType;
                                logResponse.empId = vEmpId;
                                logResponse.lastLoginDate = vLastLoginDate;
                            }

                            response.data = logResponse;

                        }
                        
                    }
                }
            }
            catch (MySqlException e)
            {
                //log_obj.error.ErrorStatus = true;
                //log_obj.error.ErrorMsg = e.Message;
                //log_obj.error.ErrorId = e.ErrorCode;

                response.status = false;
                response.exception = e;

            }
            return response;
           
        }

        public bool ValidateUserId(String mailId)
        {
            bool isUserExists = false;
            using (MySqlConnection connection = GetConnection())
            {
                connection.Open();
                MySqlCommand cmd = new MySqlCommand("sp_ValidateUserId", connection);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("p_id", mailId);


                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        int i = Convert.ToInt32(reader["user_record_count"]);
                        isUserExists = i == 1 ? true : false;

                    }
                }
            }
            return isUserExists;
        }
        

        public UserRole getUserType(string mailId)
        {
            UserRole u_type = new UserRole();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string query = "SELECT User_Type FROM pact_rmg.pact_rmg_emp_login_mst where Mail_Id ='" + mailId + "'";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                


                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    
                        u_type.User_Type = reader["User_Type"].ToString();
                   
                }
            }
            return u_type;
        }

    }
}
