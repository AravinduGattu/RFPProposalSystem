import { AllModuleCounts } from './AllModuleCounts';
import { EmpInProjCount } from './EmpInProjCount';
import { ChartsEmpProjRe } from './ChartsEmpProjRe';
import { PrevyearEmpjoin } from './PrevYearEmpJoin';

export class ChartData {

  counts: AllModuleCounts;
  empProject: EmpInProjCount[];
  releasecount: ChartsEmpProjRe;
  empJoiningDetails: PrevyearEmpjoin[];
}
