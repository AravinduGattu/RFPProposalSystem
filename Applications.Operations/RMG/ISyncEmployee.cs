/*
 * Author: Siva Priya Dadi
 * Date: 10-Jan-2020
 */

using Common.DataObjects;
using Common.DataObjects.RMG;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Applications.Operations.RMG
{
    public interface ISyncEmployee :IDisposable
    {
        Task<List<Employee>> GetList(Employee employee);
        Task<int> Save(Employee employee);
        Task<int> Delete(int id);
    }
}
