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
    public class ProposalService : BaseService, ISyncProposal
    {
        readonly string strConString = Constants.DBConnection;

        public void Dispose()
        {
            //throw new NotImplementedException();
        }

        public async Task<List<Proposal>> GetList(int status, int proposalId, int userId, int role)
        {
            List<Proposal> list = new List<Proposal>();
            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_RFPGETProposalDetails", con)
                {
                    CommandType = CommandType.StoredProcedure
                };
                if (proposalId > 0)
                    cmd.Parameters.AddWithValue("@ID", proposalId);
                if (status > 0)
                    cmd.Parameters.AddWithValue("@ProposalStatus", status);
                if (userId > 0)
                    cmd.Parameters.AddWithValue("@UserID", userId);
                if (role > 0)
                    cmd.Parameters.AddWithValue("@Role", role);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
            list = ConvertDataTable<Proposal>(dt);
            list.ForEach(x => x.PracticeName = x.PracticeID.ToString());
            return list;
        }

        public async Task<List<ProposalGrid>> GetGrid(int status, int proposalId, int userId, int role)
        {
            ProposalFlowService service = new ProposalFlowService();
            //Filter records by current user role
            var flowList = await service.GetList();

            List<ProposalGrid> list = new List<ProposalGrid>();
            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_RFPGETProposalDetails", con)
                {
                    CommandType = CommandType.StoredProcedure
                };
                if (proposalId > 0)
                    cmd.Parameters.AddWithValue("@ID", proposalId);
                if (status > 0)
                    cmd.Parameters.AddWithValue("@ProposalStatus", status);
                if (userId > 0)
                    cmd.Parameters.AddWithValue("@UserID", userId);
                if (role > 0)
                    cmd.Parameters.AddWithValue("@Role", role);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
            list = ConvertDataTable<ProposalGrid>(dt);

            foreach (var item in list)
            {                
                if (flowList.Any(y => y.ID == item.ProposalStatus && (int)y.Role == role))
                {
                    var flowItem = flowList.FirstOrDefault(x => x.ID == item.ProposalStatus && (int)x.Role == role);
                    item.ApproveID = flowItem.ApproveID;
                    item.ApproveTxt = flowItem.ApproveTxt;
                    item.RejectID = flowItem.RejectID;
                    item.RejectTxt = flowItem.RejectTxt;
                }
            }
            return list;
        }

        public async Task<int> UpdateStatus(int proposalID, int userID, int status)
        {
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_RFPProposalStatus", con)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.AddWithValue("@ID", proposalID);
                cmd.Parameters.AddWithValue("@ProposalStatus", status);
                cmd.Parameters.AddWithValue("@UserID", userID);
                return await cmd.ExecuteNonQueryAsync();
            }
        }

        public async Task<int> Save(Proposal item)
        {
            using (SqlConnection con = new SqlConnection(strConString))
            {
                await con.OpenAsync();
                SqlCommand cmd = new SqlCommand("sp_RFPProposal", con)
                {
                    CommandType = CommandType.StoredProcedure
                };
                cmd.Parameters.AddWithValue("@ID", item.ID);
                cmd.Parameters.AddWithValue("@RequestType", item.RequestType);
                cmd.Parameters.AddWithValue("@RFPCode", item.RFPCode);
                cmd.Parameters.AddWithValue("@OpportunityName", item.OpportunityName);
                cmd.Parameters.AddWithValue("@ReleaseDate", item.ReleaseDate);
                cmd.Parameters.AddWithValue("@PracticeID", item.PracticeID);
                cmd.Parameters.AddWithValue("@PracticeLead", item.PracticeLead);
                cmd.Parameters.AddWithValue("@Customer", item.Customer);
                cmd.Parameters.AddWithValue("@LocationID", item.LocationID);
                cmd.Parameters.AddWithValue("@Scope", item.Scope);
                cmd.Parameters.AddWithValue("@Description", item.Description);
                cmd.Parameters.AddWithValue("@CreatedBy", item.CreatedBy);
                cmd.Parameters.AddWithValue("@ModifiedBy", item.ModifiedBy);
                cmd.Parameters.AddWithValue("@CreatedDate", item.CreatedDate);
                cmd.Parameters.AddWithValue("@ModifiedDate", item.ModifiedDate);
                cmd.Parameters.AddWithValue("@RFPSubmissionDate", item.RFPSubmissionDate);
                cmd.Parameters.AddWithValue("@POC", item.POC);
                cmd.Parameters.AddWithValue("@AdditionalRemarks", item.AdditionalRemarks);
                cmd.Parameters.AddWithValue("@ProposalStatus", item.ProposalStatus);
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
                cmd.Parameters.AddWithValue("@Table", "RFPProposal");
                return await cmd.ExecuteNonQueryAsync();
            }
        }

    }
}
