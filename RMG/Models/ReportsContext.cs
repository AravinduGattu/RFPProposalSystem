using System;
using System.Collections.Generic;
using MySql.Data.MySqlClient;
namespace RMG.Models
{
    public class ReportsContext
    {
        public string ConnectionString { get; set; }

        public ReportsContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }
        public APIResponse getAllEPMDetails(string p_query)
        {
            List<ReportsEPMAttribute> list = new List<ReportsEPMAttribute>();
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    string query = p_query;

                    MySqlCommand cmd = new MySqlCommand(query, conn);



                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            list.Add(new ReportsEPMAttribute()
                            {
                                Project_Assign_ID = reader["Project_Assign_ID"].ToString(),
                                Emp_Id = reader["Emp_Id"].ToString(),
                                Emp_Name = reader["Emp_Name"].ToString(),
                                Project_Name = reader["Project_Name"].ToString(),
                                 Project_Manager_Employee_Id=reader["Mngr_Emp_Id"].ToString(),
                                 Project_Manager_Emp_Name=reader["Mngr_Emp_Name"].ToString(),
                                Coe = reader["Coe"].ToString(),
                                EdgePractice = reader["Edge_Practice_Description"].ToString(),
                                Project_Code = reader["Project_Code"].ToString(),
                                Assign_Project_StartDate = reader["Assign_Project_StartDate"].ToString(),
                                Assign_Project_EndDate = reader["Assign_Project_EndDate"].ToString(),
                                Billable = reader["Billable"].ToString(),
                                Billing_Percentage = reader["Billing_Percentage"].ToString(),
                                Location = reader["City"].ToString(),
                                Onsite = reader["Onsite"].ToString(),
                            });
                        }
                    }
                    response.status = true;
                    response.data = list;

                }

            }

            catch(Exception e)
            {
                response.status = false;
                response.exception = e;
            }
            return response;


        }

        public object GetAllEPM()
        {
            List<ReportsEPMAttribute> list = new List<ReportsEPMAttribute>();
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_fetchAssignprojects", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            list.Add(new ReportsEPMAttribute()
                            {
                                Project_Assign_ID = reader["Project_Assign_ID"].ToString(),
                                Emp_Id = reader["Emp_Id"].ToString(),
                                Emp_Name = reader["Emp_Name"].ToString(),
                                Project_Code = reader["Project_Code"].ToString(),
                                Project_Name = reader["Project_Name"].ToString(),
                                Assign_Project_StartDate = reader["Assign_Project_StartDate"].ToString(),
                                Assign_Project_EndDate = reader["Assign_Project_EndDate"].ToString(),
                                Billable = reader["Billable"].ToString(),
                                Billing_Percentage = reader["Billing_Percentage"].ToString(),
                                Location = reader["Location"].ToString(),
                                Onsite = reader["Onsite"].ToString(),
                            });
                        }
                    }
                    response.status = true;
                    response.data = list;
                }
            }
            catch(Exception e)
            {
                response.status = false;
                response.exception = e;
            }
            return response;
        }

        public void ImportTimesheets(Timesheet time)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_Import_PSA_Timesheets", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("employee_No", time.employee_No);
                cmd.Parameters.AddWithValue("t_resource", time.resource);
                cmd.Parameters.AddWithValue("project_pactera_legal_entity", time.project_pactera_legal_entity);
                cmd.Parameters.AddWithValue("timecard_id", time.timecard_id);
                cmd.Parameters.AddWithValue("project_id", time.project_id);
                cmd.Parameters.AddWithValue("approver", time.approver);
                cmd.Parameters.AddWithValue("project_name", time.project_name);
                cmd.Parameters.AddWithValue("project_department", time.project_department);
                cmd.Parameters.AddWithValue("t_status", time.status);
                cmd.Parameters.AddWithValue("start_Date", Convert.ToDateTime(time.start_Date).Date);
                cmd.Parameters.AddWithValue("end_Date", Convert.ToDateTime(time.end_Date).Date);
                cmd.Parameters.AddWithValue("sunday_hours", time.sunday_hours);
                cmd.Parameters.AddWithValue("monday_hours", time.monday_hours);
                cmd.Parameters.AddWithValue("tuesday_hours", time.tuesday_hours);
                cmd.Parameters.AddWithValue("wednesday_hours", time.wednesday_hours);
                cmd.Parameters.AddWithValue("thursday_hours", time.thursday_hours);
                cmd.Parameters.AddWithValue("friday_hours", time.friday_hours);
                cmd.Parameters.AddWithValue("saturday_hours", time.saturday_hours);
                cmd.Parameters.AddWithValue("total_hours", time.total_hours);
                cmd.ExecuteNonQuery();
                conn.Close();
            }

        }
       
        public object loadLocation()
        {
            List<BaseLocation> list = new List<BaseLocation>();
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
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
                                region = reader["region"].ToString(),

                            });
                        }
                    }
                    response.status = true;
                    response.data = list;
                }
            }
            catch (Exception e)
            {
                response.status = false;
                response.exception = e;
            }
            return response;
        }

        


        public void updateEmpProjInfo(ReportsEPMAttribute pobj)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string query = "update pact_rmg_emp_proj set Assign_Project_StartDate='" + pobj.Assign_Project_StartDate + "',Assign_Project_EndDate='" + pobj.Assign_Project_EndDate + "',Project_Name='" + pobj.Project_Name+ "',Billable='" + pobj.Billable + "',Billing_Percentage='" + pobj.Billing_Percentage + "' ,Billing_Percentage='" + pobj.Billing_Percentage + "' ,Location='" + pobj.Location + "',Onsite='" + pobj.Onsite + "'    where Project_Assign_ID=" + pobj.Project_Assign_ID+"";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                }
            }
        }


        public object loadPMNames()
        {
            List < string > list= new List<string>();
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_DD_PM_List", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    using (var reader = cmd.ExecuteReader())
                    {

                        while (reader.Read())
                        {
                            list.Add(reader["Emp_Name"].ToString());
                        }
                    }
                    response.status = true;
                    response.data = list;
                }
            }
            catch (Exception e)
            {
                response.status = false;
                response.exception = e;
            }
            return response;
        }



    }

}











