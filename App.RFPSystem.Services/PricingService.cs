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
    public class PricingService : BaseService, ISyncPricing
    {
        string strConString = Constants.DBConnection;
        
        public void Dispose()
        {
            //throw new NotImplementedException();
        }

        public async Task<List<Pricing>> GetList(int proposalId, int pricingId)
        {
            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_GETPricingDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;
                if (proposalId > 0)
                    cmd.Parameters.AddWithValue("@ProposalID", proposalId);
                if (pricingId > 0)
                    cmd.Parameters.AddWithValue("@ID", pricingId);
                //cmd.Parameters.AddWithValue("@Role", null);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
            return ConvertDataTable<Pricing>(dt);
        }

        public async Task<int> Save(Pricing item)
        {
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_Pricing", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", item.ID);
                cmd.Parameters.AddWithValue("@ProposalID", item.ProposalID);
                cmd.Parameters.AddWithValue("@Role", item.Role);
                cmd.Parameters.AddWithValue("@Description", item.Description);
                cmd.Parameters.AddWithValue("@Count", item.Count);
                cmd.Parameters.AddWithValue("@Allocation", item.Allocation);
                cmd.Parameters.AddWithValue("@LocationID", item.LocationID);
                cmd.Parameters.AddWithValue("@TotalHours", item.TotalHours);
                cmd.Parameters.AddWithValue("@TotalCost", item.TotalCost);
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
                cmd.Parameters.AddWithValue("@Table", "Pricing");
                return await cmd.ExecuteNonQueryAsync();
            }
        }

    }
}
