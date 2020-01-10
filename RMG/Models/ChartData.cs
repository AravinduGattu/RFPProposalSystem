using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RMG.Models;

namespace RMG.Models
{
    public class ChartData
    {
        public AllModuleCounts counts;
        public List<EmpInProjCount> empProject;
        public ChartsEmpProjRe releasecount;
        public List<PrevYearEmpJoin> empJoiningDetails;
        public List<PrevYearEmpJoin> empJoiningDetailsC;
        public List<EmpExitCount> empExitCount;
        public List<PracticeEmpCount> empEDGECount;
        public List<PracticeEmpCount> empCOECount;
        public List<CategoryCount> jobCategoryCount;
        public List<CategoryCount> categoriesCount;

    }
}
