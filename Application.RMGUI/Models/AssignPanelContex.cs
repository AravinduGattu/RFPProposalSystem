using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMG.Models
{
    public class AssignPanelContext
    {

        public string ConnectionString { get; set; }

        public AssignPanelContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }

        public List<AssignPanel> GetAllAssignPanel()
        {
            List<AssignPanel> list = new List<AssignPanel>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_fetch_AssignPanel", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new AssignPanel()
                        {
                            assigning_panel_code = reader["assigning_panel_code"].ToString(),
                            assign_panel_name = reader["assign_panel_name"].ToString(),
                            applicant_name = reader["applicant_name"].ToString(),
                            type_of_assessment = reader["type_of_assessment"].ToString(),
                            time_slot = reader["time_slot"].ToString(),
                            assign_panel_status = reader["assign_panel_status"].ToString(),
                            assignpanel_start_date = reader["assignpanel_start_date"].ToString(),
                            assignpanel_end_date = reader["assignpanel_end_date"].ToString(),
                        });
                    }
                }
            }
            return list;

        }

       

        public List<AssignPanel> assignpanelSearchQuery(string pquery)
        {
            List<AssignPanel> list = new List<AssignPanel>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string query = pquery;
                MySqlCommand cmd = new MySqlCommand(query, conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new AssignPanel()
                        {
                            assigning_panel_code = reader["assigning_panel_code"].ToString(),
                            assign_panel_name = reader["assign_panel_name"].ToString(),
                            applicant_name = reader["applicant_name"].ToString(),
                            type_of_assessment = reader["type_of_assessment"].ToString(),
                            time_slot = reader["time_slot"].ToString(),
                            assign_panel_status = reader["assign_panel_status"].ToString(),
                            assignpanel_start_date = reader["assignPanel_start_date"].ToString(),
                            assignpanel_end_date = reader["assignpanel_end_date"].ToString(),
                        });
                    }
                }
            }
            return list;
        }


        public void AddAssignPanel(AssignPanel assignpanel)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_add_assignpanel", conn);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;


                //cmd.Parameters.AddWithValue("assigning_panel_code", assignpanel.assigning_panel_code);
                cmd.Parameters.AddWithValue("assign_panel_name", assignpanel.assign_panel_name);
                cmd.Parameters.AddWithValue("applicant_name", assignpanel.applicant_name);
                cmd.Parameters.AddWithValue("type_of_assessment", assignpanel.type_of_assessment);
                cmd.Parameters.AddWithValue("time_slot", assignpanel.time_slot);
                //cmd.Parameters.AddWithValue("assign_panel_status", assignpanel.assign_panel_status);
                cmd.Parameters.AddWithValue("assignPanel_start_date", Convert.ToDateTime(assignpanel.assignpanel_start_date).Date);
                cmd.Parameters.AddWithValue("assignpanel_end_date", Convert.ToDateTime(assignpanel.assignpanel_end_date).Date);


                cmd.ExecuteNonQuery();
                conn.Close();
            }

        }
        //public void DeletePanel(string panel_code)
        //{
        //    using (MySqlConnection conn = GetConnection())
        //    {
        //        conn.Open();
        //        MySqlCommand cmd = new MySqlCommand("sp_deletepanel", conn);

        //        cmd.CommandType = System.Data.CommandType.StoredProcedure;

        //        cmd.Parameters.AddWithValue("ppanel_code", panel_code);


        //        cmd.ExecuteNonQuery();
        //        conn.Close();
        //    }

        //}
        public void UpdateAssignPanel(AssignPanel assignpanel)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_Update_assignpanel", conn);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("passigning_panel_code", assignpanel.assigning_panel_code);
                cmd.Parameters.AddWithValue("assign_panel_name", assignpanel.assign_panel_name);
                cmd.Parameters.AddWithValue("applicant_name", assignpanel.applicant_name);
                cmd.Parameters.AddWithValue("type_of_assessment", assignpanel.type_of_assessment);
                cmd.Parameters.AddWithValue("time_slot", assignpanel.time_slot);
                cmd.Parameters.AddWithValue("assign_panel_status", assignpanel.assign_panel_status);
                cmd.Parameters.AddWithValue("assignpanel_start_date", assignpanel.assignpanel_start_date);
                cmd.Parameters.AddWithValue("assignpanel_end_date", assignpanel.assignpanel_end_date);


                cmd.ExecuteNonQuery();
                conn.Close();
            }

        }
               

        public List<PanelDropDown> PanelDropdown()
        {
            List<PanelDropDown> list = new List<PanelDropDown>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_PanelDropdown", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new PanelDropDown()
                        {
                            panel_name = reader["Emp_Name"].ToString(),

                        });
                    }
                }
                
            }
            return list;
        }
    }
}
