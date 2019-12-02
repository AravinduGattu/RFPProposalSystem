using Applications.Operations;
using Common.DataObjects;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace App.RFPSystem.Services
{
    public class UserService : BaseService, ISyncUserInfo
    {
        string strConString = Constants.DBConnection;
       
        public void Dispose()
        {
            //throw new NotImplementedException();
        }

        public async Task<IEnumerable<UserInfo>> rFPUsersInformation()
        {
            IList<UserInfo> rFPUsersInformation =
                new List<UserInfo>
                {
                    new UserInfo { ID = 1, AccessKey = "QWERTYUIOP", Environment="Sandbox", EmployeeName = "Narayana", EmailID = "Narayana@pactera.com", Role = ProposalUsers.DeliveryTeamLead, Stream = Stream.Engineering  },
                    new UserInfo { ID = 2, AccessKey = "ASDFGHJKL", Environment="Sandbox", EmployeeName = "Sreekanth", EmailID = "Sreekanth@pactera.com", Role = ProposalUsers.PracticeLead, Stream = Stream.Digitalization },
                    new UserInfo { ID = 3, AccessKey = "LKJHGFDSA", Environment="Sandbox", EmployeeName = "Sashi", EmailID = "Sashi@pactera.com" , Role = ProposalUsers.DeliveryTeamLead, Stream = Stream.Globalization },
                    new UserInfo { ID = 4, AccessKey = "POIUYTREWQ", Environment="Sandbox", EmployeeName = "Phani", EmailID = "Phani@pactera.com" , Role = ProposalUsers.PracticeLead, Stream = Stream.Digitalization },
                    new UserInfo { ID = 5, AccessKey = "#EDCXSW@", Environment="Sandbox", EmployeeName = "Thomson", EmailID = "Thomson@pactera.com" , Role = ProposalUsers.SalesLead, Stream = Stream.EmergingTech },
                    new UserInfo { ID = 6, AccessKey = "!QAZ@WSX", Environment="Sandbox", EmployeeName = "maruthi", EmailID = "maruthi@pactera.com" , Role = ProposalUsers.PursuitTeamLead, Stream = Stream.Engineering },
                    new UserInfo { ID = 7, AccessKey = "ZAQ!XSW@", Environment="Sandbox", EmployeeName = "Aravind.Gattu", EmailID = "Aravind.Gattu@pactera.com" , Role = ProposalUsers.PursuitTeamLead, Stream = Stream.Globalization }
                };


            return await Task.Run(() => rFPUsersInformation);
        }
 
        public async Task<List<UserInfo>> GetList()
        {
            return null;
            //DataTable dt = new DataTable();
            //using (SqlConnection con = new SqlConnection(strConString))
            //{
            //    await con.OpenAsync();
            //    SqlCommand cmd = new SqlCommand("Select * from tblStudent", con);
            //    SqlDataAdapter da = new SqlDataAdapter(cmd);
            //    da.Fill(dt);
            //}
            //return ConvertDataTable<UserInfo>(dt);
        }

        public async Task<UserInfo> GetByName(string name)
        {
            return null;
            //DataTable dt = new DataTable();

            //using (SqlConnection con = new SqlConnection(strConString))
            //{
            //    await con.OpenAsync();
            //    SqlCommand cmd = new SqlCommand("Select * from tblStudent where student_id=" + id, con);
            //    SqlDataAdapter da = new SqlDataAdapter(cmd);
            //    da.Fill(dt);
            //}
            //return (ConvertDataTable<UserInfo>(dt)).FirstOrDefault();
        }
  
        public async Task<int> Save(UserInfo item)
        {
            return 0;
            //using (SqlConnection con = new SqlConnection(strConString))
            //{
            //    await con.OpenAsync();
            //    string query = "Update tblStudent SET student_name=@studname, student_age=@studage , student_gender=@gender where student_id=@studid";
            //    SqlCommand cmd = new SqlCommand(query, con);
            //    cmd.Parameters.AddWithValue("@studname", strStudentName);
            //    cmd.Parameters.AddWithValue("@studage", intAge);
            //    cmd.Parameters.AddWithValue("@gender", strGender);
            //    cmd.Parameters.AddWithValue("@studid", intStudentID);
            //    return cmd.ExecuteNonQuery();
            //}
        }

        public async Task<int> Delete(int id)
        {
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_Delete", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", id);
                cmd.Parameters.AddWithValue("@Table", "LocationMaster");
                return await cmd.ExecuteNonQueryAsync();
            }
        }

    }
}
