import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../services/AdminConfigService';
import { EdgePracAtt } from '../models/EdgePracAtt';
import { MatTableDataSource, MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { ExcelService } from '../services/ExcelExport';
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { UploadComponent } from '../upload/upload.component';
import { AddpopupedgepracticeComponent } from './addpopupedgepractice/addpopupedgepractice.component';
import { EditedgepopupComponent } from './editedgepopup/editedgepopup.component';
import { MatSort } from '@angular/material/sort';
import { DialogService } from '../services/dialog.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MyDateAdapter } from '../shared/myDateAdapter';
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MMM-YYYY',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-edgepractice',
  templateUrl: './edgepractice.component.html',
  styleUrls: ['./edgepractice.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EdgepracticeComponent implements OnInit {
  public edgeform: FormGroup;
  v_searchbar= true;
  s_edge: EdgePracAtt;
  load = 1;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  data_Source = new MatTableDataSource<EdgePracAtt>();
  edgeStaus: '';
  edgePractice: MatTableDataSource<EdgePracAtt>;
  //edge: EdgePracAtt[];
  EDGE: EdgePracAtt[];
  edge: any; 
  prefix: string;
  
  constructor(private adminservice: AdminService, private excelService: ExcelService, private dialogService:DialogService, public datepipe: DatePipe, private dialog: MatDialog) { }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit() {
   // this.LoadEdgePractice();
    this.edgeform = new FormGroup({
      edgePractice: new FormControl('', ),
      epStatus: new FormControl('', ),
      epStartDate: new FormControl('', ),
      epEndDate: new FormControl('', ),
    });

  }
  public hasError = (controlName: string, errorName: string) => {
    return this.edgeform.controls[controlName].hasError(errorName);

  }
  openDialog() {
    this.adminservice.InitializeFormedge();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "40%";
    this.dialog.open(AddpopupedgepracticeComponent, dialogConfig).afterClosed().subscribe((result) => {
      if (result = !null) {
        this.LoadEdgePractice()
      }
    });;
  }
  onEdit(row) {
    this.adminservice.populateFormedge(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(EditedgepopupComponent, dialogConfig).afterClosed().subscribe((result) => {
      if (result = !null) {
        this.LoadEdgePractice()
      }
    });
  }
  ngAfterViewInit() {
    this.data_Source.paginator = this.paginator;
  }
  m_searchbar() {
    this.v_searchbar = !this.v_searchbar;
  }
  searchQuery() {

    this.prefix = 'select * from view_getalledgepractice';
 
    this.s_edge = Object.assign({}, this.edgeform.value);
    
    this.s_edge.epStartDate = this.datepipe.transform(this.s_edge.epStartDate, 'yyyy-MM-dd');
    this.s_edge.epEndDate = this.datepipe.transform(this.s_edge.epEndDate, 'yyyy-MM-dd');

    console.log(this.s_edge.epStartDate);
    console.log(this.prefix.length + ":length");
    console.log(this.s_edge);


    //code to add where to prefix
    if (this.s_edge.edgePractice || this.s_edge.epStatus || this.s_edge.epStartDate || this.s_edge.epEndDate) {
      this.prefix = this.prefix.concat(' where ');
      console.log(this.prefix.length + ":length");
    }
    //code to add proj name to prefix
    if (this.s_edge.edgePractice) {
      if (this.prefix.length > 54) {
        //this.prefix = this.prefix.concat(" or ");
      }
      this.prefix = this.prefix.concat(" Edge_Practice_Description like '%" + this.s_edge.edgePractice.trim() + "%' ");

    }
    //code to add proj start date to prefix
    if (this.s_edge.epStartDate) {
      if (this.prefix.length > 54) {
        this.prefix = this.prefix.concat(" or ");
      }
      this.prefix = this.prefix.concat(" Edge_Practice_StartDate like '%" + this.s_edge.epStartDate.trim() + "%' ");
     
    }
    //code to add proj end date to prefix
    if (this.s_edge.epEndDate) {
      if (this.prefix.length > 54) {
        this.prefix = this.prefix.concat(" or ");
      }
      this.prefix = this.prefix.concat(" Edge_Practice_EndDate like '%" + this.s_edge.epEndDate.trim() + "%' ");
    }
    return this.adminservice.searchQuery(this.prefix).subscribe((data: EdgePracAtt[]) => {
      this.edge = data;
      if (!this.edge.status) {
        this.dialogService.openAlertDialog(this.edge.exception.Message);
      }
      this.data_Source = new MatTableDataSource<EdgePracAtt>(this.edge.data);
     // this.data_Source.data = this.edge;
      this.load = 0;
      this.data_Source.paginator = this.paginator;
      this.data_Source.sort = this.sort;
      this.v_searchbar = false;
      this.EDGE = this.edge.data;
    });
  }
  LoadEdgePractice() {
    this.adminservice.GetAllEdgePractice().subscribe((data: EdgePracAtt[]) => {
      this.edge = data;
      if (!this.edge.status) {
        this.dialogService.openAlertDialog(this.edge.exception.Message);
      }
      this.data_Source = new MatTableDataSource<EdgePracAtt>(this.edge.data);
      this.data_Source.sort = this.sort;
      this.data_Source.paginator = this.paginator;
    });
  }

  exportAsXLSX(): void {
    var excelData = [];
    for (let data of this.EDGE) {
      excelData.push({
        'EDGE Practice': data.edgePractice,
        'Status': data.epStatus,
        'Start Date': data.epStartDate,
        'End Date': data.epEndDate

      })

    }

    this.excelService.exportAsExcelFile(excelData, 'Edge Practises');

  }

  displayedColumns: string[] = ['edit', 'edgePractice', 'epStatus', 'epStartDate', 'epEndDate'];

  selection = new SelectionModel<EdgePracAtt>(true, []);

  openImport() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(UploadComponent, dialogConfig);
  }

  OnResetSearch()
  {
    this.edgeform.reset();
  }
}

