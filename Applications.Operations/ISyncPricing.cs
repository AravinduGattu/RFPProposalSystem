/*
 * Author: Satya Kalasapati
 * Date: 03-Dec-2019
 */
using Common.DataObjects;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Applications.Operations
{
    public interface ISyncPricing : IDisposable
    {
        Task<List<Pricing>> GetList(int proposalId, int pricingId);
        Task<int> Save(Pricing item);
        Task<int> Delete(int id);
    }
}
