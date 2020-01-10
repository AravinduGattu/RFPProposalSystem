using System;
using System.Collections.Generic;
using MySql.Data.MySqlClient;

namespace RMG.Models
{
    public class ResourceReqContext
    {
        public string ConnectionString { get; set; }

        public ResourceReqContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }

        public object AddResReq(ResourceReqAttribute ResReq)
        {
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_AddResReq", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;


                    cmd.Parameters.AddWithValue("res_req_pid", ResReq.Res_req_pid);
                    cmd.Parameters.AddWithValue("res_req_created_by", ResReq.Res_req_created_by);
                    cmd.Parameters.AddWithValue("res_req_num_res", ResReq.Res_req_num_res);
                    cmd.Parameters.AddWithValue("res_req_project_name", ResReq.Res_req_project_name);
                    cmd.Parameters.AddWithValue("res_req_customer_name", ResReq.Res_req_customer_name);
                    cmd.Parameters.AddWithValue("res_req_ccc", ResReq.Res_req_ccc);
                    cmd.Parameters.AddWithValue("res_req_skillset", ResReq.Res_req_skillset);
                    cmd.Parameters.AddWithValue("res_req_type_of_billing", ResReq.Res_req_type_of_billing);
                    cmd.Parameters.AddWithValue("res_req_location", ResReq.Res_req_location);
                    cmd.Parameters.AddWithValue("res_req_category", ResReq.Res_req_category);
                    cmd.Parameters.AddWithValue("res_req_practice_name", ResReq.Res_req_practice_name);
                    cmd.Parameters.AddWithValue("res_req_COE", ResReq.Res_req_coe);
                    cmd.Parameters.AddWithValue("res_req_request_for", ResReq.Res_req_request_for);
                    cmd.Parameters.AddWithValue("res_req_textarea", ResReq.Res_req_textarea);
                    cmd.Parameters.AddWithValue("res_req_start_date", Convert.ToDateTime(ResReq.Res_req_start_date).Date);
                    cmd.Parameters.AddWithValue("res_req_end_date", Convert.ToDateTime(ResReq.Res_req_end_date).Date);
                    cmd.Parameters.AddWithValue("res_req_created_on", Convert.ToDateTime(ResReq.Res_req_created_on).Date);


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
        public List<ProjectdropdownAttribute> GetProjectDropdown()
        {
            List<ProjectdropdownAttribute> elist = new List<ProjectdropdownAttribute>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_CustomerProjectDropdown", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        elist.Add(new ProjectdropdownAttribute()
                        {
                            Project_Name = reader["Project_Name"].ToString(),
                            Cust_Name = reader["Cust_Name"].ToString(),


                        });
                    }
                }

            }
            return elist;
        }
        

        public object RRFPSearcgQuery(string p_query)
        {
            List<ResourceReqAttribute> rlist = new List<ResourceReqAttribute>();
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
                            rlist.Add(new ResourceReqAttribute()
                            {
                                Res_req_pid = reader["res_req_pid"].ToString(),
                                Res_req_num_res = reader["res_req_num_res"].ToString(),
                                Res_req_created_by = reader["Emp_Name"].ToString(),
                                Res_req_project_name = reader["res_req_project_name"].ToString(),
                                Res_req_customer_name = reader["res_req_customer_name"].ToString(),
                                Res_req_ccc = reader["res_req_ccc"].ToString(),
                                Res_req_coe= reader["coe"].ToString(),
                                Res_req_request_for = reader["Request_For"].ToString(),
                                Res_req_skillset = reader["res_req_skillset"].ToString(),
                                Res_req_type_of_billing = reader["res_req_type_of_billing"].ToString(),
                                Res_req_location = reader["res_req_location"].ToString(),
                                Res_req_category = reader["res_req_category"].ToString(),
                                Res_req_practice_name = reader["res_req_practice_name"].ToString(),
                                Res_req_start_date = reader["res_req_start_date"].ToString(),
                                Res_req_end_date = reader["res_req_end_date"].ToString(),
                                Res_req_textarea = reader["res_req_textarea"].ToString(),
                                Res_req_status = reader["res_req_status"].ToString(),
                            });
                        }
                    }
                    response.status = true;
                    response.data = rlist;
                }
            }
            catch (Exception e)
            {
                response.status = false;
                response.exception = e;
            }

            return response;
        }



        //get master data in child
        public object getRRFPDetails(string pid)
        {
            ResourceReqAttribute obj_RRFP = new ResourceReqAttribute();
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    string query = "SELECT * FROM view_getallresreqmst where res_req_pid like '%" + pid + "%'";
                    MySqlCommand cmd = new MySqlCommand(query, conn);



                    using (var reader = cmd.ExecuteReader())
                    {
                        reader.Read();
                        obj_RRFP.Res_req_pid = reader["res_req_pid"].ToString();
                        obj_RRFP.Res_req_created_by = reader["Emp_Name"].ToString();
                        obj_RRFP.Requested_by_id = reader["res_req_created_by"].ToString();
                        obj_RRFP.Res_req_num_res = reader["res_req_num_res"].ToString();
                        obj_RRFP.Res_req_project_name = reader["res_req_project_name"].ToString();
                        obj_RRFP.Res_req_coe = reader["coe"].ToString();
                        obj_RRFP.Res_req_request_for = reader["Request_For"].ToString();
                        obj_RRFP.Res_req_customer_name = reader["res_req_customer_name"].ToString();
                        obj_RRFP.Res_req_ccc = reader["res_req_ccc"].ToString();
                        obj_RRFP.Res_req_skillset = reader["res_req_skillset"].ToString();
                        obj_RRFP.Res_req_type_of_billing = reader["res_req_type_of_billing"].ToString();
                        obj_RRFP.Res_req_location = reader["res_req_location"].ToString();
                        obj_RRFP.Res_req_category = reader["res_req_category"].ToString();
                        obj_RRFP.Res_req_practice_name = reader["res_req_practice_name"].ToString();
                        obj_RRFP.Res_req_start_date = reader["res_req_start_date"].ToString();
                        obj_RRFP.Res_req_end_date = reader["res_req_end_date"].ToString();
                        obj_RRFP.Res_req_textarea = reader["res_req_textarea"].ToString();
                        obj_RRFP.Res_req_status = reader["res_req_status"].ToString();

    }
                }
                response.status = true;
                response.data = obj_RRFP;
            }
            catch(Exception e)
            {
                response.status = false;
                response.exception = e;
            }
            return response;
        }

        public object getChildResReqDetails(string pid)
        {
            List<ResourceReqChildAttribute> clist = new List<ResourceReqChildAttribute>();
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    string query = "SELECT * FROM view_getallresreqchild where res_req_pid like '%" + pid + "%'";
                    MySqlCommand cmd = new MySqlCommand(query, conn);

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            clist.Add(new ResourceReqChildAttribute()
                            {
                                Res_req_pid = reader["res_req_pid"].ToString(),
                                Res_req_cid = reader["res_req_cid"].ToString(),
                                Res_req_created_by = reader["Emp_Name"].ToString(),
                                Res_req_project_name = reader["res_req_project_name"].ToString(),
                                Res_req_customer_name = reader["res_req_customer_name"].ToString(),
                                Res_req_ccc = reader["res_req_ccc"].ToString(),
                                Res_req_skillset = reader["res_req_skillset"].ToString(),
                                Res_req_type_of_billing = reader["res_req_type_of_billing"].ToString(),
                                Res_req_location = reader["res_req_location"].ToString(),
                                Res_req_category = reader["res_req_category"].ToString(),
                                Res_req_practice_name = reader["res_req_practice_name"].ToString(),
                                Res_req_start_date = reader["res_req_start_date"].ToString(),
                                Res_req_end_date = reader["res_req_end_date"].ToString(),
                                Res_req_textarea = reader["res_req_textarea"].ToString(),
                                Creq_status = reader["creq_status"].ToString(),
                            });
                        }
                    }
                    response.status = true;
                    response.data = clist;
                }
            }
            catch (Exception e)
            {
                response.status = false;
                response.exception = e;
            }
            return response;

        }


        public List<ResourceReqChildAttribute> getChildResReq(string cid)
        {
            List<ResourceReqChildAttribute> childid = new List<ResourceReqChildAttribute>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string query = "SELECT * FROM view_getallresreqchild where res_req_cid like '%" + cid + "%'";
                MySqlCommand cmd = new MySqlCommand(query, conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        childid.Add(new ResourceReqChildAttribute()
                        {
                           
                            Res_req_cid = reader["res_req_cid"].ToString(),
                            
                        });
                    }
                }

            }
            return childid;

        }


        public Boolean cancelAssignRequest(string childId)
        {


            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string query = "update  pact_rmg_resreqchild_mst set creq_status='Cancelled' where res_req_cid='" + childId + "'";
                MySqlCommand cmd = new MySqlCommand(query, conn);



                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();



                }

            }
            return true;
        }



        public bool updatePrtStatus(string pid)
        {
            

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_UpdateRRFParentStatus", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("p_id", pid);
                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                   
                }

            }

            return true;
            
        }



        public object acceptAssignRequest(string cid)
        {
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_ResReqAcceptance", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("childId", cid);
                    using (var reader = cmd.ExecuteReader())
                    {
                        reader.Read();
                    }
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


        public object rejectAssignProject(string childId)
        {
            APIResponse response = new APIResponse();
            response.status = false;
            try
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    string query = "update  pact_rmg_resreqchild_mst set creq_status='Open' where res_req_cid='" + childId + "';update pact_rmg_assignproject_mst set flag=0 where res_req_cid='" + childId + "'";
                    MySqlCommand cmd = new MySqlCommand(query, conn);
                    using (var reader = cmd.ExecuteReader())
                    {
                        reader.Read();
                    }
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