import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartAtt } from '../models/DepartAtt';
import { AdminService } from '../services/AdminConfigService';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { ExcelService } from '../services/ExcelExport';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { UploadComponent } from '../upload/upload.component';
import { AddpopupdepartmentComponent } from './addpopupdepartment/addpopupdepartment.component';
import { EditdepartmentpopupComponent } from './editdepartmentpopup/editdepartmentpopup.component';
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
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class DepartmentComponent implements OnInit {

  public deptform: FormGroup;
  v_searchbar = true;
  s_dept: DepartAtt;
  deptstatus = '';
  load = 1;
  data_Source = new MatTableDataSource<DepartAtt>();
  edgeStaus: '';
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  dept: MatTableDataSource<DepartAtt>;
  //depart: DepartAtt[];
  DEPT: DepartAtt[];
  depart: any;
  prefix: string;
  constructor(private adminservice: AdminService, private dialogService: DialogService, private excelService: ExcelService, public datepipe: DatePipe, private dialog: MatDialog) { }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit() {
   // this.LoadDepartment();
    this.deptform = new FormGroup({
      department: new FormControl(''),
      departmentCode: new FormControl(''),
      deptStatus: new FormControl('', ),
      depStartDate: new FormControl('', ),
      depEndDate: new FormControl('', ),
    });

  }
  public hasError = (controlName: string, errorName: string) => {
    return this.deptform.controls[controlName].hasError(errorName);

  }
  openDialog() {
    this.adminservice.InitializeFormdept();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "40%";
    dialogConfig.autoFocus =false;
    this.dialog.open(AddpopupdepartmentComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result = !null) {
        this.LoadDepartment()
      }
    });
  }
  onEdit(row) {
    this.adminservice.populateFormdept(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(EditdepartmentpopupComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result = !null) {
        this.LoadDepartment()
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

    this.prefix = 'select * from view_getalldepartment';

    this.s_dept = Object.assign({}, this.deptform.value);

    this.s_dept.depStartDate = this.datepipe.transform(this.s_dept.depStartDate, 'yyyy-MM-dd');
    this.s_dept.depEndDate = this.datepipe.transform(this.s_dept.depEndDate, 'yyyy-MM-dd');



    //code to add where to prefix
    if (this.s_dept.department || this.s_dept.departmentCode || this.s_dept.depStartDate || this.s_dept.depEndDate) {
      this.prefix = this.prefix.concat(' where');
    }
    //code to add proj name to prefix
    if (this.s_dept.department) {
      if (this.prefix.length > 50) {
        this.prefix = this.prefix.concat(" or ")
      }
      this.prefix = this.prefix.concat(" Department_Description like '%" + this.s_dept.department.trim() + "%' ");
    }

    if (this.s_dept.departmentCode) {
      if (this.prefix.length > 50) {
        this.prefix = this.prefix.concat(" or ")
      }
      this.prefix = this.prefix.concat(" Department_Code like '%" + this.s_dept.departmentCode.trim() + "%' ");
    }
    //code to add proj start date to prefix
    if (this.s_dept.depStartDate) {
      if (this.prefix.length > 50) {
        this.prefix = this.prefix.concat(" or ")
      }
      this.prefix = this.prefix.concat(" Department_StartDate like '%" + this.s_dept.depStartDate.trim() + "%' ")
    }
    //code to add proj end date to prefix
    if (this.s_dept.depEndDate) {
      if (this.prefix.length > 50) {
        this.prefix = this.prefix.concat(" or ")
      }
      this.prefix = this.prefix.concat(" Department_EndDate like '%" + this.s_dept.depEndDate.trim() + "%' ")
    }
    return this.adminservice.searchQuerydept(this.prefix).subscribe((data: DepartAtt[]) => {
      this.depart = data;
      if (!this.depart.status) {
        this.dialogService.openAlertDialog('Something went wrong! Please try again.');
      }
      this.data_Source = new MatTableDataSource<DepartAtt>(this.depart.data);
      //this.data_Source.data = this.depart;
      this.load = 0;
      this.data_Source.paginator = this.paginator;
      this.v_searchbar = false;
      this.DEPT = this.depart.data;
    });
  }
  LoadDepartment() {
    this.adminservice.GetAllDepartment().subscribe((data: DepartAtt[]) => {
      this.depart = data;
      if (!this.depart.status) {
        this.dialogService.openAlertDialog(this.depart.exception.Message);
      }
      this.data_Source = new MatTableDataSource<DepartAtt>(this.depart.data);
      this.data_Source.sort = this.sort;
      this.data_Source.paginator = this.paginator;
      this.DEPT = this.depart.data;
    });
  }
 
  exportAsXLSX(): void {
    //this.excelService.exportAsExcelFile(this.BG, 'Business Group');
    var excelData = [];
    for (let data of this.DEPT) {
      excelData.push({
        'Department': data.department,
        'Status': data.deptStatus,
        'Start Date': data.depStartDate,
        'End Date': data.depEndDate

      })

    }

    this.excelService.exportAsExcelFile(excelData, 'Departments');

  }


  displayedColumns: string[] = ['edit', 'department', 'deptCode','deptStatus', 'depStartDate', 'depEndDate'];

  selection = new SelectionModel<DepartAtt>(true, []);

  openImport() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(UploadComponent, dialogConfig);
  }

  OnResetSearch()
  {
    this.deptform.reset();
  }
}
