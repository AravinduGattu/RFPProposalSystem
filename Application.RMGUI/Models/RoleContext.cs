using System;
using System.Collections.Generic;
using MySql.Data.MySqlClient;
namespace RMG.Models
{
    public class RoleContext
    {
        public string ConnectionString { get; set; }

        public RoleContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }
        public object GetAllRoles()
        {
            List<RoleAttribute> list = new List<RoleAttribute>();
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_GetAllRoles", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;



                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            list.Add(new RoleAttribute()
                            {
                                Employee_Id = reader["Employee_Id"].ToString(),
                                Employee_Name = reader["Emp_Name"].ToString(),
                                Role_Projects = reader["Role_Projects"].ToString(),
                                Project_Name = reader["Project_Name"].ToString(),
                                Role_Designation = reader["Role_Designation"].ToString(),
                                Role_Description = reader["Role_Description"].ToString(),
                                Role_Status = reader["Role_Status"].ToString(),
                                Role_StartDate = reader["Role_StartDate"].ToString(),
                                Role_EndDate = reader["Role_EndDate"].ToString(),
                            });
                        }
                    }
                    response.status = true;
                    response.data = list;

                }
            }
            catch (Exception e)
            {
                response.status = true;
                response.exception = e;
            }
            return response;



        }



        public object rolesSearchQuery(string pquery)
        {
            List<RoleAttribute> list = new List<RoleAttribute>();
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
                            list.Add(new RoleAttribute()
                            {
                                Employee_Id = reader["Employee_Id"].ToString(),
                                Employee_Name = reader["Emp_Name"].ToString(),
                                Role_Projects = reader["Role_Projects"].ToString(),
                                Project_Name = reader["Project_Name"].ToString(),
                                Role_Designation = reader["Role_Designation"].ToString(),
                                Role_Description = reader["Role_Description"].ToString(),
                                Role_Status = reader["Role_Status"].ToString(),
                                Role_StartDate = reader["Role_StartDate"].ToString(),
                                Role_EndDate = reader["Role_EndDate"].ToString(),
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

        public object AddRole(RoleAttribute Role)
        {
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
              using (MySqlConnection conn = GetConnection())
              {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_AddRole", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                //  RoleAttributes rol = new RoleAttributes();

                cmd.Parameters.AddWithValue("Employee_Id", Role.Employee_Id);
                cmd.Parameters.AddWithValue("Employee_Name", Role.Employee_Name);
                cmd.Parameters.AddWithValue("Role_Projects", Role.Role_Projects);
                cmd.Parameters.AddWithValue("Project_Name", Role.Project_Name);
                cmd.Parameters.AddWithValue("Role_CreatedBy", Role.Role_CreatedBy);
                cmd.Parameters.AddWithValue("Role_Designation", Role.Role_Designation);
                cmd.Parameters.AddWithValue("Role_Description", Role.Role_Description);                 
                cmd.Parameters.AddWithValue("Role_StartDate", Convert.ToDateTime(Role.Role_StartDate).Date);
                cmd.Parameters.AddWithValue("Role_EndDate", Convert.ToDateTime(Role.Role_EndDate).Date);
                cmd.Parameters.AddWithValue("Role_CreatedDate", Convert.ToDateTime(Role.Role_CreatedDate).Date);
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


        public object UpdateRole(RoleAttribute role)
        {
          APIResponse response = new APIResponse();
          response.status = false;
          try
          {
                using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_UpdateRole", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("emp_Id", role.Employee_Id);
                cmd.Parameters.AddWithValue("Employee_Name", role.Employee_Name);
                cmd.Parameters.AddWithValue("Role_Projects", role.Role_Projects);
                cmd.Parameters.AddWithValue("Project_Name", role.Project_Name);
                cmd.Parameters.AddWithValue("Role_Designation", role.Role_Designation);
                cmd.Parameters.AddWithValue("Role_Description", role.Role_Description);
                cmd.Parameters.AddWithValue("Role_Status", role.Role_Status);
                cmd.Parameters.AddWithValue("Role_StartDate", Convert.ToDateTime(role.Role_StartDate).Date);
                cmd.Parameters.AddWithValue("Role_EndDate", Convert.ToDateTime(role.Role_EndDate).Date);
                cmd.Parameters.AddWithValue("LastUpdatedBy", role.LastUpdatedBy);
                cmd.Parameters.AddWithValue("Role_LastUpdatedDate", Convert.ToDateTime(role.Role_LastUpdatedDate).Date);
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

        public int DisableRole(string Employee_Id)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_DeleteRole", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("eid", Employee_Id);

                cmd.ExecuteNonQuery();
                conn.Close();
            }
            return 1;
        }
        public List<EmpDropAttribute> GetEmployeeDropdown()
        {
            List<EmpDropAttribute> elist = new List<EmpDropAttribute>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_EmployeeDropdown", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        elist.Add(new EmpDropAttribute()
                        {
                            Emp_Id = reader["Emp_Id"].ToString(),
                            Emp_Name = reader["Emp_Name"].ToString(),
                        });
                    }
                }

            }
            return elist;
        }
        public List<EmployeeDesignationAttribute> GetEmployeeDesignation()
        {
            List<EmployeeDesignationAttribute> elist = new List<EmployeeDesignationAttribute>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_EmployeeDesignation", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        elist.Add(new EmployeeDesignationAttribute()
                        {
                            Designation = reader["Design_Description"].ToString()
                        });
                    }
                }

            }
            return elist;

        }

        public List<ProjectdropdownAttribute> GetProjectdropdown()
        {
            List<ProjectdropdownAttribute> plist = new List<ProjectdropdownAttribute>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_ProjectDropdown", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        plist.Add(new ProjectdropdownAttribute()
                        {
                            Project_Name = reader["Project_Name"].ToString()
                        });
                    }
                }

            }
            return plist;

        }

        public List<ProjectRoleAttribute> GetProjectroledropdown()
        {
            List<ProjectRoleAttribute> prlist = new List<ProjectRoleAttribute>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_ProjectRolesDropdown", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        prlist.Add(new ProjectRoleAttribute()
                        {
                            Project_roles = reader["Project_roles"].ToString()
                        });
                    }
                }

            }
            return prlist;
                          
        }



    }

}











