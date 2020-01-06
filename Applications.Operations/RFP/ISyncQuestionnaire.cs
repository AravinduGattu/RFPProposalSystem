/*
 * Author: Satya Kalasapati
 * Date: 03-Dec-2019
 */
using Common.DataObjects;
using Common.DataObjects.RFP;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Applications.Operations.RFP
{
    public interface ISyncQuestionnaire : IDisposable
    {
        Task<List<Questionnaire>> GetList(string area, string question, int proposalId);
        Task<int> Save(Questionnaire item);
        Task<int> Delete(int id);
    }
}
