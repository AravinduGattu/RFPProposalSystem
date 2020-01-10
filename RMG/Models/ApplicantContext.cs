using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMG.Models
{
    public class ApplicantContext
    {
        public string ConnectionString { get; set; }

        public ApplicantContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }

        public List<ApplicantAttribute> GetAllApplicantprofile()
        {
            List<ApplicantAttribute> list = new List<ApplicantAttribute>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_fetch_applicant", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new ApplicantAttribute()
                        {
                            applicant_code = reader["applicant_code"].ToString(),
                            applicant_name = reader["applicant_name"].ToString(),
                           
                            gender = reader["gender"].ToString(),
                            date_of_birth = reader["date_of_birth"].ToString(),
                            marital_status = reader["marital_status"].ToString(),
                            educational_details = reader["educational_details"].ToString(),
                            experience = reader["experience"].ToString(),
                            previous_company = reader["previous_company"].ToString(),
                            employment_type = reader["employment_type"].ToString(),
                            skills = reader["skills"].ToString(),
                            phone = reader["phone"].ToString(),
                            email_id = reader["email_id"].ToString(),
                            address = reader["address"].ToString(),
                            uid_type = reader["uid_type"].ToString(),
                            uid_number = reader["uid_number"].ToString(),
                            notice_period = reader["notice_period"].ToString(),
                            certification = reader["certification"].ToString(),
                            languages_known = reader["languages_known"].ToString(),
                            applicant_status = reader["applicant_status"].ToString(),
                        });
                    }
                }
            }
            return list;
        }



        public List<ApplicantAttribute> ApplicantsearchQuery(string pquery)
        {
            List<ApplicantAttribute> list = new List<ApplicantAttribute>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string query = pquery;
                MySqlCommand cmd = new MySqlCommand(query, conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new ApplicantAttribute()
                        {
                            applicant_code = reader["applicant_code"].ToString(),
                            applicant_name = reader["applicant_name"].ToString(),
                           
                            gender = reader["gender"].ToString(),
                            date_of_birth = reader["date_of_birth"].ToString(),
                            marital_status = reader["marital_status"].ToString(),
                            educational_details = reader["educational_details"].ToString(),
                            experience = reader["experience"].ToString(),
                            previous_company = reader["previous_company"].ToString(),
                            employment_type = reader["employment_type"].ToString(),
                            skills = reader["skills"].ToString(),
                            phone = reader["phone"].ToString(),
                            email_id = reader["email_id"].ToString(),
                            address = reader["address"].ToString(),
                            uid_type = reader["uid_type"].ToString(),
                            uid_number = reader["uid_number"].ToString(),
                            notice_period = reader["notice_period"].ToString(),
                            certification = reader["certification"].ToString(),
                            languages_known = reader["languages_known"].ToString(),
                            applicant_status = reader["applicant_status"].ToString(),
                        });
                    }
                }
            }
            return list;
        }



    }
}
