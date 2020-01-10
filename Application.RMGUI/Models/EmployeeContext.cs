using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace RMG.Models
{
    public class EmployeeContext
    {
        public string ConnectionString { get; set; }

        public EmployeeContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }
        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }
       // public List<Employee> GetAllEmployee()
        public object GetAllEmployee()
        {
            List<Employee> list = new List<Employee>();
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_GetAllEmployees", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            list.Add(new Employee()
                            {
                                bg_id = reader["bg_desc"].ToString(),
                                Emp_Id = reader["Emp_Id"].ToString(),
                                Emp_Name = reader["Emp_Name"].ToString(),
                                Designation_Id = reader["Design_Description"].ToString(),
                                Department_Id = reader["Department_Description"].ToString(),
                                Edge_Practice_Id = reader["Edge_Practice_Description"].ToString(),
                                Coe_Id = reader["Coe_Description"].ToString(),
                                Location = reader["City"].ToString(),
                                Joining_Date = Convert.ToDateTime(reader["Joining_Date"]).Date.ToString("dd-MMM-yyyy"),
                                Contact_Number = reader["Contact_Number"].ToString(),
                                Address = reader["Address"].ToString(),
                                Email_Id = reader["Email_Id"].ToString(),
                                Reporting_To = reader["Reporting_To"].ToString(),
                                Reporting_To_Email = reader["Reporting_To_Email"].ToString(),
                                Flag_Status = reader["Flag_Status"].ToString(),
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

       // public List<Employee> empSearchQuery(string p_query)
        public object empSearchQuery(string p_query)
        {
            List<Employee> list = new List<Employee>();
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
                            list.Add(new Employee()
                            {
                                bg_id = reader["bg_desc"].ToString(),
                                Emp_Id = reader["Emp_Id"].ToString(),
                                Emp_Name = reader["Emp_Name"].ToString(),
                                Designation_Id = reader["Design_Description"].ToString(),
                                Department_Id = reader["Department_Description"].ToString(),
                                Edge_Practice_Id = reader["Edge_Practice_Description"].ToString(),
                                Coe_Id = reader["Coe_Description"].ToString(),
                                Job_Description = reader["job_description"].ToString(),
                              Cat_Description=reader["cat_description"].ToString(),
                              Sub_Cat_Description=reader["sub_cat_description"].ToString(),
                                Location = reader["City"].ToString(),
                                Joining_Date = Convert.ToDateTime(reader["Joining_Date"]).Date.ToString("dd-MMM-yyyy"),
                                Contact_Number = reader["Contact_Number"].ToString(),
                                Address = reader["Address"].ToString(),
                                Email_Id = reader["Email_Id"].ToString(),
                                Reporting_To = reader["Reporting_To"].ToString(),
                                Reporting_To_Email = reader["Reporting_To_Email"].ToString(),
                                Flag_Status = reader["Flag_Status"].ToString(),

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


        public object AddEmployee(Employee employee)
        {
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_AddEmployee", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_bg_id", employee.bg_id);
                    cmd.Parameters.AddWithValue("p_Emp_Id", employee.Emp_Id);
                    cmd.Parameters.AddWithValue("p_Emp_Name", employee.Emp_Name);
                    cmd.Parameters.AddWithValue("p_Designation_Id", employee.Designation_Id);
                    cmd.Parameters.AddWithValue("p_Department_Id", employee.Department_Id);
                    cmd.Parameters.AddWithValue("p_Edge_Practice_Id", employee.Edge_Practice_Id);
                    cmd.Parameters.AddWithValue("p_Coe_Id", employee.Coe_Id);
                    //cmd.Parameters.AddWithValue("p_Location_Id", employee.Location_Id);
                    cmd.Parameters.AddWithValue("p_Location", employee.Location);
                    cmd.Parameters.AddWithValue("p_Joining_Date", Convert.ToDateTime(employee.Joining_Date).Date);
                    cmd.Parameters.AddWithValue("p_Contact_Number", employee.Contact_Number);
                    cmd.Parameters.AddWithValue("p_Address", employee.Address);
                    cmd.Parameters.AddWithValue("p_Email_ID", employee.Email_Id);
                    cmd.Parameters.AddWithValue("p_Reporting_To", employee.Reporting_To);
                    cmd.Parameters.AddWithValue("p_Reporting_To_Email", employee.Reporting_To_Email);
                    cmd.Parameters.AddWithValue("p_created_By", employee.Created_By);
                    cmd.Parameters.AddWithValue("p_created_Date", Convert.ToDateTime(employee.Created_Date).Date);
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
        public object UpdateEmployee(Employee employee)
        {
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection conn = new MySqlConnection(ConnectionString))
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_UpdateEmployee", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_bg_id", employee.bg_id);
                    cmd.Parameters.AddWithValue("p_Emp_Id", employee.Emp_Id);
                    cmd.Parameters.AddWithValue("p_Emp_Name", employee.Emp_Name);
                    cmd.Parameters.AddWithValue("p_Designation_Id", employee.Designation_Id);
                    cmd.Parameters.AddWithValue("p_Edge_Practice_Id", employee.Edge_Practice_Id);
                    cmd.Parameters.AddWithValue("p_Department_Id", employee.Department_Id);
                    cmd.Parameters.AddWithValue("p_Coe_Id", employee.Coe_Id);
                    cmd.Parameters.AddWithValue("p_jobFamily", employee.Job_Description);
                    cmd.Parameters.AddWithValue("p_category", employee.Cat_Description);
                    cmd.Parameters.AddWithValue("p_subCategory", employee.Sub_Cat_Description);
                    cmd.Parameters.AddWithValue("p_Location_Id", employee.Location);
                    cmd.Parameters.AddWithValue("p_Location", employee.Location);
                    cmd.Parameters.AddWithValue("p_Joining_Date", Convert.ToDateTime(employee.Joining_Date).Date);
                    cmd.Parameters.AddWithValue("p_Contact_Number", employee.Contact_Number);
                    cmd.Parameters.AddWithValue("p_Address", employee.Address);
                    cmd.Parameters.AddWithValue("p_Email_ID", employee.Email_Id);
                    cmd.Parameters.AddWithValue("p_Reporting_To", employee.Reporting_To);
                    cmd.Parameters.AddWithValue("p_Reporting_To_Email", employee.Reporting_To_Email);
                    cmd.Parameters.AddWithValue("p_Flag_Status", employee.Flag_Status);
                    cmd.Parameters.AddWithValue("p_Last_Updated_By", employee.Last_Updated_By);
                    cmd.Parameters.AddWithValue("p_Last_Updated_Date", Convert.ToDateTime(employee.Last_Updated_Date).Date);
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
        public int DeleteEmployee(string Emp_Id)
        {
            using (MySqlConnection conn = new MySqlConnection(ConnectionString))
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_DeleteEmployee", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("eid", Emp_Id);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
            return 1;


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

        public List<Department> GetAllDepartment()
        {
            List< Department> list = new List<Department>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_EmployeeDepartment", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new Department()
                        {
                            Department_Description = reader["Department_Description"].ToString(),

                        });
                    }
                }
            }
            return list;
        }
        public List<EdgePractice> GetAllEdgePractice()
        {
            List<EdgePractice> list = new List<EdgePractice>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_EmployeeEdgePractice", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new EdgePractice()
                        {
                            Edge_Practice_Description= reader["Edge_Practice_Description"].ToString(),

                        });
                    }
                }
            }
            return list;
        }

        public List<CoeDescription> GetAllCoeDescription()
        {
            List<CoeDescription> list = new List<CoeDescription>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_Employee_Coe_Description", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new CoeDescription()
                        {
                          Coe_Description  = reader["Coe_Description"].ToString(),

                        });
                    }
                }
            }
            return list;
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
                            region =reader["region"].ToString(),

                        });
                    }
                }
            }
            return list;
        }

        public List<BusinessGroup> GetAllBusinessGroup()
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
        public List<Employee> GetAllReportingToAndEmail()
        {
            List<Employee> list = new List<Employee>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_ReportingToAndEmail", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new Employee()
                        {
                            Emp_Name = reader["Emp_Name"].ToString(),
                            Email_Id = reader["Email_ID"].ToString(),

                        });
                    }
                }
            }
            return list;
        }


        //public List<JobFamily> GetAllJobFamilyDropdown()
        //{
        //    List<JobFamily> list = new List<JobFamily>();
        //    using (MySqlConnection conn = GetConnection())
        //    {
        //        conn.Open();
        //        MySqlCommand cmd = new MySqlCommand("sp_GetAllJobFamilyDropdown", conn);
        //        cmd.CommandType = System.Data.CommandType.StoredProcedure;
        //        using (var reader = cmd.ExecuteReader())
        //        {
        //            while (reader.Read())
        //            {
        //                list.Add(new JobFamily()
        //                {
        //                    job_description = reader["job_description"].ToString(),
        //                    cat_description = reader["cat_description"].ToString(),
        //                    sub_cat_description = reader["sub_cat_description"].ToString(),
        //                });
        //            }
        //        }
        //    }
        //    return list;
        //}


        public object GetAllJobFamilyDropdown()
        {
            APIResponse response = new APIResponse();
            response.status = false;
            List<string> jobFamilyList = new List<string>();
            try
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_DD_get_jobfamily", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    using (var reader = cmd.ExecuteReader())
                    {

                        while (reader.Read())
                        {

                            jobFamilyList.Add(reader["job_description"].ToString());


                        }
                    }
                }
            }
            catch (Exception e)
            {
                response.status = false;
                response.exception = e;
            }
            return jobFamilyList;
        }



        public object GetAllCategoryDropdown(string jobFam)
        {
            APIResponse response = new APIResponse();
            response.status = false;
            List<string> categoriesList = new List<string>();
            try {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_DD_get_jobCategories", conn);
                    cmd.Parameters.AddWithValue("job_name", jobFam);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    using (var reader = cmd.ExecuteReader())
                    {

                        while (reader.Read())
                        {

                            categoriesList.Add(reader["cat_description"].ToString());


                        }
                    }
                    response.data = categoriesList;
                    response.status = true;
                }
            }
            catch (Exception e)
            {
                response.status = false;
                response.exception = e;
            }
             
            return categoriesList;
        }


        public object GetAllSubCategoryDropdown(string category)
        {
            APIResponse response = new APIResponse();
            response.status = false;
            List<string> subCategoriesList = new List<string>();
            try
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_DD_get_subCategories", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("cat_name", category);
                    using (var reader = cmd.ExecuteReader())
                    {

                        while (reader.Read())
                        {
                            subCategoriesList.Add(reader["sub_cat_description"].ToString());
                        }
                    }
                    response.status = true;
                    response.data = subCategoriesList;
                }
            }
            catch(Exception e)
            {
                response.status = false;
                response.exception = e;
            }
            return response;
        }

        public object getDDAllJobs()
        {
            APIResponse response = new APIResponse();
            response.status = false;
            List<string> jobs = new List<string>();
            try
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_DD_getAll_jobFamily", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    using (var reader = cmd.ExecuteReader())
                    {

                        while (reader.Read())
                        {
                            jobs.Add(reader["job_description"].ToString());
                        }
                    }
                    response.status = true;
                    response.data = jobs;
                }
            }
            catch (Exception e)
            {
                response.status = false;
                response.exception = e;
            }
            return response;
        }


        public object getDDAllCategories()
        {
            APIResponse response = new APIResponse();
            response.status = false;
            List<string> categories = new List<string>();
            try
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_DD_getAll_categories", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    using (var reader = cmd.ExecuteReader())
                    {

                        while (reader.Read())
                        {
                            categories.Add(reader["cat_description"].ToString());
                        }
                    }
                    response.status = true;
                    response.data = categories;
                }
            }
            catch (Exception e)
            {
                response.status = false;
                response.exception = e;
            }
            return response;
        }


        public object getDDAllsubCategories()
        {
            APIResponse response = new APIResponse();
            response.status = false;
            List<string> subCategories = new List<string>();
            try
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_DD_getAll_subcategories", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    using (var reader = cmd.ExecuteReader())
                    {

                        while (reader.Read())
                        {
                            subCategories.Add(reader["sub_cat_description"].ToString());
                        }
                    }
                    response.status = true;
                    response.data = subCategories;
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




