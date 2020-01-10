import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { ReportService } from '../../services/reportservice';
import { ReportsEPMAttribute } from '../../models/ReportsEPMAttribute';
import { MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AssignProjectService } from '../../Services/AssignProjectService';
import { EmpassignDropAttribute } from '../../models/empassignDropAttribute';
import { projectnameAssigndrop } from '../../models/projectnameAssigndrop ';
import { ExcelService } from '../../services/ExcelExport';
import { UploadComponent } from '../../upload/upload.component';
import { EmpProjMngtEditPopupComponent } from '../emp-proj-mngt-edit-popup/emp-proj-mngt-edit-popup.component';
import { UserService } from '../../services/UserService';
import { UserRole } from '../../models/UserRole';
import { DialogService } from '../../services/dialog.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MyDateAdapter } from '../../shared/myDateAdapter';
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
  selector: 'app-emp-proj-mngt-info',
  templateUrl: './emp-proj-mngt-info.component.html',
  styleUrls: ['./emp-proj-mngt-info.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EmpProjMngtInfoComponent implements OnInit {

  constructor(public datepipe: DatePipe, private reportService: ReportService, private userService: UserService, private assignProjectService: AssignProjectService, private excelService: ExcelService, private dialog: MatDialog, private dialogService: DialogService) { }
  public epmForm: FormGroup;
  vload = 1;
  v_searchbar = true;
  list_EPM: ReportsEPMAttribute[];
  empdroplist: EmpassignDropAttribute[];
  projectdroplist: projectnameAssigndrop[];
  data_Source: MatTableDataSource<ReportsEPMAttribute>;
  v_epmSearchQuery: string;
  obj_epm: ReportsEPMAttribute;
  utype: UserRole;
  v_type: string;
  userRole: string;
  result: any;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit() {
    

    this.epmForm = new FormGroup({
      emp_Id: new FormControl('', [Validators.maxLength(10)]),
      emp_Name: new FormControl('', [Validators.maxLength(30)]),
      project_Name: new FormControl('', [Validators.maxLength(30)]),
      assign_Project_StartDate: new FormControl(''),
      assign_Project_EndDate: new FormControl(''),
      billable: new FormControl(''),
      billing_Percentage: new FormControl('', [Validators.maxLength(100)]),
      location: new FormControl('', [Validators.maxLength(10)]),
      onsite: new FormControl(''),
    });



    //userRole
    
    this.userRole = sessionStorage.getItem("userType");
        //console.log(this.userRole);

   

    this.LoadEmpDrop();
    

  }

  //to get filtered records from db by applying filters from frontend
  m_epmSearchQuery() {


    this.v_epmSearchQuery = 'SELECT * FROM view_getepmdetails';

    this.obj_epm = Object.assign({}, this.epmForm.value);
    this.obj_epm.assign_Project_StartDate = this.datepipe.transform(this.obj_epm.assign_Project_StartDate, 'yyyy-MM-dd');
    this.obj_epm.assign_Project_EndDate = this.datepipe.transform(this.obj_epm.assign_Project_EndDate, 'yyyy-MM-dd');


    if (this.obj_epm.emp_Id || this.obj_epm.emp_Name || this.obj_epm.project_Name ||
      this.obj_epm.assign_Project_StartDate || this.obj_epm.assign_Project_EndDate || this.obj_epm.billable
      || this.obj_epm.billing_Percentage || this.obj_epm.location || this.obj_epm.onsite) {
      this.v_epmSearchQuery = this.v_epmSearchQuery.concat(' where');
      console.log(this.v_epmSearchQuery.length)
    }
    if (this.obj_epm.emp_Id) {
      if (this.v_epmSearchQuery.length > 54) {
        this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" or ")
      }
      this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" emp_Id like '%" + this.obj_epm.emp_Id.trim() + "%' ");
    }
    if (this.obj_epm.emp_Name) {
      if (this.v_epmSearchQuery.length > 54) {
        this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" or ")
      }
      this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" emp_Name like '%" + this.obj_epm.emp_Name.trim() + "%' ");
    }
    if (this.obj_epm.project_Name) {
      if (this.v_epmSearchQuery.length > 54) {
        this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" or ")
      }
      this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" project_Name like '%" + this.obj_epm.project_Name.trim() + "%' ");
    }
    if (this.obj_epm.assign_Project_StartDate) {
      if (this.v_epmSearchQuery.length > 54) {
        this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" or ")
      }
      this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" Assign_Project_StartDate like '%" + this.obj_epm.assign_Project_StartDate.trim() + "%' ");
    }
    if (this.obj_epm.assign_Project_EndDate) {
      if (this.v_epmSearchQuery.length > 54) {
        this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" or ")
      }
      this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" Assign_Project_EndDate like '%" + this.obj_epm.assign_Project_EndDate.trim() + "%' ");
    }
    if (this.obj_epm.billable) {
      if (this.v_epmSearchQuery.length > 54) {
        this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" or ")
      }
      this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" Billable like '%" + this.obj_epm.billable.trim() + "%' ");
    }
    if (this.obj_epm.billing_Percentage) {
      if (this.v_epmSearchQuery.length > 54) {
        this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" or ")
      }
      this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" Billing_Percentage like '%" + this.obj_epm.billing_Percentage.trim() + "%' ");
    }
    if (this.obj_epm.location) {
      if (this.v_epmSearchQuery.length > 54) {
        this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" or ")
      }
      this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" Location like '%" + this.obj_epm.location.trim() + "%' ");
    }
    if (this.obj_epm.onsite) {
      if (this.v_epmSearchQuery.length > 54) {
        this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" or ")
      }
      this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" Onsite like '%" + this.obj_epm.onsite.trim() + "%' ");
    }


    //console.log(this.v_epmSearchQuery);
    //passing the generated search query as a parameter
    this.reportService.getAllEPMDetails(this.v_epmSearchQuery).subscribe((data: object) => {
      this.result = data;

      if (!this.result.status) {
        this.dialogService.openAlertDialog(this.result.exception.Message);
        //console.log(this.result.exception);
      }
      else {
        this.data_Source = new MatTableDataSource<ReportsEPMAttribute>(this.result.data);
        this.vload = 0;
        this.data_Source.sort = this.sort;
        this.data_Source.paginator = this.paginator;
        this.v_searchbar = false;
     //   this.list_EPM = this.result.data;
      }
    });

  }
  //to get all the records in the table
  //LoadEmpProjManage() {
  //  this.reportService.getAllEPM()
  //    .subscribe((data: ReportsEPMAttribute[]) => {
  //      this.list_EPM = data;
  //      this.data_Source = new MatTableDataSource<ReportsEPMAttribute>(this.list_EPM);
  //      this.data_Source.data = this.list_EPM;
  //      this.data_Source.sort = this.sort;
  //      this.data_Source.paginator = this.paginator;
  //    });
  //}

  //to hide search bar
  m_searchbar() {
    this.v_searchbar = !this.v_searchbar;
  }
  //to get employee dropdown
  LoadEmpDrop() {
    this.assignProjectService.getempdrop().subscribe((data: EmpassignDropAttribute[]) => { this.empdroplist = data; });
  }



  
 


  //export functionality
  exportAsXLSX(): void {

    var excelData = [];

    for (let data of this.list_EPM) { //this.list_EPM is the object taken from Loadallemployees method

      excelData.push({

        'Employee Id': data.emp_Id,

        'Employee Name': data.emp_Name,

        'Project Name': data.project_Name,

        'Assign Project StartDate': data.assign_Project_StartDate,

        'Assign Project EndDate': data.assign_Project_EndDate,

        'Billable': data.billable,

        'Billing Percentage': data.billing_Percentage,

        'Location': data.location,

        'Onsite': data.onsite,



      })

    }

    this.excelService.exportAsExcelFile(excelData, 'list_EPM')

  }

  displayedColumns: string[] = ['emp_Id', 'emp_Name', 'project_Name','assign_Project_StartDate', 'assign_Project_EndDate', 'billable', 'billing_Percentage', 'location', 'onsite'];

  openImport() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(UploadComponent, dialogConfig);
  }
  //to reset the search form
  OnResetSearch() {
    this.epmForm.reset();
  }


}
