using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
namespace RMG.Models
{
    public class AssignProjectContext
    //public class CustomerContext
    {
        public string ConnectionString { get; set; }

        public AssignProjectContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }

        public List<AssignProject> GetAllAssignProject()      //doubt
        {
            List<AssignProject> list = new List<AssignProject>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_fetchAssignprojects", conn);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;
            

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new AssignProject()
                        {
                            Emp_Id = reader["Emp_Id"].ToString(),
                            Emp_Name = reader["Emp_Name"].ToString(),
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
            }
            return list;
        }
    

            public List<AssignProject> assignProjectSearchQuery(string pquery)      //doubt
        {
            List<AssignProject> list = new List<AssignProject>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string query = pquery;
                MySqlCommand cmd = new MySqlCommand(query, conn);


                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new AssignProject()
                        {
                            Emp_Id = reader["Emp_Id"].ToString(),
                            Emp_Name = reader["Emp_Name"].ToString(),
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
            }
            return list;
        }

        public void AddAssignProject(AssignProject assignProject)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_AddAssignProject_RRF", conn);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;

               
                cmd.Parameters.AddWithValue("Emp_Id", assignProject.Emp_Id);
               
                cmd.Parameters.AddWithValue("Project_Name", assignProject.Project_Name);
                cmd.Parameters.AddWithValue("Assign_Project_StartDate", Convert.ToDateTime(assignProject.Assign_Project_StartDate).Date);
                cmd.Parameters.AddWithValue("Assign_Project_EndDate", Convert.ToDateTime(assignProject.Assign_Project_EndDate).Date);
                cmd.Parameters.AddWithValue("Billable", assignProject.Billable);
                cmd.Parameters.AddWithValue("Billing_Percentage", assignProject.Billing_Percentage);
                cmd.Parameters.AddWithValue("Location", assignProject.Location);
                cmd.Parameters.AddWithValue("Onsite", assignProject.Onsite);
                cmd.Parameters.AddWithValue("res_req_created_by", assignProject.Res_req_created_by);
                cmd.Parameters.AddWithValue("p_res_req_cid", assignProject.Res_req_cid);

                cmd.ExecuteNonQuery();
                conn.Close();
            }

        }

        public AssignProject GetAssignProjectData(string Emp_Id)     //Searching by EMP ID

        {
            AssignProject assignProject = new AssignProject();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("select Emp_Id,Project_Name,Assign_Project_StartDate,Assign_Project_EndDate,Billable,Billing_Percentage,Location,Onsite from pact_rmg_customer WHERE Emp_Id=" + Emp_Id, conn);
                conn.Open();
                using (var rdr = cmd.ExecuteReader())
                {

                    while (rdr.Read())

                    {                   
                        assignProject.Emp_Id = rdr["Emp_Id"].ToString();
                        assignProject.Project_Name = rdr["Project_Name"].ToString();
                        assignProject.Assign_Project_StartDate = rdr["Assign_Project_StartDate"].ToString();
                        assignProject.Assign_Project_EndDate = rdr["Assign_Project_EndDate"].ToString();
                        assignProject.Billable = rdr["Billable"].ToString();
                        assignProject.Billing_Percentage = rdr["Billing_Percentage"].ToString();
                        assignProject.Location = rdr["Location"].ToString();
                        assignProject.Onsite = rdr["Onsite"].ToString();
                    }
                }
                return assignProject;
            }
        }
        public void DeleteAssignProject(string Emp_Id)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_DeleteAssignProject", conn);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("eEmp_Id", Emp_Id);


                cmd.ExecuteNonQuery();
                conn.Close();
            }

        }
        public void UpdateAssignProject(AssignProject assignProject)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_UpdateAssignProject", conn);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;


                cmd.Parameters.AddWithValue("eEmp_Id", assignProject.Emp_Id);
               
                cmd.Parameters.AddWithValue("Project_Name", assignProject.Project_Name);
                cmd.Parameters.AddWithValue("Assign_Project_StartDate", assignProject.Assign_Project_StartDate);
                cmd.Parameters.AddWithValue("Assign_Project_EndDate", assignProject.Assign_Project_EndDate);
                cmd.Parameters.AddWithValue("Billable", assignProject.Billable);
                cmd.Parameters.AddWithValue("Billing_Percentage", assignProject.Billing_Percentage);
                cmd.Parameters.AddWithValue("Location", assignProject.Location);
                cmd.Parameters.AddWithValue("Onsite", assignProject.Onsite);
                cmd.ExecuteNonQuery();
                conn.Close();

            }

        }

        // For Employee DropDown

        public List<EmpassignDropAttribute> GetEmployeeDropdown()
        {
            List<EmpassignDropAttribute> elist = new List<EmpassignDropAttribute>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open(); 
                 MySqlCommand cmd = new MySqlCommand("sp_assignEmpDropdown", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        elist.Add(new EmpassignDropAttribute()
                        {
                            Emp_Id = reader["Emp_Id"].ToString(),
                            Emp_Name = reader["Emp_Name"].ToString(),
                            Coe_Description = reader["Coe_Description"].ToString(),

                        });
                    }
                }

            }
            return elist;
        }


        //For Projectname dropdown

        public List<ProjectdropdownAttribute> GetProjectDropdown()
        {
            List<ProjectdropdownAttribute> elist = new List<ProjectdropdownAttribute>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_ProjectDropdown", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        elist.Add(new ProjectdropdownAttribute()
                        {
                            Project_Name = reader["Project_Name"].ToString(),


                        });
                    }
                }

            }
            return elist;
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
                            region = reader["Region"].ToString(),

                        });
                    }
                }
            }
            return list;
        }



        public object getAssignedProjDetails(string childID)
        {
            AcceptAssignProjReq obj_AAPR = new AcceptAssignProjReq();
            APIResponse response = new APIResponse();
            response.status = false;
            try {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    string query = "SELECT res_req_cid,Emp_Id,Email_ID,Emp_Name,Project_Name,Billing_Percentage FROM view_getpendingassignreq where res_req_cid='" + childID + "'";
                    MySqlCommand cmd = new MySqlCommand(query, conn);
                    using (var reader = cmd.ExecuteReader())
                    {
                        reader.Read();
                        obj_AAPR.res_req_cid = reader["res_req_cid"].ToString();
                        obj_AAPR.Emp_Id = reader["Emp_Id"].ToString();
                        obj_AAPR.Emp_Name = reader["Emp_Name"].ToString();
                        obj_AAPR.Email_ID = reader["Email_ID"].ToString();
                        obj_AAPR.Project_Name = reader["Project_Name"].ToString();
                        obj_AAPR.Billing_Percentage = reader["Billing_Percentage"].ToString();
                    }
                    response.status = true;
                    response.data = obj_AAPR;
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
