import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/HomeService';
import { AllModuleCounts } from '../models/AllModuleCounts';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label, SingleDataSet, Color, MultiDataSet } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { EmpInProjCount } from '../models/EmpInProjCount';
import { ChartsEmpProjRe } from '../models/ChartsEmpProjRe';
import { PrevyearEmpjoin } from '../models/PrevYearEmpJoin';
import { ChartData } from '../models/ChartData';
import { DialogService } from '../services/dialog.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public empcount: number;
  deliveryCount: number;
  empBenchcount: number;
  empProjcount: number;
  projcount: number;
  custcount: number;

  availableRes: number;
  rrfOpen: number;
  rrfClosed: number;
  rrfWIP: number;
  allCounts: AllModuleCounts;
  list_empJoin: PrevyearEmpjoin[] = [];
  showgraph = false;
  val: any[] = [];
  b1: any[] = [];
  b2: any[] = [];
  b3: any[] = [];
  b4: any[] = [];
  b5: any[] = [];
  b6: any[] = [];
  t1: any[] = [];
  b7: any[] = [];
  b8: any[] = [];
  b9: any[] = [];
  b10: any[]=[];
  b11: any[] = [];
  l_v1: EmpInProjCount[] = [];
  obj_pc1: ChartsEmpProjRe;
  // objChartData: ChartData;
  objChartData: any;

  

  public Colors1 = [
    { backgroundColor: ["#1530A9"] },
    { backgroundColor: ["#29BF9D"] },
    { backgroundColor: ["#2962BF"] },
    { backgroundColor: ["#566573"] },
    { backgroundColor: ["#CD6155"] },
    { backgroundColor: ["#FFC300"] },
    { backgroundColor: ["#A569BD"] },
    { backgroundColor: ["#DAF7A6"] },
    { backgroundColor: ["#2ECC71"] },
    { backgroundColor: ["#5F6A6A"] },
    { backgroundColor: ["#F7DC6F"] },
    { backgroundColor: ["#138D75"] },
    { backgroundColor: ["#5499C7"] },
    { backgroundColor: ["#5D6D7E"] },
    { backgroundColor: ["#2874A6"] },
    { backgroundColor: ["#008080"] },
    { backgroundColor: ["#7FB3D5"] },
    { backgroundColor: ["#30A7B6"] },
    { backgroundColor: ["#DE876B"] },
    { backgroundColor: ["#4FCB97"] },
    { backgroundColor: ["#7788A4"] },
    { backgroundColor: ["#DF6666"] },
    { backgroundColor: ["#6DB7C2"] },
    { backgroundColor: ["#6D7FC2"] },
    { backgroundColor: ["#6A949B"] },
    { backgroundColor: ["#D3A77B"] },
  ];


  public barChartColors1 = [
    { backgroundColor: ["#1530A9"] },
    { backgroundColor: ["#29BF9D"] },
    { backgroundColor: ["#2962BF"] },
    { backgroundColor: ["#566573"] },
    { backgroundColor: ["#CD6155"] },
    { backgroundColor: ["#FFC300"] },
    { backgroundColor: ["#A569BD"] },
    { backgroundColor: ["#DAF7A6"] },
    { backgroundColor: ["#2ECC71"] },
    { backgroundColor: ["#5F6A6A"] },
    { backgroundColor: ["#F7DC6F"] },
    { backgroundColor: ["#138D75"] },
    { backgroundColor: ["#5499C7"] },
    { backgroundColor: ["#5D6D7E"] },
    { backgroundColor: ["#2874A6"] },
    { backgroundColor: ["#008080"] },
    { backgroundColor: ["#7FB3D5"] },
    { backgroundColor: ["#30A7B6"] },
    { backgroundColor: ["#DE876B"] },
    { backgroundColor: ["#4FCB97"] },
    { backgroundColor: ["#7788A4"] },
    { backgroundColor: ["#DF6666"] },
    { backgroundColor: ["#6DB7C2"] },
    { backgroundColor: ["#6D7FC2"] },
    { backgroundColor: ["#6A949B"] },
    { backgroundColor: ["#D3A77B"] },
  ];

  public barChartColors2 = [
    { backgroundColor: ["#566573"] },
    { backgroundColor: ["#CD6155"] },
    { backgroundColor: ["#FFC300"] },
    { backgroundColor: ["#A569BD"] },
    { backgroundColor: ["#DAF7A6"] },
    { backgroundColor: ["#2ECC71"] },
    { backgroundColor: ["#5F6A6A"] },
    { backgroundColor: ["#F7DC6F"] },
    { backgroundColor: ["#138D75"] },
    { backgroundColor: ["#5499C7"] },
    { backgroundColor: ["#5D6D7E"] },
    { backgroundColor: ["#2874A6"] },
    { backgroundColor: ["#008080"] },
    { backgroundColor: ["#7FB3D5"] },
    { backgroundColor: ["#30A7B6"] },
    { backgroundColor: ["#DE876B"] },
    { backgroundColor: ["#4FCB97"] },
    { backgroundColor: ["#7788A4"] },
    { backgroundColor: ["#DF6666"] },
    { backgroundColor: ["#6DB7C2"] },
    { backgroundColor: ["#6D7FC2"] },
    { backgroundColor: ["#6A949B"] },
    { backgroundColor: ["#D3A77B"] },
    

  ];




  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }





  //barchart2

  public barChartOptions2: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels2: Label[] = ['Employees per Project'];

  public barChartType: ChartType = 'bar';
  public barChartLegend2 = true;
  public barChartPlugins2 = [pluginDataLabels];

  //public barChartData: ChartDataSets[]=[];

  public barChartData2: ChartDataSets[] = [{ data: [0] },
  { data: [0] },
  { data: [0] }];




  //barchart2

  public barChartOptions3: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels3: Label[] = ['Employees Released from Project'];

  public barChartType3: ChartType = 'bar';
  public barChartLegend3 = true;
  public barChartPlugins3 = [pluginDataLabels];

  //public barChartData: ChartDataSets[]=[];

  
  public barChartData3: ChartDataSets[] = [{ data: [0] },
  { data: [0] },
  { data: [0] }];







  //barchart4 for projects being ended

  public barChartOptions4: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels4: Label[] = ['Projects Ending'];

  public barChartType4: ChartType = 'bar';
  public barChartLegend4 = true;
  public barChartPlugins4 = [pluginDataLabels];


  public barChartData4: ChartDataSets[] = [{ data: [0] },
  { data: [0] },
    { data: [0] }];







  //barchart5 for projects being ended

  public barChartOptions5: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels5: Label[] = ['Monthly Recruitment of Employee'];

  public barChartType5: ChartType = 'bar';
  public barChartLegend5 = true;
  public barChartPlugins5 = [pluginDataLabels];


  public barChartData5: ChartDataSets[] = [{ data: [0] },
  { data: [0] },
    { data: [0] }];




  //barchart6 for projects being ended

  public barChartOptions6: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels6: Label[] = ['Employee Count by Month'];

  public barChartType6: ChartType = 'bar';
  public barChartLegend6 = true;
  public barChartPlugins6 = [pluginDataLabels];


  public barChartData6: ChartDataSets[] = [{ data: [0] },
  { data: [0] },
  { data: [0] }];





  //barchart7 for projects being ended

  public barChartOptions7: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels7: Label[] = ['Employees Resigned In'];

  public barChartType7: ChartType = 'bar';
  public barChartLegend7 = true;
  public barChartPlugins7 = [pluginDataLabels];


  public barChartData7: ChartDataSets[] = [{ data: [0] },
  { data: [0] },
  { data: [0] }];



  //barchart8 for projects being ended

  public barChartOptions8: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels8: Label[] = ['Employee by EDGE'];




  public barChartType8: ChartType = 'bar';
  public barChartLegend8 = true;
  public barChartPlugins8 = [pluginDataLabels];


  public barChartData8: ChartDataSets[] = [{ data: [0] },
  { data: [0] },
    { data: [0] }];






  //barchart9

  public barChartOptions9: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels9: Label[] = ['Employee by COE'];

  public barChartType9: ChartType = 'bar';
  public barChartLegend9 = true;
  public barChartPlugins9 = [pluginDataLabels];

  //public barChartData: ChartDataSets[]=[];


  public barChartData9: ChartDataSets[] = [{ data: [0] },
  { data: [0] },
    { data: [0] }];




  //barchart10

  public barChartOptions10: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels10: Label[] = ['Employee Count by Job Family'];

  public barChartType10: ChartType = 'bar';
  public barChartLegend10 = true;
  public barChartPlugins10 = [pluginDataLabels];

  //public barChartData: ChartDataSets[]=[];


  public barChartData10: ChartDataSets[] = [{ data: [0] },
  { data: [0] },
  { data: [0] }];



  //barchart9

  public barChartOptions11: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels11: Label[] = ['Employee Count by Category'];

  public barChartType11: ChartType = 'bar';
  public barChartLegend11 = true;
  public barChartPlugins11 = [pluginDataLabels];

  //public barChartData: ChartDataSets[]=[];


  public barChartData11: ChartDataSets[] = [{ data: [0] },
  { data: [0] },
  { data: [0] }];




  //polar chart1 for emp release count

  public polarAreaChartLabels: Label[] = ['Next 7 Days', 'Next 30 Days', 'Next 90 Days', 'Next 180 Days', 'Next 270 Days','Next 365 Days'];
  public polarAreaChartData: SingleDataSet =[0,0,0,0,0,0];
  public polarAreaLegend = true;
  public polarAreaChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
    }
  };
 
  public polarAreaChartType: ChartType = 'polarArea';





  //polar chart1 for project completion count

  public polarAreaChartLabels1: Label[] = ['Next 7 Days', 'Next 30 Days', 'Next 90 Days', 'Next 180 Days', 'Next 270 Days', 'Next 365 Days'];
  public polarAreaChartData1: SingleDataSet = [0, 0, 0, 0, 0, 0];
  public polarAreaLegend1 = true;
  public polarAreaChartOptions1: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
    }
  };
  public polarAreaChartColors1 = [
    {
      backgroundColor: ['#FF0000', '#FF5700', '#FF9E00', '#F7FF00', '#8DFF00', '#49ad53'],
    },
  ];
  public polarAreaChartType1: ChartType = 'polarArea';





  //doughnut chart of employees billable and poll @chart1
  public doughnutChartLabels: Label[] = ['Employees Billable', 'Employees Pool'];
  public doughnutChartData: MultiDataSet = [
    [0, 0, 0]
    
  ];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartColors = [
    {
      backgroundColor: ['rgba(227,23,62)', 'rgba(0,66,128)'],
    },
  ];




  //doughnut chart of customers and Projects @chart2
  public doughnutChartLabels2: Label[] = ['Customers', 'Projects'];
  public doughnutChartData2: MultiDataSet = [
    [0, 0, 0]

  ];
  public doughnutChartType2: ChartType = 'doughnut';
  public doughnutChartColors2 = [
    {
      backgroundColor: ['rgba(52,152,219,0.6)','#3498db'],
    },
  ];
 
public doughnutChartOptions: ChartOptions = {
  responsive: true,
  legend: {
    position: "top"
  },
 
  plugins: {
    datalabels: {
      color: "white",
      font: {
        size: 15,
        weight:"bold",
      }
    },

  }, 
};











  constructor(private homeservice: HomeService,private dialogService: DialogService) { }

  ngOnInit() {


    this.homeservice.getChartData().subscribe((data: object) => {
      this.objChartData = data;
      if (!this.objChartData.status) {
        this.dialogService.openAlertDialog(this.objChartData.exception.Message);
        //console.log(this.objChartData.exception);
      }

      else {

        this.empcount = this.objChartData.data.counts.emp_count;
        this.deliveryCount = this.objChartData.data.counts.delivery_count;
        this.empBenchcount = this.objChartData.data.counts.emp_bench_count;
        this.empProjcount = this.objChartData.data.counts.emp_prj_count;
        this.projcount = this.objChartData.data.counts.prj_count;
        this.custcount = this.objChartData.data.counts.cus_count;
        this.availableRes = this.objChartData.data.counts.pool_count;
        this.rrfOpen = this.objChartData.data.counts.rrf_open;
        this.rrfClosed = this.objChartData.data.counts.rrf_closed;
        this.rrfWIP = this.objChartData.data.counts.rrf_pending;

        //console.log(this.empProjcount + 'count');
        this.val[0] = this.empProjcount;
        this.val[1] = this.empBenchcount;

        this.doughnutChartData = [[this.empProjcount, this.empBenchcount]];
        this.doughnutChartData2 = [[this.custcount, this.projcount]];


        //for loops to pass data to employees in each project bar chart
        for (let i = 0; i < this.objChartData.data.empProject.length; i++) {
          this.t1[i] = { data: [], label: this.objChartData.data.empProject[i].project_Name };
        }
        for (let i = 0; i < this.objChartData.data.empProject.length; i++) {
          this.t1[i].data = [this.objChartData.data.empProject[i].empCount];
        }
        this.barChartData2 = this.t1 as any;


        //below code is to pass data for emp release and project release polar charts
        this.polarAreaChartData = [this.objChartData.data.releasecount.emp_7, this.objChartData.data.releasecount.emp_30, this.objChartData.data.releasecount.emp_90, this.objChartData.data.releasecount.emp_180, this.objChartData.data.releasecount.emp_270, this.objChartData.data.releasecount.emp_365];
        this.polarAreaChartData1 = [this.objChartData.data.releasecount.proj_7, this.objChartData.data.releasecount.proj_30, this.objChartData.data.releasecount.proj_90, this.objChartData.data.releasecount.proj_180, this.objChartData.data.releasecount.proj_270, this.objChartData.data.releasecount.proj_365];
        this.b3 = [
          { data: [this.objChartData.data.releasecount.emp_7], label: 'Next 7 Days' },
          { data: [this.objChartData.data.releasecount.emp_30], label: 'Next 30 Days' },
          { data: [this.objChartData.data.releasecount.emp_90], label: 'Next 90 Days' },
          { data: [this.objChartData.data.releasecount.emp_180], label: 'Next 180 Days' },
          { data: [this.objChartData.data.releasecount.emp_270], label: 'Next 270 Days' },
          { data: [this.objChartData.data.releasecount.emp_365], label: 'Next 365 Days' },
        ];
        this.barChartData3 = this.b3 as any;
        this.b4 = [
          { data: [this.objChartData.data.releasecount.proj_7], label: 'Next 7 Days' },
          { data: [this.objChartData.data.releasecount.proj_30], label: 'Next 30 Days' },
          { data: [this.objChartData.data.releasecount.proj_90], label: 'Next 90 Days' },
          { data: [this.objChartData.data.releasecount.proj_180], label: 'Next 180 Days' },
          { data: [this.objChartData.data.releasecount.proj_270], label: 'Next 270 Days' },
          { data: [this.objChartData.data.releasecount.proj_365], label: 'Next 365 Days' },
        ];
        this.barChartData4 = this.b4 as any;


        //below code is to pass data for employee joined in each month bar chart
        for (let i = 0; i < this.objChartData.data.empJoiningDetails.length; i++) {
          this.b5[i] = { data: [], label: this.objChartData.data.empJoiningDetails[i].joined_month };
        }
        for (let i = 0; i < this.objChartData.data.empJoiningDetails.length; i++) {
          this.b5[i].data = [this.objChartData.data.empJoiningDetails[i].empcount];
        }
        this.barChartData5 = this.b5 as any;


        for (let i = 0; i < this.objChartData.data.empJoiningDetailsC.length; i++) {
          this.b6[i] = { data: [], label: this.objChartData.data.empJoiningDetailsC[i].joined_month };
        }
        for (let i = 0; i < this.objChartData.data.empJoiningDetailsC.length; i++) {
          this.b6[i].data = [this.objChartData.data.empJoiningDetailsC[i].empcount];
        }
        this.barChartData6 = this.b6 as any;

        
        for (let i = 0; i < this.objChartData.data.empExitCount.length; i++) {
          this.b7[i] = { data: [], label: this.objChartData.data.empExitCount[i].monthYear };
        }
        for (let i = 0; i < this.objChartData.data.empExitCount.length; i++) {
          this.b7[i].data = [this.objChartData.data.empExitCount[i].exitCount];
        }
        this.barChartData7 = this.b7 as any;

        console.log(this.objChartData.data.empEDGECount[0]);
        for (let i = 0; i < this.objChartData.data.empEDGECount.length; i++) {
          this.b8[i] = { data: [], label: this.objChartData.data.empEDGECount[i].description };
        }
        for (let i = 0; i < this.objChartData.data.empEDGECount.length; i++) {
          this.b8[i].data = [this.objChartData.data.empEDGECount[i].count];
        }
        this.barChartData8 = this.b8 as any;

        for (let i = 0; i < this.objChartData.data.empCOECount.length; i++) {
          this.b9[i] = { data: [], label: this.objChartData.data.empCOECount[i].description };
        }
        for (let i = 0; i < this.objChartData.data.empCOECount.length; i++) {
          this.b9[i].data = [this.objChartData.data.empCOECount[i].count];
        }
        this.barChartData9 = this.b9 as any;



        for (let i = 0; i < this.objChartData.data.jobCategoryCount.length; i++) {
          this.b10[i] = { data: [], label: this.objChartData.data.jobCategoryCount[i].description };
        }
        for (let i = 0; i < this.objChartData.data.jobCategoryCount.length; i++) {
          this.b10[i].data = [this.objChartData.data.jobCategoryCount[i].count];
        }
        this.barChartData10 = this.b10 as any;

        for (let i = 0; i < this.objChartData.data.categoriesCount.length; i++) {
          this.b11[i] = { data: [], label: this.objChartData.data.categoriesCount[i].description };
        }
        for (let i = 0; i < this.objChartData.data.categoriesCount.length; i++) {
          this.b11[i].data = [this.objChartData.data.categoriesCount[i].count];
        }
        this.barChartData11 = this.b11 as any;


      }

    });


  }



  










}


