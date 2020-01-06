using Common.DataObjects;
using Common.DataObjects.RFP;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Applications.Operations
{
    public interface ISyncDataViz:IDisposable
    {
        Task<DatavizCategory_Proposal> datavizCategory_Proposal();

        Task<IEnumerable<DatavizForProposalCategoryByUsers>> datavizForProposalCategoryByUsers();
    }
}
