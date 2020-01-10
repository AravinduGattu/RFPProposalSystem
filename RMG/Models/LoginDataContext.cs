using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMG.Models
{
    public class LoginDataContext
    {
        public string ConnectionString { get; set; }

        public LoginDataContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }
        public LoginData getLoginData(string Emp_Id)
        {
            LoginData ld = new LoginData();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string query = "select Emp_Id,Last_Login_Date from pact_rmg_login_info  where Mail_Id like '%" + Emp_Id + "%'";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();

                    ld.Emp_Id = reader["Emp_Id"].ToString();
                    ld.Last_Login_Date = reader["Last_Login_Date"].ToString();



                }
            }
            return ld;
        }



    }

}
