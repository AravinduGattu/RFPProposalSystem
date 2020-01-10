using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMG.Models
{
    public class ApplicantProfileReviewContext
    {
        public string ConnectionString { get; set; }
        public ApplicantProfileReviewContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }
        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }
        public List<ApplicantProfileReview> GetAllApplicantProfileShortlisted()
        {
            List<ApplicantProfileReview> list = new List<ApplicantProfileReview>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_fetchapplicant_profile_review", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new ApplicantProfileReview()
                        {
                           
                            panel_name = reader["Emp_Name"].ToString(),
                            applicant_name = reader["applicant_name"].ToString(),
                            applicant_profile_status = reader["applicant_profile_status"].ToString(),
                            panel_profile_review = reader["panel_profile_review"].ToString(),
                            
                        });
                    }
                }
            }
            return list;

        }
       
        public List<ApplicantProfileReview> applicantprofileshortlistSearchQuery(string pquery)
        {
            List<ApplicantProfileReview> list = new List<ApplicantProfileReview>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string query = pquery;
                MySqlCommand cmd = new MySqlCommand(query, conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new ApplicantProfileReview()
                        {
                           
                            panel_name = reader["Emp_Name"].ToString(),
                            applicant_name = reader["applicant_name"].ToString(),
                            applicant_profile_status = reader["applicant_profile_status"].ToString(),
                            panel_profile_review = reader["panel_profile_review"].ToString(),
                            
                        });
                    }
                }
            }
            return list;
        }
       

        public void AddApplicantProfileReview(ApplicantProfileReview applicantProfileReview)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_addapplicant_profile_review", conn);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("panel_name", applicantProfileReview.panel_name);
                cmd.Parameters.AddWithValue("papplicant_name", applicantProfileReview.applicant_name);
                cmd.Parameters.AddWithValue("applicant_profile_status", applicantProfileReview.applicant_profile_status);
                cmd.Parameters.AddWithValue("panel_profile_review", applicantProfileReview.panel_profile_review);
               

                cmd.ExecuteNonQuery();
                conn.Close();
            }

        }
        public void DeleteApplicantProfileReview(string applicant_profile_review_id)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_deleteapplicant_profile_review", conn);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("papplicant_profile_review_id", applicant_profile_review_id);


                cmd.ExecuteNonQuery();
                conn.Close();
            }

        }
        public void UpdateApplicantProfileReview(ApplicantProfileReview applicantProfileReview)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_updateapplicant_profile_review", conn);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                //cmd.Parameters.AddWithValue("papplicant_profile_review_id", applicantProfileReview.applicant_profile_review_id);
                cmd.Parameters.AddWithValue("panel_name", applicantProfileReview.panel_name);
                cmd.Parameters.AddWithValue("papplicant_name", applicantProfileReview.applicant_name);
                cmd.Parameters.AddWithValue("applicant_profile_status", applicantProfileReview.applicant_profile_status);
                cmd.Parameters.AddWithValue("panel_profile_review", applicantProfileReview.panel_profile_review);
                

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


        public List<ApplicantDropDown> ApplicantDropdown()
        {
            List<ApplicantDropDown> list = new List<ApplicantDropDown>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_ApplicantDropdown", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new ApplicantDropDown()
                        {
                            applicant_name = reader["applicant_name"].ToString(),

                        });
                    }
                }
            }
            return list;
        }
    }
}



    

        