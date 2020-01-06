using Applications.Operations;
using Applications.Operations.RFP;
using Common.DataObjects;
using Common.DataObjects.RFP;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace App.RFPSystem.Services.RFP
{
    public class MilestoneService : BaseService, ISyncMilestone
    {
        string strConString = Constants.DBConnection;
        
        public void Dispose()
        {
            //throw new NotImplementedException();
        }

        public async Task<List<Milestone>> GetList(int proposalId, int milestoneId)
        {
            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_GETMilestoneDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;
                if (proposalId > 0)
                    cmd.Parameters.AddWithValue("@ProposalID", proposalId);
                if (milestoneId > 0)
                    cmd.Parameters.AddWithValue("@MilestoneID", milestoneId);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
            //return ConvertDataTable<Milestone>(dt);
            return (from DataRow dr in dt.Rows
                    select new Milestone()
                    {
                        ID = Convert.ToInt32(dr["ID"]),
                        MilestoneID = Convert.ToInt32(dr["MilestoneID"]),
                        MilestoneMaster = new MilestoneMaster
                        {
                            ID = Convert.ToInt32(dr["MilestoneID"]),
                            Description = dr["Description"].ToString(),
                            Milestone = dr["Milestone"].ToString()
                        },
                        ProposalID = Convert.ToInt32(dr["ProposalID"]),
                        MilestoneStartDate = Convert.ToDateTime(dr["MilestoneStartDate"]),
                        MilestoneEndDate = Convert.ToDateTime(dr["MilestoneEndDate"]),
                        Remarks = dr["Remarks"].ToString()
                    }).ToList();
        }

        public async Task<int> Save(Milestone item)
        {
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_Milestone", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", item.ID);
                cmd.Parameters.AddWithValue("@MilestoneID", item.MilestoneID);
                cmd.Parameters.AddWithValue("@MilestoneStartDate", item.MilestoneStartDate);
                cmd.Parameters.AddWithValue("@MilestoneEndDate", item.MilestoneEndDate);
                cmd.Parameters.AddWithValue("@Remarks", item.Remarks);
                cmd.Parameters.AddWithValue("@ProposalID", item.ProposalID);
                cmd.Parameters.AddWithValue("@Status", item.ID == 0 ? 1 : 2);
                cmd.Parameters.AddWithValue("@UserID", item.CreatedBy);
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
                cmd.Parameters.AddWithValue("@Table", "Milestone");
                return await cmd.ExecuteNonQueryAsync();
            }
        }

    }
}
