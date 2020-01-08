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
using System.Transactions;

namespace App.RFPSystem.Services.RFP
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

        public async Task<int> SaveList(List<Pricing> list)
        {
            var counter = 0;
            try
            {
                // Create the TransactionScope to execute the commands, guaranteeing
                // that both commands can commit or roll back as a single unit of work.
                using (TransactionScope scope = new TransactionScope())
                {
                    using (SqlConnection con = new SqlConnection(strConString))
                    {
                        await con.OpenAsync();
                        foreach (var item in list)
                        {
                            SqlCommand cmd = new SqlCommand("sp_Pricing", con)
                            {
                                CommandType = CommandType.StoredProcedure
                            };
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
                            cmd.Parameters.AddWithValue("@UserID", item.CreatedBy);
                            await cmd.ExecuteNonQueryAsync();
                            counter++;
                        }
                    }
                    // The Complete method commits the transaction. If an exception has been thrown,
                    // Complete is not  called and the transaction is rolled back.
                    scope.Complete();
                }
            }
            catch (TransactionAbortedException ex)
            {
                return 0;
            }
            return counter;
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
                cmd.Parameters.AddWithValue("@Table", "Pricing");
                return await cmd.ExecuteNonQueryAsync();
            }
        }

    }
}
