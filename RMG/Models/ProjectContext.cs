using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMG.Models
{
    public class ProjectContext
    {
        public string ConnectionStrings { get; set; }

        public ProjectContext(string connectionString)
        {
            this.ConnectionStrings = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionStrings);
        }
        public object GetAllProjects()
        {
            List<ProjectAttribute> list = new List<ProjectAttribute>();
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection conn = GetConnection())
                {

                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_getallprojects ", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;


                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            list.Add(new ProjectAttribute()
                            {
                                Project_Name = reader["Project_Name"].ToString(),
                                Project_Code = reader["Project_Code"].ToString(),
                                Project_Description = reader["Project_Description"].ToString(),
                                Project_StartDate = reader["Project_StartDate"].ToString(),
                                Project_EndDate =reader["Project_EndDate"].ToString(),
                                Project_Status = reader["Project_Status"].ToString(),
                                Project_LocationId = reader["City"].ToString(),
                                Project_Location = reader["City"].ToString(),
                                Project_Billable = reader["Project_Billable"].ToString(),
                                Customer_Details = reader["customer_details"].ToString(),

                            });

                        }
                        response.status = true;
                        response.data = list;
                    }
                }
            }
            catch(Exception e)
            {
                response.status = false;
                response.exception = e;
            }
   
            return response;
        }

        //string Project_Name, string Project_Description, string Project_StartDate, string Project_EndDate, string Project_Status, string City, string Project_Billable
        //SELECT * FROM pact_rmg.view_getallprojects where Project_Name like '%"+Project_Name+ "%' and Project_Description like '%"+Project_Description+"%' and Project_StartDate like '%"+ Convert.ToDateTime(Project_StartDate).Date + "%' and  Project_EndDate like '%"+ Convert.ToDateTime(Project_EndDate).Date + "%' and Project_Status like '%%' and City like '%"+City+"%' and Project_Billable like '%%' 
        public object searchQuery(string p_query)
        {

            List<ProjectAttribute> list = new List<ProjectAttribute>();
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection con = new MySqlConnection(ConnectionStrings))
                {
                    con.Open();

                    string query = p_query;
                    MySqlCommand cmd = new MySqlCommand(query, con);
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            list.Add(new ProjectAttribute()
                            {
                                Project_Name = reader["Project_Name"].ToString(),
                                Project_Code = reader["Project_Code"].ToString(),
                                Project_Description = reader["Project_Description"].ToString(),
                                Project_StartDate = reader["Project_StartDate"].ToString(),
                                Project_EndDate = reader["Project_EndDate"].ToString(),
                                Project_Status = reader["Project_Status"].ToString(),
                                Project_LocationId = reader["City"].ToString(),
                                Project_Location = reader["City"].ToString(),
                                Project_Billable = reader["Project_Billable"].ToString(),
                                Customer_Details = reader["Customer_Details"].ToString(),

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
        





        //to add projects
        public object AddProjects(ProjectAttribute project)
        {
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection con = new MySqlConnection(ConnectionStrings))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_AddProjects", con);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("p_Project_Name", project.Project_Name);
                    cmd.Parameters.AddWithValue("p_Project_Code", project.Project_Code);
                    cmd.Parameters.AddWithValue("p_Project_Description", project.Project_Description);
                    if (project.Project_StartDate=="")
                    {
                        cmd.Parameters.AddWithValue("p_Project_StartDate", null);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("p_Project_StartDate", Convert.ToDateTime(project.Project_StartDate).Date);
                    
                    }
                    if (project.Project_EndDate =="")
                    {
                        cmd.Parameters.AddWithValue("p_Project_EndDate", null);
                    }
                    else
                    {
                       
                        cmd.Parameters.AddWithValue("p_Project_EndDate", Convert.ToDateTime(project.Project_EndDate).Date);
                    }

                    
                    //cmd.Parameters.AddWithValue("pProject_Status", project.Project_Status);
                    cmd.Parameters.AddWithValue("p_Project_Location", project.Project_Location);
                    cmd.Parameters.AddWithValue("p_Project_Billable", project.Project_Billable);
                    cmd.Parameters.AddWithValue("p_Customer_Details", project.Customer_Details);
                    cmd.Parameters.AddWithValue("p_Created_By", project.Created_By);
                    cmd.Parameters.AddWithValue("p_Created_On", Convert.ToDateTime(project.Created_On).Date);
                    cmd.ExecuteNonQuery();
                    con.Close();
                    response.status = true;
                }
            }
            catch(Exception e)
            {
                response.status = false;
                response.exception = e;
              
            }
                
            return response;
        }
        public object UpdateProject(ProjectAttribute project)
        {
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection con = new MySqlConnection(ConnectionStrings))
                {
                    con.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_UpdateProject", con);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("p_Project_Name", project.Project_Name);
                    cmd.Parameters.AddWithValue("p_Project_Code", project.Project_Code);//procedure parameters
                    cmd.Parameters.AddWithValue("p_Project_Description", project.Project_Description);
                    if (project.Project_StartDate == "")
                    {
                        cmd.Parameters.AddWithValue("p_Project_StartDate", null);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("p_Project_StartDate", Convert.ToDateTime(project.Project_StartDate).Date);
                    }
                    if (project.Project_EndDate == "")
                    {
                        cmd.Parameters.AddWithValue("p_Project_EndDate", null);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("p_Project_EndDate", Convert.ToDateTime(project.Project_EndDate).Date);
                    }
                    cmd.Parameters.AddWithValue("p_Project_Status", project.Project_Status);
                    cmd.Parameters.AddWithValue("p_Project_Location", project.Project_Location);
                    cmd.Parameters.AddWithValue("p_Project_Billable", project.Project_Billable);
                    cmd.Parameters.AddWithValue("p_Customer_Details", project.Customer_Details);
                    cmd.Parameters.AddWithValue("p_Last_Updated_By", project.Last_Updated_By);
                    cmd.Parameters.AddWithValue("p_Updated_On", Convert.ToDateTime(project.Updated_On).Date);
                    cmd.ExecuteNonQuery();
                    con.Close();
                    response.status = true;
                }
            }
            catch (Exception e) {
                response.status = false;
                response.exception = e;
            }
            return response;
        }
        public int DisableProject(string Project_Name)
        {

            using (MySqlConnection con = new MySqlConnection(ConnectionStrings))
            {
                con.Open();
                MySqlCommand cmd = new MySqlCommand("sp_DeleteProject", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("pname", Project_Name);

                cmd.ExecuteNonQuery();
                con.Close();
            }
            return 1;
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
                            city = reader["City"].ToString(),
                            country = reader["Country"].ToString(),
                            region = reader["Region"].ToString(),

                        });
                    }
                }
            }
            return list;
        }
        public List<CustomerDetails> GetAllCustomerDetails()
        {
            List<CustomerDetails> list = new List<CustomerDetails>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_CustomerProjects", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new CustomerDetails()
                        {
                           customer_code = reader["cust_code"].ToString(),
                            customer_name = reader["cust_name"].ToString(),

                        });
                    }
                }
            }
            return list;
        }

        public List<ProjectAttribute> GetAllProjectCodeAndName()
        {
            List<ProjectAttribute> list = new List<ProjectAttribute>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_GetProjectCodeAndName", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new ProjectAttribute()
                        {
                            Project_Code = reader["project_code"].ToString(),
                            Project_Name = reader["project_name"].ToString(),
                        });
                    }
                }
            }
            return list;
        }

    }
}
    
    

