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
    public interface ISyncFileUpload : IDisposable
    {
        Task<List<FileUpload>> GetList(string name, string category, int proposalId);
        Task<int> Save(FileUpload item);
        Task<int> Delete(int id);
    }
}
