using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMG.Models
{
    public class AssessmentContext
    {
        public string ConnectionStrings { get; set; }

        public AssessmentContext(string connectionString)
        {
            this.ConnectionStrings = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionStrings);
        }
        public List<AssessmentAttribute> GetAllAssesments()
        {
            List<AssessmentAttribute> list = new List<AssessmentAttribute>();

            using (MySqlConnection conn = GetConnection())
            {

                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_fetch_asemtapplicant ", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;


                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new AssessmentAttribute()
                        {

                            applicant_code = reader["applicant_code"].ToString(),
                            applicant_name = reader["applicant_name"].ToString(),
                            educational_details = reader["educational_details"].ToString(),
                            experience = reader["experience"].ToString(),
                            previous_company = reader["previous_company"].ToString(),
                            employment_type = reader["employment_type"].ToString(),
                            skills = reader["skills"].ToString(),
                            phone = reader["phone"].ToString(),
                            email_id = reader["email_id"].ToString(),
                            
                        });

                    }
                }
            }
            return list;



        }
        public List<AssessmentAttribute> assesmentSearchQuery(string p_query)
        {
            List<AssessmentAttribute> list = new List<AssessmentAttribute>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string query = p_query;
                MySqlCommand cmd = new MySqlCommand(query, conn);
               
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new AssessmentAttribute()
                        {
                            applicant_code = reader["applicant_code"].ToString(),
                            applicant_name = reader["applicant_name"].ToString(),
                            educational_details = reader["educational_details"].ToString(),
                            experience = reader["experience"].ToString(),
                            previous_company = reader["previous_company"].ToString(),
                            employment_type = reader["employment_type"].ToString(),
                            skills = reader["skills"].ToString(),
                            phone = reader["phone"].ToString(),
                            email_id = reader["email_id"].ToString(),


                        });
                    }
                }
            }
            
            return list;
        }
        
        public void AddAssesments(AssessmentAttribute ass)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_add_assesment", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("applicant_code", ass.applicant_code);
                cmd.Parameters.AddWithValue("applicant_name", ass.applicant_name);
                cmd.Parameters.AddWithValue("educational_details", ass.educational_details);
                cmd.Parameters.AddWithValue("experience", ass.experience);
                cmd.Parameters.AddWithValue("previous_company", ass.previous_company);
                cmd.Parameters.AddWithValue("employment_type", ass.employment_type);
                cmd.Parameters.AddWithValue("skills", ass.skills);
                cmd.Parameters.AddWithValue("phone", ass.phone);
                cmd.Parameters.AddWithValue("email_id", ass.email_id);
                cmd.Parameters.AddWithValue("assessment_type", ass.assessment_type);
                cmd.Parameters.AddWithValue("mode_of_interview", ass.mode_of_interview);
                cmd.Parameters.AddWithValue("rating", ass.rating);
                cmd.Parameters.AddWithValue("interviwed_by", ass.interviwed_by);
                cmd.Parameters.AddWithValue("remarks", ass.remarks);
                cmd.Parameters.AddWithValue("assessment_date", ass.assessment_date);
                cmd.Parameters.AddWithValue("promoted", ass.promoted);
                cmd.ExecuteNonQuery();
                conn.Close();

 
            }



        }

        
       
        public List<AsesmtApplicantDrpDwn> GetAsesmntEmployeeDrpDwn()
        {
            List<AsesmtApplicantDrpDwn> plist = new List<AsesmtApplicantDrpDwn>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_AsesmtEmpDropdown", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        plist.Add(new AsesmtApplicantDrpDwn()
                        {
                            asesmnt_emp_names = reader["asesmnt_emp_names"].ToString()
                        });
                    }
                }

            }
            return plist;

        }
       
        //}


    }
}
