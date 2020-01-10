using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMG.Models
{
    public class JobDescriptionContext
    {


        public string ConnectionString { get; set; }

        public JobDescriptionContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }

        public List<JobDescriptionAttribute> GetAllJobDescrption()
        {
            List<JobDescriptionAttribute> list = new List<JobDescriptionAttribute>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_fetch_job_posting", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new JobDescriptionAttribute()
                        {
                            job_Posting_code = reader["job_Posting_code"].ToString(),
                            job_title = reader["Design_Description"].ToString(),                           
                            experience = reader["experience"].ToString(),
                            worklocation = reader["worklocation"].ToString(),
                            //duration = reader["duration"].ToString(),
                            //job_grade = reader["job_grade"].ToString(),
                            job_type = reader["job_type"].ToString(),
                           
                            skills = reader["skills"].ToString(),
                            //secondary_skills = reader["secondary_skills"].ToString(),
                            jobdescription_status = reader["jobdescription_status"].ToString(),
                            salary = reader["salary"].ToString(),
                            job_description = reader["job_description"].ToString(),

                        });
                    }
                }
            }
            return list;
        }


        //job_description_code ,
        //job_title,
        //project_name ,
        //project_startdate ,
        //project_enddate, 
        //experience ,
        //worklocation,
        //duration,
        //job_grade ,
        //job_type  ,
        //request_requester ,
        //primary_skills  ,
        //secondary_skills  ,
        //job_description



        public List<JobDescriptionAttribute> jobdescriptionSearchQuery(string pquery)
        {
            List<JobDescriptionAttribute> list = new List<JobDescriptionAttribute>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string query = pquery;
                MySqlCommand cmd = new MySqlCommand(query, conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new JobDescriptionAttribute()
                        {
                            job_Posting_code = reader["job_Posting_code"].ToString(),
                            job_title = reader["Design_Description"].ToString(),
                            //job_project_name = reader["Project_Name"].ToString(),
                            //project_startdate = reader["project_startdate"].ToString(),
                            //project_enddate = reader["project_enddate"].ToString(),
                            experience = reader["experience"].ToString(),
                            worklocation = reader["worklocation"].ToString(),
                            //duration = reader["duration"].ToString(),
                            //job_grade = reader["job_grade"].ToString(),
                            job_type = reader["job_type"].ToString(),
                           
                            skills = reader["skills"].ToString(),
                            //secondary_skills = reader["secondary_skills"].ToString(),
                            jobdescription_status = reader["jobdescription_status"].ToString(),
                            salary = reader["salary"].ToString(),
                            job_description = reader["job_description"].ToString(),
                        });
                    }
                }
            }
            return list;
        }




        public void AddJobDescription(JobDescriptionAttribute jobdescription)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_Add_job_posting", conn);

                cmd.CommandType = System.Data.CommandType.StoredProcedure;


                cmd.Parameters.AddWithValue("job_Posting_code", jobdescription.job_Posting_code);
                cmd.Parameters.AddWithValue("job_title", jobdescription.job_title);
                //cmd.Parameters.AddWithValue("job_project_name", jobdescription.job_project_name);
                //cmd.Parameters.AddWithValue("project_startdate", Convert.ToDateTime(jobdescription.project_startdate).Date);
                //cmd.Parameters.AddWithValue("project_enddate", Convert.ToDateTime(jobdescription.project_enddate).Date);
                cmd.Parameters.AddWithValue("experience", jobdescription.experience);
                cmd.Parameters.AddWithValue("worklocation", jobdescription.worklocation);
                //cmd.Parameters.AddWithValue("duration", jobdescription.duration);
                //cmd.Parameters.AddWithValue("job_grade", jobdescription.job_grade);
                cmd.Parameters.AddWithValue("job_type", jobdescription.job_type);
              
                cmd.Parameters.AddWithValue("skills", jobdescription.skills);
                //cmd.Parameters.AddWithValue("secondary_skills", jobdescription.secondary_skills);
                //cmd.Parameters.AddWithValue("jobdescription_status", jobdescription.jobdescription_status);
                cmd.Parameters.AddWithValue("salary", jobdescription.salary);
                cmd.Parameters.AddWithValue("job_description", jobdescription.job_description);

                cmd.ExecuteNonQuery();
                conn.Close();
            }

        }
        public void UpdateJobDescription(JobDescriptionAttribute jobdescription)
        {
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open(); 
                 MySqlCommand cmd = new MySqlCommand("sp_Update_job_posting", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("jjob_Posting_code", jobdescription.job_Posting_code);
                cmd.Parameters.AddWithValue("job_title", jobdescription.job_title);
                //cmd.Parameters.AddWithValue("job_project_name", jobdescription.job_project_name);
                //cmd.Parameters.AddWithValue("project_startdate", Convert.ToDateTime(jobdescription.project_startdate).Date);
                //cmd.Parameters.AddWithValue("project_enddate", Convert.ToDateTime(jobdescription.project_enddate).Date);
                cmd.Parameters.AddWithValue("experience", jobdescription.experience);
                cmd.Parameters.AddWithValue("worklocation", jobdescription.worklocation);
                //cmd.Parameters.AddWithValue("duration", jobdescription.duration);
                //cmd.Parameters.AddWithValue("job_grade", jobdescription.job_grade);
                cmd.Parameters.AddWithValue("job_type", jobdescription.job_type);
               
                cmd.Parameters.AddWithValue("skills", jobdescription.skills);
                //cmd.Parameters.AddWithValue("secondary_skills", jobdescription.secondary_skills);
                cmd.Parameters.AddWithValue("jobdescription_status", jobdescription.jobdescription_status);
                cmd.Parameters.AddWithValue("salary", jobdescription.salary);
                cmd.Parameters.AddWithValue("job_description", jobdescription.job_description);



                cmd.ExecuteNonQuery();
                conn.Close();
            }

        }

        //For Job title --designation DropDown

        public List<JobtitedrpdownAttribute> GetJobtitleDropdown()
        {
            List<JobtitedrpdownAttribute> elist = new List<JobtitedrpdownAttribute>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_TA_jobtitle_drpdown", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        elist.Add(new JobtitedrpdownAttribute()
                        {
                            job_title = reader["Design_Description"].ToString(),

                        });
                    }
                }

            }
            return elist;
        }



        //For  --Projectname DropDown

        //public List<projectdrp_TA_Attribute> GetProjectnameDropdown()
        //{
        //    List<projectdrp_TA_Attribute> elist = new List<projectdrp_TA_Attribute>();

        //    using (MySqlConnection conn = GetConnection())
        //    {
        //        conn.Open();
        //        MySqlCommand cmd = new MySqlCommand("sp_TA_Projectname_drpdown", conn);
        //        cmd.CommandType = System.Data.CommandType.StoredProcedure;
        //        using (var reader = cmd.ExecuteReader())
        //        {
        //            while (reader.Read())
        //            {
        //                elist.Add(new projectdrp_TA_Attribute()
        //                {
        //                    job_project_name = reader["Project_Name"].ToString(),
                           
        //                });
        //            }
        //        }

        //    }
        //    return elist;
        //}


        public List<SkillAttribute>GetSkillDropdown()
        {
            List<SkillAttribute> elist = new List<SkillAttribute>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_Skill_dropdown", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        elist.Add(new SkillAttribute()
                        {
                            skills = reader["skill_name"].ToString(),
                            

                        });
                    }
                }

            }
            return elist;
        }






    }
}
