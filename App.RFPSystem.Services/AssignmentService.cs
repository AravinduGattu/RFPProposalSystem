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
    public class AssignmentService : BaseService, ISyncAssignment
    {
        string strConString = Constants.DBConnection;
        
        public void Dispose()
        {
            //throw new NotImplementedException();
        }

        public async Task<List<Assignment>> GetList(int proposalId, int assignmentId)
        {
            List<Assignment> list = new List<Assignment>();
            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_GETAssignmentDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;
                if (proposalId > 0)
                    cmd.Parameters.AddWithValue("@ProposalID", proposalId);
                if (assignmentId > 0)
                    cmd.Parameters.AddWithValue("@ID", assignmentId);
                //cmd.Parameters.AddWithValue("@Task", null);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
            list = ConvertDataTable<Assignment>(dt);
            list.ForEach(x => x.StatusName = ((Common.DataObjects.TaskStatus)x.Status).ToString());
            return list;
        }

        public async Task<int> Save(Assignment item)
        {
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_Assignment", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", item.ID);
                cmd.Parameters.AddWithValue("@ProposalID", item.ProposalID);
                cmd.Parameters.AddWithValue("@AssignmentDate", item.AssignmentDate);
                cmd.Parameters.AddWithValue("@Task", item.Task);
                cmd.Parameters.AddWithValue("@Name", item.Name);
                cmd.Parameters.AddWithValue("@AssignmentStatus", item.Status);                
                cmd.Parameters.AddWithValue("@Status", item.ID == 0 ? 1 : 2);
                return await cmd.ExecuteNonQueryAsync();
            }
        }

        public async Task<int> Delete(int id)
        {
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_Delete", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", id);
                cmd.Parameters.AddWithValue("@Table", "Assignment");
                return await cmd.ExecuteNonQueryAsync();
            }
        }

    }
}
