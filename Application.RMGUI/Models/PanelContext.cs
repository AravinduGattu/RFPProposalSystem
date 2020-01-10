using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMG.Models
{
    public class PanelContext
    {

        public string ConnectionString { get; set; }

        public PanelContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }

        public List<Panel> GetAllPanel()
        {
            List<Panel> list = new List<Panel>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_fetchpanel", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new Panel()
                        {
                            panel_code = reader["panel_code"].ToString(),
                            panel_name = reader["Emp_Name"].ToString(),
                            email_id = reader["email_id"].ToString(),
                            phone = reader["phone"].ToString(),
                            panel_role = reader["panel_role"].ToString(),
                            panel_status = reader["panel_status"].ToString(),
                            panel_startdate = reader["panel_startdate"].ToString(),
                            panel_enddate = reader["panel_enddate"].ToString(),
                        });
                    }
                }
            }
            return list;

        }
        public List<Panel> panelSearchQuery(string pquery)
        {
            List<Panel> list = new List<Panel>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string query = pquery;
                MySqlCommand cmd = new MySqlCommand(query, conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new Panel()
                        {
                            panel_code = reader["panel_code"].ToString(),
                            panel_name = reader["Emp_Name"].ToString(),
                            email_id = reader["email_id"].ToString(),
                            phone = reader["phone"].ToString(),
                            panel_role = reader["panel_role"].ToString(),
                            panel_status = reader["panel_status"].ToString(),
                            panel_startdate = reader["panel_startdate"].ToString(),
                            panel_enddate = reader["panel_enddate"].ToString(),
                        });
                    }
                }
            }
            return list;
        }


        public void AddPanel(Panel panel)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_addpanel", conn);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;


                //cmd.Parameters.AddWithValue("panel_code", panel.panel_code);
                cmd.Parameters.AddWithValue("panel_name", panel.panel_name);
                cmd.Parameters.AddWithValue("email_id", panel.email_id);
                cmd.Parameters.AddWithValue("phone", panel.phone);
                cmd.Parameters.AddWithValue("panel_role", panel.panel_role);
               // cmd.Parameters.AddWithValue("panel_status", panel.panel_status);
                cmd.Parameters.AddWithValue("panel_startdate", Convert.ToDateTime(panel.panel_startdate).Date);
                cmd.Parameters.AddWithValue("panel_enddate", Convert.ToDateTime(panel.panel_enddate).Date);


                cmd.ExecuteNonQuery();
                conn.Close();
            }

        }
        public void DeletePanel(string panel_code)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_deletepanel", conn);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("ppanel_code", panel_code);


                cmd.ExecuteNonQuery();
                conn.Close();
            }

        }
        public void UpdatePanel(Panel panel)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_updatepanel", conn);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                //cmd.Parameters.AddWithValue("panel_id", panel.panel_id);
                cmd.Parameters.AddWithValue("ppanel_code", panel.panel_code);
                cmd.Parameters.AddWithValue("panel_name", panel.panel_name);
                cmd.Parameters.AddWithValue("email_id", panel.email_id);
                cmd.Parameters.AddWithValue("phone", panel.phone);
                cmd.Parameters.AddWithValue("panel_role", panel.panel_role);
                cmd.Parameters.AddWithValue("panel_status", panel.panel_status);
                cmd.Parameters.AddWithValue("panel_startdate", panel.panel_startdate);
                cmd.Parameters.AddWithValue("panel_enddate", panel.panel_enddate);


                cmd.ExecuteNonQuery();
                conn.Close();
            }

        }

        public List<EmployeeNameDropdown> EmployeeNameDropdown()
        {
            List<EmployeeNameDropdown> list = new List<EmployeeNameDropdown>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_EmployeeNameDropdown", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new EmployeeNameDropdown()
                        {
                            Emp_Name = reader["Emp_Name"].ToString(),

                        });
                    }
                }
            }
            return list;
        }
        public List<Designation> GetAllDesignation()
        {
            List<Designation> list = new List<Designation>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_EmployeeDesignation", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new Designation()
                        {
                            Designation_Description = reader["Design_Description"].ToString(),

                        });
                    }
                }
            }
            return list;
        }
    }
}
