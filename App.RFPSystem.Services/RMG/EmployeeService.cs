using Applications.Operations.RMG;
using Common.DataObjects;
using Common.DataObjects.RMG;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;

namespace App.RFPSystem.Services.RMG
{
    public class EmployeeService : BaseService, ISyncEmployee
    {
        string strConString = Constants.DBConnectionRMG;
        public void Dispose()
        {
          //  throw new NotImplementedException();
        }

        public async Task<List<Employee>> GetList(Employee employee)
        {
            _ = new List<Employee>();
            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("[rmg].[sp_GetAllEmployees]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                if (employee.Emp_ID > 0)
                {
                    cmd.Parameters.AddWithValue("@Emp_ID", employee.Emp_ID);
                }
                cmd.Parameters.AddWithValue("@Emp_Code", employee.Emp_Code);
                cmd.Parameters.AddWithValue("@Emp_Name", employee.Emp_Name);
                if (employee.Business_ID > 0)
                {
                    cmd.Parameters.AddWithValue("@Business_ID", employee.Business_ID);
                }
                if (employee.Designation_ID > 0)
                {
                    cmd.Parameters.AddWithValue("@Designation_ID", employee.Designation_ID);
                }
                if (employee.Dept_ID > 0)
                {
                    cmd.Parameters.AddWithValue("@Dept_ID", employee.Dept_ID);
                }
                if (employee.Practice_ID > 0)
                {
                    cmd.Parameters.AddWithValue("@Practice_ID", employee.Practice_ID);
                }
                if (employee.COE_ID > 0)
                {
                    cmd.Parameters.AddWithValue("@COE_ID", employee.COE_ID);
                }
                if (employee.Location_ID > 0)
                {
                    cmd.Parameters.AddWithValue("@Location_ID", employee.Location_ID);
                }
                cmd.Parameters.AddWithValue("@EMP_Status", employee.EMP_Status);
                cmd.Parameters.AddWithValue("@Phone", employee.Phone);
                cmd.Parameters.AddWithValue("@AlterNativePhone", employee.AlterNativePhone);
                cmd.Parameters.AddWithValue("@Address1", employee.Address1);
                cmd.Parameters.AddWithValue("@EmailID", employee.EmailID);
                cmd.Parameters.AddWithValue("@JoiningDate", employee.JoiningDate);
                //if (employee.Reporting_Mgr_ID > 0)
                //{
                //}
                cmd.Parameters.AddWithValue("@Reporting_Mgr_ID", employee.Reporting_Mgr_ID);

                if (employee.SubCategory_ID > 0)
                {
                    cmd.Parameters.AddWithValue("@SubCategory_ID", employee.SubCategory_ID);
                }
                if (employee.JobFamily_ID > 0)
                {
                    cmd.Parameters.AddWithValue("@JobFamily_ID", employee.JobFamily_ID);
                }
                if (employee.Category_ID > 0)
                {
                    cmd.Parameters.AddWithValue("@Category_ID", employee.Category_ID);
                }

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
            List<Employee> list = ConvertDataTable<Employee>(dt);
            return list;

        }

        public async Task<int> Save(Employee employee)
        {
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("[rmg].[sp_EmployeeMasterInsertAndUpdate]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Emp_ID", employee.Emp_ID);
                cmd.Parameters.AddWithValue("@Emp_Code", employee.Emp_Code);
                cmd.Parameters.AddWithValue("@Emp_Name", employee.Emp_Name);
                cmd.Parameters.AddWithValue("@Business_ID", employee.Business_ID);
                cmd.Parameters.AddWithValue("@Designation_ID", employee.Designation_ID);
                cmd.Parameters.AddWithValue("@Dept_ID", employee.Dept_ID);
                cmd.Parameters.AddWithValue("@Practice_ID", employee.Practice_ID);
                cmd.Parameters.AddWithValue("@COE_ID", employee.COE_ID);
                cmd.Parameters.AddWithValue("@Location_ID", employee.Location_ID);
                cmd.Parameters.AddWithValue("@EMP_Status", employee.EMP_Status);
                cmd.Parameters.AddWithValue("@Phone", employee.Phone);
                cmd.Parameters.AddWithValue("@AlterNativePhone", employee.AlterNativePhone);
                cmd.Parameters.AddWithValue("@Address1", employee.Address1);
                cmd.Parameters.AddWithValue("@EmailID", employee.EmailID);
                cmd.Parameters.AddWithValue("@JoiningDate", employee.JoiningDate);
                cmd.Parameters.AddWithValue("@Reporting_Mgr_ID", employee.Reporting_Mgr_ID);
                cmd.Parameters.AddWithValue("@SubCategory_ID", employee.SubCategory_ID);
                cmd.Parameters.AddWithValue("@JobFamily_ID", employee.JobFamily_ID);
                cmd.Parameters.AddWithValue("@Category_ID", employee.Category_ID);             
                cmd.Parameters.AddWithValue("@Emp_Flag", employee.Emp_Flag == 0 ? 1 : 2);
                cmd.Parameters.AddWithValue("@EMP_CreatedBy", employee.CreatedBy);
                return await cmd.ExecuteNonQueryAsync();
            }
        }

        public async Task<int> Delete(int id)
        {
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("[rmg].[sp_Delete]", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", id);
                cmd.Parameters.AddWithValue("@Table", "[rmg].[Employee_Master]");
                return await cmd.ExecuteNonQueryAsync();
            }
        }

    }
}
