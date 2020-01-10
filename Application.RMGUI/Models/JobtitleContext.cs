using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMG.Models
{
    public class JobtitleContext
    {
        public string ConnectionStrings { get; set; }

        public JobtitleContext(string connectionString)
        {
            this.ConnectionStrings = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionStrings);
        }
        public List<JobtitleAttribute> GetAllJobs()
        {
            List<JobtitleAttribute> list = new List<JobtitleAttribute>();

            using (MySqlConnection conn = GetConnection())
            {

                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_fetch_jobs ", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;


                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new JobtitleAttribute()
                        {
                            job_title_id = Convert.ToInt32(reader["job_title_id"]),
                            job_title_code = reader["job_title_code"].ToString(),
                            job_title_name = reader["job_title_name"].ToString(),
                            job_title_desc = reader["job_title_desc"].ToString(),
                            job_title_status = reader["job_title_status"].ToString(),
                            job_title_start_date = reader["job_title_start_date"].ToString(),
                            job_title_end_date = reader["job_title_end_date"].ToString(),

                        });

                    }
                }
            }
            return list;


        }


        public void AddJobs(JobtitleAttribute job)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_AddJobs", conn);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;


                cmd.Parameters.AddWithValue("job_title_id", job.job_title_id);
                cmd.Parameters.AddWithValue("job_title_code", job.job_title_code);
                cmd.Parameters.AddWithValue("job_title_name", job.job_title_name);
                cmd.Parameters.AddWithValue("job_title_desc", job.job_title_desc);
                cmd.Parameters.AddWithValue("job_title_status", job.job_title_status);
                cmd.Parameters.AddWithValue("job_title_start_date", Convert.ToDateTime(job.job_title_start_date).Date);
                cmd.Parameters.AddWithValue("job_title_end_date", Convert.ToDateTime(job.job_title_end_date).Date);

                cmd.ExecuteNonQuery();
                conn.Close();
            }

        }
        public List<JobtitleAttribute> jobSearchQuery(string p_query)
        {
            List<JobtitleAttribute> list = new List<JobtitleAttribute>();
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string query = p_query;
                MySqlCommand cmd = new MySqlCommand(query, conn);

                using ( var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new JobtitleAttribute()
                        {
                            job_title_id = Convert.ToInt32(reader["job_title_id"]),
                            job_title_code = reader["job_title_code"].ToString(),
                            job_title_name = reader["job_title_name"].ToString(),
                            job_title_desc = reader["job_title_desc"].ToString(),
                            job_title_status = reader["job_title_status"].ToString(),
                            job_title_start_date = reader["job_title_start_date"].ToString(),
                            job_title_end_date = reader["job_title_end_date"].ToString(),

                        });
                    }
                }
            }
            //job_title_id
            //job_title_code
            //job_title_name
            //job_title_desc
            //job_title_status
            //job_title_start_date
            //job_title_end_date

            return list;
        }

        public void UpdateJob(JobtitleAttribute job)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_UpdateJob", conn);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("job_title_id", job.job_title_id);
                cmd.Parameters.AddWithValue("jjob_title_code", job.job_title_code);
                cmd.Parameters.AddWithValue("job_title_name", job.job_title_name);
                cmd.Parameters.AddWithValue("job_title_desc", job.job_title_desc);
                cmd.Parameters.AddWithValue("job_title_status", job.job_title_status);
                cmd.Parameters.AddWithValue("job_title_start_date", job.job_title_start_date);
                cmd.Parameters.AddWithValue("job_title_end_date", job.job_title_end_date);



                cmd.ExecuteNonQuery();
                conn.Close();
            }

        }

        public int DisableJob(string job_title_code)
        {

            using (MySqlConnection con = new MySqlConnection(ConnectionStrings))
            {
                con.Open();
                MySqlCommand cmd = new MySqlCommand("sp_DeleteJob", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("jid", job_title_code);

                cmd.ExecuteNonQuery();
                con.Close();
            }
            return 1;
        }
    }
}
