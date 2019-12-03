﻿using Applications.Operations;
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
            return ConvertDataTable<Milestone>(dt);
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