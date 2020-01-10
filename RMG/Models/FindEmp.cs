using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace RMG.Models
{
    public class FindEmp
    {
        public string ConnectionString {get; set; }

        public FindEmp(string connectionstring)
        {
            this.ConnectionString=connectionstring;
        }
        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }

                public List<FindEmpAtt> GetAllEmplist()
        {
            List<FindEmpAtt> list = new List<FindEmpAtt>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_findallemployees", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new FindEmpAtt()
                        {
                            EmpId = reader["Emp_Id"].ToString(),
                            EmpName = reader["Emp_Name"].ToString(),
                            EmpEmail = reader["Email_ID"].ToString(),
                        });
                    }
                }
            }
            return list;
        }
    }
}
