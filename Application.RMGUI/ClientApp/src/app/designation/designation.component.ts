import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../services/AdminConfigService';
import { EdgePracAtt } from '../models/EdgePracAtt';
import { MatTableDataSource, MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { ExcelService } from '../services/ExcelExport';
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { DesignAtt } from '../models/DesingAtt';
import { UploadComponent } from '../upload/upload.component';
import { AddpopupdesignationComponent } from './addpopupdesignation/addpopupdesignation.component';
import { EditdesignationpopupComponent } from './editdesignationpopup/editdesignationpopup.component';
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
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class DesignationComponent implements OnInit {

  public desgform: FormGroup;
  v_searchbar = true;
  s_desg: DesignAtt;
  load = 1;
  data_Source = new MatTableDataSource<DesignAtt>();
  desgStaus: '';
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  designation: MatTableDataSource<DesignAtt>;
  //desg: DesignAtt[];
  DESG: DesignAtt[];
  desg: any;

  prefix: string;


  constructor(private adminservice: AdminService, private excelService: ExcelService, public datepipe: DatePipe, private dialog: MatDialog, public dialogService: DialogService) { }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit() {
    //this.LoadDesignation();
    this.desgform = new FormGroup({
      //Project_ID: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      designation: new FormControl(''),
      designCode: new FormControl(''),
      designStatus: new FormControl('', ),
      designStartDate: new FormControl('', ),
      designEndDate: new FormControl('', ),
    });

  }
  openDialog() {
    this.adminservice.InitializeFormdesg();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "40%";
    dialogConfig.autoFocus = false;
    this.dialog.open(AddpopupdesignationComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result = !null) {
        this.LoadDesignation()
      }
    });
  }
  onEdit(row) {
    this.adminservice.populateFormdesg(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(EditdesignationpopupComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result = !null) {
        this.LoadDesignation()
      }
    });
  }
  public hasError = (controlName: string, errorName: string) => {

    return this.desgform.controls[controlName].hasError(errorName);

  }
  ngAfterViewInit() {
    this.data_Source.paginator = this.paginator;
  }
  m_searchbar() {
    this.v_searchbar = !this.v_searchbar;
  }
  searchQuery() {

    this.prefix = 'select * from view_getalldesignation';

    this.s_desg = Object.assign({}, this.desgform.value);

    this.s_desg.designStartDate = this.datepipe.transform(this.s_desg.designStartDate, 'yyyy-MM-dd');
    this.s_desg.designEndDate = this.datepipe.transform(this.s_desg.designEndDate, 'yyyy-MM-dd');

    console.log(this.s_desg.designStartDate);
    console.log(this.prefix.length + ":length");
    console.log(this.s_desg);


    //code to add where to prefix
    if (this.s_desg.designation || this.s_desg.designStartDate || this.s_desg.designCode || this.s_desg.designEndDate) {
      this.prefix = this.prefix.concat(' where');
      console.log(this.prefix.length + ":length");
    }
    //code to add proj name to prefix
    if (this.s_desg.designation) {
      if (this.prefix.length > 52) {
        this.prefix = this.prefix.concat(" or ")
      }
      this.prefix = this.prefix.concat(" Design_Description like '%" + this.s_desg.designation.trim() + "%' ");
    }

    if (this.s_desg.designCode) {
      if (this.prefix.length > 52) {
        this.prefix = this.prefix.concat(" or ")
      }
      this.prefix = this.prefix.concat(" Designation_Code like '%" + this.s_desg.designCode.trim() + "%' ");
    }
    //code to add proj start date to prefix
    if (this.s_desg.designStartDate) {
      if (this.prefix.length > 52) {
        this.prefix = this.prefix.concat(" or ")
      }
      this.prefix = this.prefix.concat(" Design_StartDate like '%" + this.s_desg.designStartDate.trim() + "%' ")
    }
    //code to add proj end date to prefix
    if (this.s_desg.designEndDate) {
      if (this.prefix.length > 52) {
        this.prefix = this.prefix.concat(" or ")
      }
      this.prefix = this.prefix.concat(" Design_EndDate like '%" + this.s_desg.designEndDate.trim() + "%' ")
    }
    console.log(this.prefix);
    return this.adminservice.searchQuerydesignation(this.prefix).subscribe((data: DesignAtt[]) => {
      this.desg = data;
      if (!this.desg.status) {
        this.dialogService.openAlertDialog(this.desg.exception.Message);
      }
      this.data_Source = new MatTableDataSource<DesignAtt>(this.desg.data);
      //this.data_Source.data = this.desg;
      this.load = 0;
      this.data_Source.paginator = this.paginator;
      this.v_searchbar = false;
      this.DESG = this.desg.data;
    });
  }
  LoadDesignation() {
    this.adminservice.GetAllDesignation().subscribe((data: DesignAtt[]) => {
      this.desg = data;
      if (!this.desg.status) {
        this.dialogService.openAlertDialog(this.desg.exception.Message);
      }
      this.data_Source = new MatTableDataSource<DesignAtt>(this.desg.data);
      this.data_Source.sort = this.sort;
      this.designation.paginator = this.paginator;
    });
  }
 
  exportAsXLSX(): void {
    var excelData = [];
    for (let data of this.DESG) {
      excelData.push({
        'Designation': data.designation,
        'Status': data.designStatus,
        'Start Date': data.designStartDate,
        'End Date': data.designEndDate

      })

    }

    this.excelService.exportAsExcelFile(excelData, 'Edge Practises');

  }

  displayedColumns: string[] = ['edit', 'designation', 'designCode','designStatus', 'designStartDate', 'designEndDate'];

  selection = new SelectionModel<DesignAtt>(true, []);

  openImport() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(UploadComponent, dialogConfig);
  }

  OnResetSearch()
  {
    this.desgform.reset();
  }
}
