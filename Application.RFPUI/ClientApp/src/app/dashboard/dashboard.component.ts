import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color, MultiDataSet } from 'ng2-charts';
import { DashboardService } from './dashboard.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: "right"
    },
    plugins: {
      datalabels: {
        color: "white",
      }
    }
  };
  public pieChartLabels: Label[] =[]; // = ['Self Creation', 'Created by others'];
  public pieChartData: SingleDataSet = []; // = [12, 48];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [{ backgroundColor: ["#e84351", "#434a54", "#3ebf9b", "#4d86dc", "#f3af37"] }];

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      position: "right"
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 10
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public mbarChartLabels: string[] = ['Status'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartColors = [
    { backgroundColor: ["#e84351"] },
    { backgroundColor: ["#434a54"] },
    { backgroundColor: ["#3ebf9b"] },
    { backgroundColor: ["#4d86dc"] },
    { backgroundColor: ["#f3af37"] }
  ];
  public barChartData: any[] = [
    { data: [15], label: 'Initial Draft' },
    { data: [25], label: 'Initial Review' },
    { data: [40], label: 'Review Solution' },
    { data: [45], label: 'Proposal Review' },
    { data: [35], label: 'Delivery' },
  ];

  public chartType: ChartType = 'doughnut';
  public chartLabels: Label[] = ['Jan', 'Feb', 'Mar'];
  public chartData: MultiDataSet = [[1, 1, 1]];
  public chartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: "bottom",
      //labels: {
      //  fontColor: 'white'
      //}
    },
    plugins: {
      datalabels: {
        color: "white"
      }
    }
  };
  public chartColors: Array<any> = [{ backgroundColor: ["#e84351", "#434a54", "#3ebf9b", "#4d86dc", "#f3af37"] }];

  public lineChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Proposals Count' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: "right"
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          stepSize: 20
        }
      }]
    }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'lightgray',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  

  

  ngOnInit() {


    this.getChartData();

  }

  getChartData() {
    //this.dashboardService.getChartData().subscribe((response: any) => {
    //  if (response && response.result) {
    //    var chartData: any[] = response.result.data;
    //    var pieLabels = [];
    //    var pieData = [];
    //    //for (let i = 0; i <= chartData.length; i++) {
    //    for (let i = 0; i <= 5; i++) {
    //      pieLabels.push(chartData[i].userName.split('@', 1)[0]);
    //      pieData.push(chartData[i].proposalsCount);
    //    }

    //    this.pieChartLabels = pieLabels;
    //    this.pieChartData = pieData;
    //  }
    //});
    this.pieChartLabels = ['Aravind', 'Phani', 'Satya', 'Bhaskar', 'Rajesh'];
    this.pieChartData = [5, 12, 5, 8, 4];
  }

}
