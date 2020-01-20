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
    public class QuestionnaireService : BaseService, ISyncQuestionnaire
    {
        string strConString = Constants.DBConnection;
        
        public void Dispose()
        {
            //throw new NotImplementedException();
        }

        public async Task<List<Questionnaire>> GetList(string area, string question, int proposalId)
        {
            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_GETQuestionnaireDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Area", area);
                cmd.Parameters.AddWithValue("@Question", question);
                if (proposalId > 0)
                    cmd.Parameters.AddWithValue("@ProposalID", proposalId);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
            return ConvertDataTable<Questionnaire>(dt);
        }

        public async Task<int> SaveList(List<Questionnaire> list)
        {
            var counter = 0;
            try
            {
                // Create the TransactionScope to execute the commands, guaranteeing
                // that both commands can commit or roll back as a single unit of work.
                using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
                {
                    using (SqlConnection con = new SqlConnection(strConString))
                    {
                        await con.OpenAsync();
                        foreach (var item in list)
                        {
                            SqlCommand cmd = new SqlCommand("sp_Questionnaire", con)
                            {
                                CommandType = CommandType.StoredProcedure
                            };
                            cmd.Parameters.AddWithValue("@ID", item.ID);
                            cmd.Parameters.AddWithValue("@ProposalID", item.ProposalID);
                            cmd.Parameters.AddWithValue("@Area", item.Area);
                            cmd.Parameters.AddWithValue("@Question", item.Question);
                            cmd.Parameters.AddWithValue("@Answer", item.Answer);
                            cmd.Parameters.AddWithValue("@Remarks", item.Remarks);
                            cmd.Parameters.AddWithValue("@Status", item.ID == 0 ? 1 : 2);
                            cmd.Parameters.AddWithValue("@UserID", item.CreatedBy);
                            await cmd.ExecuteNonQueryAsync();
                            counter++;
                        }
                    }
                    // The Complete method commits the transaction. If an exception has been thrown,
                    // Complete is not  called and the transaction is rolled back.
                    scope.Complete();
                    //scope.Dispose();
                }
            }
            catch (TransactionAbortedException ex)
            {
                return 0;
            }
            return counter;
        }


        public async Task<int> Save(Questionnaire item)
        {
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_Questionnaire", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", item.ID);
                cmd.Parameters.AddWithValue("@ProposalID", item.ProposalID);
                cmd.Parameters.AddWithValue("@Area", item.Area);
                cmd.Parameters.AddWithValue("@Question", item.Question);
                cmd.Parameters.AddWithValue("@Answer", item.Answer);
                cmd.Parameters.AddWithValue("@Remarks", item.Remarks);
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
                cmd.Parameters.AddWithValue("@Table", "Questionnaire");
                return await cmd.ExecuteNonQueryAsync();
            }
        }

    }
}
