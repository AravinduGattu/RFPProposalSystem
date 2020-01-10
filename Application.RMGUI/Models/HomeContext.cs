using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMG.Models
{
    public class HomeContext
    {
        public string ConnectionString { get; set; }

        public HomeContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }
        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }
        public int GetallEmployeeCount()
        {
            int empCount;
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string query = "select count(*) as emp_count from pact_rmg_employee_mst where Flag_Status='Active';";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    empCount = Convert.ToInt32(reader["emp_count"]);      
                }
            }
            return empCount;
        }
        public int GetallEmpProjCount()
        {
            int empProj;
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string query = "select count(*) as empProj_count from pact_rmg_emp_proj where flag=1 && billable=\"yes\"";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    empProj = Convert.ToInt32(reader["empProj_count"]);
                }
            }
            return empProj;
        }
        public int GetallEmpBenchCount()
        {
            int empBenchcount;
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string query = "select count(*) as empbench_count from pact_rmg_emp_proj where flag=1 && billable=\"no\"";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    empBenchcount = Convert.ToInt32(reader["empbench_count"]);
                }
            }
            return empBenchcount;
        }
        public int GetallProjCount()
        {
            int Projcount;
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string query = "select count(*) as proj_count from pact_rmg_projects_mst where flag=1;";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    Projcount = Convert.ToInt32(reader["proj_count"]);
                }
            }
            return Projcount;
        }
        public int GetallCustomerCount()
        {
            int custcount;
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                string query = "select count(*) as cust_count from pact_rmg_customer_mst where flag=1;";
                MySqlCommand cmd = new MySqlCommand(query, conn);
                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    custcount = Convert.ToInt32(reader["cust_count"]);
                }
            }
            return custcount;
        }


        public AllModuleCounts GetallModuleCount()
        {
            AllModuleCounts counts = new AllModuleCounts();
            using (MySqlConnection connection = GetConnection())
            {


                connection.Open();
                MySqlCommand cmd = new MySqlCommand("getAllInfo", connection);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    counts.emp_count = Convert.ToInt32(reader["emp_count"]);
                    counts.delivery_count = Convert.ToInt32(reader["delivery_count"]);
                    counts.emp_prj_count = Convert.ToInt32(reader["emp_prj_count"]);
                    counts.emp_bench_count = Convert.ToInt32(reader["emp_bench_count"]);
                    counts.prj_count = Convert.ToInt32(reader["prj_count"]);
                    counts.cus_count = Convert.ToInt32(reader["cus_count"]);
                    counts.pool_count= Convert.ToInt32(reader["pool_count"]);
                    counts.rrf_open = Convert.ToInt32(reader["rrf_open"]);
                    counts.rrf_pending = Convert.ToInt32(reader["rrf_pending"]);
                    counts.rrf_closed = Convert.ToInt32(reader["rrf_closed"]);
                }
            }
            return counts;
        }




        public List<EmpInProjCount> getEmpCountInProj()
        {
            List<EmpInProjCount> list = new List<EmpInProjCount>();
          
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_DB_Charts", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                using (var reader = cmd.ExecuteReader())
                {

                    while (reader.Read())
                    {
                        list.Add(new EmpInProjCount()
                        {
                            Project_Name = reader["Project_Name"].ToString(),
                            EmpCount = Convert.ToInt32(reader["EmpCount"]),

                        });
                    }
                }
            }
            return list;
        }




        public ChartsEmpProjRe getEmpProjRelease()
        {
            ChartsEmpProjRe obj = new ChartsEmpProjRe();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_DB_EmpProjRelease", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                using (var reader = cmd.ExecuteReader())
                {

                    reader.Read();

                    obj.emp_7 = Convert.ToInt32(reader["emp_7"]);
                    obj.emp_30 = Convert.ToInt32(reader["emp_30"]);
                    obj.emp_90 = Convert.ToInt32(reader["emp_90"]);
                    obj.emp_180 = Convert.ToInt32(reader["emp_180"]);
                    obj.emp_270 = Convert.ToInt32(reader["emp_270"]);
                    obj.emp_365 = Convert.ToInt32(reader["emp_365"]);

                    obj.proj_7 = Convert.ToInt32(reader["proj_7"]);
                    obj.proj_30 = Convert.ToInt32(reader["proj_30"]);
                    obj.proj_90 = Convert.ToInt32(reader["proj_90"]);
                    obj.proj_180 = Convert.ToInt32(reader["proj_180"]);
                    obj.proj_270 = Convert.ToInt32(reader["proj_270"]);
                    obj.proj_365 = Convert.ToInt32(reader["proj_365"]);



                }
            }
            return obj;
        }




        public List<PrevYearEmpJoin> getEmpsJoinedCummulative()
        {
            List<PrevYearEmpJoin> list = new List<PrevYearEmpJoin>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_DB_cummulative_Emps", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new PrevYearEmpJoin()
                        {
                            empcount = Convert.ToInt32(reader["empcount"]),
                            joined_month = reader["joined_month"].ToString(),

                        });
                    }

                }
            }
            return list;
        }




        public List<EmpExitCount> getEmpExitCount()
        {
            List<EmpExitCount> list = new List<EmpExitCount>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_EmpExitCount", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new EmpExitCount()
                        {
                            exitCount = Convert.ToInt32(reader["EXIT_EMPLOYEE_COUNT"]),
                            monthYear = reader["YEARMONTH"].ToString(),

                        });
                    }

                }
            }
            return list;
        }



        public List<PrevYearEmpJoin> getEmpJoinedByMon()
        {
            List<PrevYearEmpJoin> list = new List<PrevYearEmpJoin>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                //string query = "select count(*) as empcount, DATE_FORMAT(Joining_Date, '%M,%Y') as joined_month FROM pact_rmg.pact_rmg_employee_mst where(current_date() - interval 365 day) <= Joining_Date group by  DATE_FORMAT(Joining_Date, '%M,%Y') /*order by year(Joining_Date) desc,month(Joining_Date) desc*/";
                string query = "SELECT CONCAT(A.M_,'-',A.Y_) AS joined_month, empcount FROM (SELECT YEAR(Joining_Date) AS Y_,MONTH(Joining_Date),MONTHNAME(Joining_Date) AS M_, COUNT(Emp_Id) AS empcount FROM pact_rmg_employee_mst where Flag_Status = 'Active' GROUP BY 1,2,3 ORDER BY 1,2 ) A";
                MySqlCommand cmd = new MySqlCommand(query, conn);

                using (var reader = cmd.ExecuteReader())
                {

                    while (reader.Read())
                    {
                        list.Add(new PrevYearEmpJoin()
                        {
                            empcount = Convert.ToInt32(reader["empcount"]),
                            joined_month = reader["joined_month"].ToString(),

                        });
                    }
                }
            }
            return list;
        }

        public List<PracticeEmpCount> getEDGECount()
        {
            List<PracticeEmpCount> list = new List<PracticeEmpCount>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_Edge_EmpCount", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new PracticeEmpCount()
                        {
                            count = Convert.ToInt32(reader["empCount"]),
                            description = reader["Edge_Practice_Description"].ToString(),

                        });
                    }

                }
            }
            return list;
        }


        public List<PracticeEmpCount> getCOECount()
        {
            List<PracticeEmpCount> list = new List<PracticeEmpCount>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_COE_EmpCount", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new PracticeEmpCount()
                        {
                            count = Convert.ToInt32(reader["empCount"]),
                            description = reader["Coe_Description"].ToString(),

                        });
                    }

                }
            }
            return list;
        }



        public List<CategoryCount> getJobCount()
        {
            List<CategoryCount> list = new List<CategoryCount>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_DB_getJobCount", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new CategoryCount()
                        {
                            count = Convert.ToInt32(reader["count"]),
                            description = reader["job_description"].ToString(),

                        });
                    }

                }
            }
            return list;
        }

        public List<CategoryCount> getCategoriesCount()
        {
            List<CategoryCount> list = new List<CategoryCount>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("sp_DB_getCategoriesCount", conn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        list.Add(new CategoryCount()
                        {
                            count = Convert.ToInt32(reader["count"]),
                            description = reader["cat_description"].ToString(),

                        });
                    }

                }
            }
            return list;
        }



        public object getChartData()
        {
            ChartData chartData = new ChartData();
            APIResponse response = new APIResponse();
            response.status = false;

            try { 
            
                
            chartData.counts = this.GetallModuleCount();
            chartData.empProject = this.getEmpCountInProj();
            chartData.releasecount = this.getEmpProjRelease();
            chartData.empJoiningDetails = this.getEmpJoinedByMon();
             chartData.empJoiningDetailsC = this.getEmpsJoinedCummulative();
             chartData.empExitCount = this.getEmpExitCount();
                chartData.empEDGECount = this.getEDGECount();
                chartData.empCOECount = this.getCOECount();
                chartData.jobCategoryCount = this.getJobCount();
                chartData.categoriesCount = this.getCategoriesCount();
                response.status = true;
                response.data = chartData;
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
