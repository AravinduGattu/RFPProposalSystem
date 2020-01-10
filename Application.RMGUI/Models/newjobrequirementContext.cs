using System;
using MySql.Data.MySqlClient;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMG.Models
{
    public class newjobrequirementContext
    {

        public string ConnectionStrings { get; set; }

        public newjobrequirementContext(string connectionString)
        {
            this.ConnectionStrings = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionStrings);
        }
        public List<newjobrequirementAttribute> GetAllNewJobRequirement()
        {
            List<newjobrequirementAttribute> list = new List<newjobrequirementAttribute>();

            using (MySqlConnection conn = GetConnection())
            {

                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_newjobrequirement", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;


                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new newjobrequirementAttribute()
                        {
                            ResourceRequest_Id = reader["Project_Name"].ToString(),
                            NewJobRequirement_code = reader["NewJobRequirement_Code"].ToString(),
                            NewJobRequirement_Id = reader["NewJobRequirement_Id"].ToString(),
                            StartDate = reader["StartDate"].ToString(),
                            EndDate = reader["EndDate"].ToString(),
                            Skills = reader["Skills"].ToString(),
                            Designation = reader["Designation"].ToString(),
                            Vacancies = Convert.ToInt32(reader["Vacancies"]),
                            Experience = Convert.ToInt32(reader["Experience"]),


                        });

                    }
                }
            }
            return list;


        }
        public List<newjobrequirementAttribute> NewjobrequirementsearchQuery(string p_query)
        {


            List<newjobrequirementAttribute> list = new List<newjobrequirementAttribute>();
            using (MySqlConnection con = new MySqlConnection(ConnectionStrings))
            {
                con.Open();

                string query = p_query;
                MySqlCommand cmd = new MySqlCommand(query, con);
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new newjobrequirementAttribute()
                        {
                            ResourceRequest_Id = reader["Resource_Request_Id"].ToString(),
                            NewJobRequirement_code = reader["NewJobRequirement_Code"].ToString(),
                            NewJobRequirement_Id = reader["NewJobRequirement_Id"].ToString(),
                            StartDate = reader["StartDate"].ToString(),
                            EndDate = reader["EndDate"].ToString(),
                            Skills = reader["Skills"].ToString(),
                            Designation = reader["Designation"].ToString(),
                            Vacancies = Convert.ToInt32(reader["Vacancies"]),
                            Experience = Convert.ToInt32(reader["Experience"]),

                    });

                    }

                }
            }
            return list;
        }
        //to add projects
        public int AddNewJob(newjobrequirementAttribute createnewjob)
        {

            using (MySqlConnection con = new MySqlConnection(ConnectionStrings))
            {
                con.Open();
                MySqlCommand cmd = new MySqlCommand("sp_AddNewjob", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("Resource_Request_Id", createnewjob.ResourceRequest_Id);
                cmd.Parameters.AddWithValue("NewJobRequirement_Id", createnewjob.NewJobRequirement_Id);
                cmd.Parameters.AddWithValue("NewJobRequirement_Code", createnewjob.NewJobRequirement_code);
                cmd.Parameters.AddWithValue("Skills", createnewjob.Skills);
                cmd.Parameters.AddWithValue("StartDate", Convert.ToDateTime(createnewjob.StartDate).Date);
                cmd.Parameters.AddWithValue("EndDate", Convert.ToDateTime(createnewjob.EndDate).Date);
                cmd.Parameters.AddWithValue("Experience", createnewjob.Experience);
                cmd.Parameters.AddWithValue("Vacancies", createnewjob.Vacancies);
                cmd.Parameters.AddWithValue("Designation", createnewjob.Designation);

                cmd.ExecuteNonQuery();
                // con.Close();
            }
            return 1;
        }
    }
}
