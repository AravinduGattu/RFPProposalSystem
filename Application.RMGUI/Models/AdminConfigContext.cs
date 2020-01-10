using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMG.Models
{
    public class AdminConfigContext
    {
        public string ConnectionString { get; set; }

        public AdminConfigContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }
        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }

        public object AddCoe(CoeAtt coe)
        {
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_AddCoe", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Coe_Description", coe.COE);
                    cmd.Parameters.AddWithValue("p_COE_Status", coe.COEStatus);

                    if (coe.COEStartDate == "")
                    {
                        cmd.Parameters.AddWithValue("p_COE_StartDate", null);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("p_COE_StartDate", Convert.ToDateTime(coe.COEStartDate).Date);

                    }
                    if (coe.COEEndDate == "")
                    {
                        cmd.Parameters.AddWithValue("p_COE_EndDate", null);
                    }
                    else
                    {

                        cmd.Parameters.AddWithValue("p_COE_EndDate", Convert.ToDateTime(coe.COEEndDate).Date);
                    }
                    cmd.Parameters.AddWithValue("p_Created_By", coe.Created_By);
                    cmd.Parameters.AddWithValue("p_Created_Date", Convert.ToDateTime(coe.Created_Date).Date);
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
        public object UpdateCoe(CoeAtt coe)
        {
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection conn = new MySqlConnection(ConnectionString))
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_UpdateCoe", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Coe_Description", coe.COE);
                    cmd.Parameters.AddWithValue("p_COE_Status", coe.COEStatus);
                    if (coe.COEStartDate == "")
                    {
                        cmd.Parameters.AddWithValue("p_COE_StartDate", null);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("p_COE_StartDate", Convert.ToDateTime(coe.COEStartDate).Date);

                    }
                    if (coe.COEEndDate == "")
                    {
                        cmd.Parameters.AddWithValue("p_COE_EndDate", null);
                    }
                    else
                    {

                        cmd.Parameters.AddWithValue("p_COE_EndDate", Convert.ToDateTime(coe.COEEndDate).Date);
                    }
                    cmd.Parameters.AddWithValue("p_Last_Updated_By", coe.Last_Updated_By);
                    cmd.Parameters.AddWithValue("p_Last_Updated_Date", Convert.ToDateTime(coe.Last_Updated_Date).Date);
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
        //  public List<CoeAtt> GetAllCOE()
        public object GetAllCOE()
        {
            List<CoeAtt> list = new List<CoeAtt>();
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_GetAllCOE", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            list.Add(new CoeAtt()
                            {
                                COE = reader["Coe_Description"].ToString(),
                                COEStatus = reader["Coe_Status"].ToString(),
                                COEStartDate = reader["Coe_StartDate"].ToString(),
                                COEEndDate = reader["Coe_EndDate"].ToString(),
                            });
                            response.status = true;
                            response.data = list;
                        }
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
       // public List<EdgePracticeAtt> GetAllEdgePractice()
        public object GetAllEdgePractice()
        {
            List<EdgePracticeAtt> list = new List<EdgePracticeAtt>();
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_GetAllEdgePractice", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            list.Add(new EdgePracticeAtt()
                            {
                                EdgePractice = reader["Edge_Practice_Description"].ToString(),
                                EpStatus = reader["Edge_Practice_Status"].ToString(),
                                EpStartDate = reader["Edge_Practice_StartDate"].ToString(),
                                EpEndDate = reader["Edge_Practice_EndDate"].ToString(),
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
        public object GetAllDepartments()
        {
            List<DeptAtt> list = new List<DeptAtt>();
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_GetAllDepartment", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            list.Add(new DeptAtt()
                            {
                                Department = reader["Department_Description"].ToString(),
                                DepartmentCode = reader["Department_Code"].ToString(),
                                DeptStatus = reader["Department_Status"].ToString(),
                                DepStartDate = reader["Department_StartDate"].ToString(),
                                DepEndDate = reader["Department_EndDate"].ToString(),
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
        public object GetAllDesignation()
        {
            List<DesignAtt> list = new List<DesignAtt>();
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_GetAllDesignation", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            list.Add(new DesignAtt()
                            {
                                Designation = reader["Design_Description"].ToString(),
                                DesignCode = reader["Designation_Code"].ToString(),
                                DesignStatus = reader["Design_Status"].ToString(),
                                DesignStartDate = reader["Design_StartDate"].ToString(),
                                DesignEndDate = reader["Design_EndDate"].ToString(),
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
       
        public object GetAllBusinessgroup()
        {
            List<Bussinessgroupatt> list = new List<Bussinessgroupatt>();
            APIResponse response = new APIResponse();
            response.status = false;

            try
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_BusinessGroup", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            list.Add(new Bussinessgroupatt()
                            {
                                bg_description = reader["bg_desc"].ToString(),
                                bg_status = reader["bg_status"].ToString(),
                                bg_startdate = reader["bg_start_date"].ToString(),
                                bg_enddate = reader["bg_end_date"].ToString(),
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
        // public List<EdgePracticeAtt> EdgePracticeSearchQuery(string pquery)
        public object EdgePracticeSearchQuery(string pquery)
        {
            List<EdgePracticeAtt> list = new List<EdgePracticeAtt>();
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
                            list.Add(new EdgePracticeAtt()
                            {
                                EdgePractice = reader["Edge_Practice_Description"].ToString(),
                                EpStatus = reader["Edge_Practice_Status"].ToString(),
                                EpStartDate = reader["Edge_Practice_StartDate"].ToString(),
                                EpEndDate = reader["Edge_Practice_EndDate"].ToString(),

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
       // public List<DeptAtt> DepartmentSearchQuery(string pquery)
        public object DepartmentSearchQuery(string pquery)
        {
            List<DeptAtt> list = new List<DeptAtt>();
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
                            list.Add(new DeptAtt()
                            {
                                Department = reader["Department_Description"].ToString(),
                                DepartmentCode = reader["Department_Code"].ToString(),
                                DeptStatus = reader["Department_Status"].ToString(),
                                DepStartDate = reader["Department_StartDate"].ToString(),
                                DepEndDate = reader["Department_EndDate"].ToString(),
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
        public object DesignationSearchQuery(string pquery)
        {
            List<DesignAtt> list = new List<DesignAtt>();
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
                            list.Add(new DesignAtt()
                            {
                                Designation = reader["Design_Description"].ToString(),
                                DesignCode = reader["Designation_Code"].ToString(),
                                DesignStatus = reader["Design_Status"].ToString(),
                                DesignStartDate = reader["Design_StartDate"].ToString(),
                                DesignEndDate = reader["Design_EndDate"].ToString(),

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
        //public List<CoeAtt> CoeSearchQuery(string pquery)
        public object CoeSearchQuery(string pquery)
        {
            List<CoeAtt> list = new List<CoeAtt>();
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
                            list.Add(new CoeAtt()
                            {
                                COE = reader["Coe_Description"].ToString(),
                                COEStatus = reader["Coe_Status"].ToString(),
                                COEStartDate = reader["Coe_StartDate"].ToString(),
                                COEEndDate = reader["Coe_EndDate"].ToString(),

                            });
                            response.status = true;
                            response.data = list;
                        }
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
        public object BussinessgroupSearchQuery(string pquery)
        {
            List<Bussinessgroupatt> list = new List<Bussinessgroupatt>();
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
                            list.Add(new Bussinessgroupatt()
                            {
                                bg_description = reader["bg_desc"].ToString(),
                                bg_status = reader["bg_status"].ToString(),
                                bg_startdate = reader["bg_start_date"].ToString(),
                                bg_enddate = reader["bg_end_date"].ToString(),

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

        public object AddEdgePractice(EdgePracticeAtt edge)
        {
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_AddEdgePractice", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("p_Edge_Practice_Description", edge.EdgePractice);
                cmd.Parameters.AddWithValue("p_Edge_Practice_Status", edge.EpStatus);

                    if (edge.EpStartDate == "")
                    {
                        cmd.Parameters.AddWithValue("p_Edge_Practice_StartDate", null);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("p_Edge_Practice_StartDate", Convert.ToDateTime(edge.EpStartDate).Date);

                    }
                    if (edge.EpEndDate == "")
                    {
                        cmd.Parameters.AddWithValue("p_Edge_Practice_EndDate", null);
                    }
                    else
                    {

                        cmd.Parameters.AddWithValue("p_Edge_Practice_EndDate", Convert.ToDateTime(edge.EpEndDate).Date);
                    }
                cmd.Parameters.AddWithValue("p_Created_By", edge.Created_By);
                cmd.Parameters.AddWithValue("p_Created_Date", Convert.ToDateTime(edge.Created_Date).Date);
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
        public object UpdateEdgePractice(EdgePracticeAtt edge)
        {
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection conn = new MySqlConnection(ConnectionString))
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_UpdateEdgePractice", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Edge_Practice_Description", edge.EdgePractice);
                    cmd.Parameters.AddWithValue("p_Edge_Practice_Status", edge.EpStatus);
                    if (edge.EpStartDate == "")
                    {
                        cmd.Parameters.AddWithValue("p_Edge_Practice_StartDate", null);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("p_Edge_Practice_StartDate", Convert.ToDateTime(edge.EpStartDate).Date);

                    }
                    if (edge.EpEndDate == "")
                    {
                        cmd.Parameters.AddWithValue("p_Edge_Practice_EndDate", null);
                    }
                    else
                    {

                        cmd.Parameters.AddWithValue("p_Edge_Practice_EndDate", Convert.ToDateTime(edge.EpEndDate).Date);
                    }
                    cmd.Parameters.AddWithValue("p_Last_Updated_By", edge.Last_Updated_By);
                    cmd.Parameters.AddWithValue("p_Last_Updated_Date", Convert.ToDateTime(edge.Last_Updated_Date).Date);
                    cmd.ExecuteNonQuery();
                    conn.Close();
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
        public object UpdateDepartment(DeptAtt dept)
        {
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection conn = new MySqlConnection(ConnectionString))
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_UpdateDepartment", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Department_Description", dept.Department);
                    cmd.Parameters.AddWithValue("p_Department_Status", dept.DeptStatus);
                    cmd.Parameters.AddWithValue("p_Department_Code", dept.DepartmentCode);
                    if (dept.DepStartDate == "")
                    {
                        cmd.Parameters.AddWithValue("p_Department_StartDate", null);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("p_Department_StartDate", Convert.ToDateTime(dept.DepStartDate).Date);

                    }
                    if (dept.DepEndDate == "")
                    {
                        cmd.Parameters.AddWithValue("p_Department_EndDate", null);
                    }
                    else
                    {

                        cmd.Parameters.AddWithValue("p_Department_EndDate", Convert.ToDateTime(dept.DepEndDate).Date);
                    }
                    cmd.Parameters.AddWithValue("p_Last_Updated_By", dept.Last_Updated_By);
                    cmd.Parameters.AddWithValue("p_Last_Updated_Date", Convert.ToDateTime(dept.Last_Updated_Date).Date);
                    cmd.ExecuteNonQuery();
                    conn.Close();
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
         public object UpdateDesigantion(DesignAtt desg)
        {
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection conn = new MySqlConnection(ConnectionString))
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_UpdateDesignation", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Design_Description", desg.Designation);
                    cmd.Parameters.AddWithValue("p_Design_Status", desg.DesignStatus);
                    cmd.Parameters.AddWithValue("p_Design_Code", desg.DesignCode);

                    if (desg.DesignStartDate == "")
                    {
                        cmd.Parameters.AddWithValue("p_Design_StartDate", null);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("p_Design_StartDate", Convert.ToDateTime(desg.DesignStartDate).Date);

                    }
                    if (desg.DesignEndDate == "")
                    {
                        cmd.Parameters.AddWithValue("p_Design_EndDate", null);
                    }
                    else
                    {

                        cmd.Parameters.AddWithValue("p_Design_EndDate", Convert.ToDateTime(desg.DesignEndDate).Date);
                    }
                    cmd.Parameters.AddWithValue("p_Last_Updated_By", desg.Last_Updated_By);
                    cmd.Parameters.AddWithValue("p_Last_Updated_Date", Convert.ToDateTime(desg.Last_Updated_Date).Date);
                    cmd.ExecuteNonQuery();
                    conn.Close();
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
        public object AddDepartment(DeptAtt dept)
        {
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_AddDepartment", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Department_Description", dept.Department);
                    cmd.Parameters.AddWithValue("p_Department_Code", dept.DepartmentCode);
                    cmd.Parameters.AddWithValue("p_Department_Status", dept.DeptStatus);
                    if (dept.DepStartDate == "")
                    {
                        cmd.Parameters.AddWithValue("p_Department_StartDate", null);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("p_Department_StartDate", Convert.ToDateTime(dept.DepStartDate).Date);

                    }
                    if (dept.DepEndDate == "")
                    {
                        cmd.Parameters.AddWithValue("p_Department_EndDate", null);
                    }
                    else
                    {

                        cmd.Parameters.AddWithValue("p_Department_EndDate", Convert.ToDateTime(dept.DepEndDate).Date);
                    }

                    cmd.Parameters.AddWithValue("p_Created_By", dept.Created_By);
                    cmd.Parameters.AddWithValue("p_Created_Date", Convert.ToDateTime(dept.Created_Date).Date);
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
        public object AddDesignation(DesignAtt designation)
        {
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_AddDesignation", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_Design_Description", designation.Designation);
                    cmd.Parameters.AddWithValue("p_Design_Code", designation.DesignCode);
                    cmd.Parameters.AddWithValue("p_Design_Status", designation.DesignStatus);

                    if (designation.DesignStartDate == "")
                    {
                        cmd.Parameters.AddWithValue("p_Design_StartDate", null);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("p_Design_StartDate", Convert.ToDateTime(designation.DesignStartDate).Date);

                    }
                    if (designation.DesignEndDate == "")
                    {
                        cmd.Parameters.AddWithValue("p_Design_EndDate", null);
                    }
                    else
                    {

                        cmd.Parameters.AddWithValue("p_Design_EndDate", Convert.ToDateTime(designation.DesignEndDate).Date);
                    }

                    cmd.Parameters.AddWithValue("p_Created_By", designation.Created_By);
                    cmd.Parameters.AddWithValue("p_Created_Date", Convert.ToDateTime(designation.Created_Date).Date);
                    cmd.ExecuteNonQuery();
                    conn.Close();
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
        public object AddBusinessGroup(Bussinessgroupatt business)
        {
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_AddBusinessGroup", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_bg_desc", business.bg_description);
                    cmd.Parameters.AddWithValue("p_bg_status", business.bg_status);

                    if (business.bg_startdate == "")
                    {
                        cmd.Parameters.AddWithValue("p_bg_start_date", null);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("p_bg_start_date", Convert.ToDateTime(business.bg_startdate).Date);

                    }
                    if (business.bg_enddate == "")
                    {
                        cmd.Parameters.AddWithValue("p_bg_end_date", null);
                    }
                    else
                    {

                        cmd.Parameters.AddWithValue("p_bg_end_date", Convert.ToDateTime(business.bg_enddate).Date);
                    }
                    cmd.Parameters.AddWithValue("p_Created_By", business.Created_By);
                    cmd.Parameters.AddWithValue("p_Created_Date", Convert.ToDateTime(business.Created_Date).Date);
                    cmd.ExecuteNonQuery();
                    conn.Close();
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
        public object UpdateBusinessGroup(Bussinessgroupatt business)
        {
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection conn = new MySqlConnection(ConnectionString))
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_UpdateBusinessGroup", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("p_bg_desc", business.bg_description);
                    cmd.Parameters.AddWithValue("p_bg_status", business.bg_status);

                    if (business.bg_startdate == "")
                    {
                        cmd.Parameters.AddWithValue("p_bg_start_date", null);
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("p_bg_start_date", Convert.ToDateTime(business.bg_startdate).Date);

                    }
                    if (business.bg_enddate == "")
                    {
                        cmd.Parameters.AddWithValue("p_bg_end_date", null);
                    }
                    else
                    {

                        cmd.Parameters.AddWithValue("p_bg_end_date", Convert.ToDateTime(business.bg_enddate).Date);
                    }
                    cmd.Parameters.AddWithValue("p_Last_Updated_By", business.Last_Updated_By);
                    cmd.Parameters.AddWithValue("p_Last_Updated_Date", Convert.ToDateTime(business.Last_Updated_Date).Date);
                    cmd.ExecuteNonQuery();
                    conn.Close();
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
    }
}
