 import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { ReportService } from '../services/reportservice';
import { ReportsEPMAttribute } from '../models/ReportsEPMAttribute';
import { MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AssignProjectService } from '../Services/AssignProjectService';
import { EmpassignDropAttribute } from '../models/empassignDropAttribute';
import { projectnameAssigndrop } from '../models/projectnameAssigndrop ';
import { ExcelService } from '../services/ExcelExport';
import { UploadComponent } from '../upload/upload.component';
import { EmpProjMngtEditPopupComponent } from './emp-proj-mngt-edit-popup/emp-proj-mngt-edit-popup.component';
import { UserService } from '../services/UserService';
import { UserRole } from '../models/UserRole';
import { DialogService } from '../services/dialog.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MyDateAdapter } from '../shared/myDateAdapter';
import { EdgePractice } from '../models/EdgePractice';
import { EmployeeService } from '../services/EmployeeService';
import { CoeDescription } from '../models/CoeDescription';
import { Observable } from 'rxjs';
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
  selector: 'app-emp-proj-management',
  templateUrl: './emp-proj-management.component.html',
  styleUrls: ['./emp-proj-management.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EmpProjManagementComponent implements OnInit {

  constructor(public datepipe: DatePipe, private reportService: ReportService, private userService: UserService,
    private employeeService: EmployeeService,private assignProjectService: AssignProjectService, private excelService: ExcelService, private dialog: MatDialog, private dialogService: DialogService) { }
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

  result: any;
  res: any;
  userRole: string;
  edge: EdgePractice[];
  coe: CoeDescription[];
  pmNames: string[];
  pmNames2: string[];
  noData: boolean;
  data1:any;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit() {
    this.LoadPMNames();
    this.LoadEdgePracticeDescription();
    this.LoadGetAllCoeDescription();
    this.epmForm = new FormGroup({
      emp_Id: new FormControl('', [Validators.maxLength(10)]),
      emp_Name: new FormControl('', [Validators.maxLength(100)]),
      project_Name: new FormControl('', [Validators.maxLength(100)]),
      project_Manager_Employee_Id: new FormControl('', ),
      project_Manager_Emp_Name: new FormControl('', ),
      coe: new FormControl('', [Validators.maxLength(100)]),
      edgePractice: new FormControl('', [Validators.maxLength(100)]),
      assign_Project_StartDate: new FormControl(''),
      assign_Project_EndDate: new FormControl(''),
      billable: new FormControl(''),
      billing_Percentage: new FormControl('', [Validators.maxLength(100)]),
      location: new FormControl('', [Validators.maxLength(10)]),
      onsite: new FormControl(''),
    });



    //get usertype into local variable
        this.userRole = sessionStorage.getItem("userType");
        

     
   

    this.LoadEmpDrop();

    
    

  }



  //to generate search query and pass it to context
  m_epmSearchQuery() {


    this.v_epmSearchQuery = 'SELECT * FROM view_getepmdetails';
    
    this.obj_epm = Object.assign({}, this.epmForm.value);
    this.obj_epm.assign_Project_StartDate = this.datepipe.transform(this.obj_epm.assign_Project_StartDate, 'yyyy-MM-dd');
    this.obj_epm.assign_Project_EndDate = this.datepipe.transform(this.obj_epm.assign_Project_EndDate, 'yyyy-MM-dd');


    if (this.obj_epm.emp_Id || this.obj_epm.emp_Name || this.obj_epm.project_Name ||
      this.obj_epm.assign_Project_StartDate || this.obj_epm.assign_Project_EndDate || this.obj_epm.billable
      || this.obj_epm.billing_Percentage || this.obj_epm.location || this.obj_epm.onsite || this.obj_epm.coe || this.obj_epm.edgePractice || this.obj_epm.project_Manager_Employee_Id
      || this.obj_epm.project_Manager_Emp_Name) {
      this.v_epmSearchQuery = this.v_epmSearchQuery.concat(' where');
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
    if (this.obj_epm.project_Manager_Employee_Id) {
      if (this.v_epmSearchQuery.length > 54) {
        this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" or ")
      }
      this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" Mngr_Emp_Id like '%" + this.obj_epm.project_Manager_Employee_Id.trim() + "%' ");
    }
    if (this.obj_epm.project_Manager_Emp_Name) {
      if (this.v_epmSearchQuery.length > 54) {
        this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" or ")
      }
      this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" Mngr_Emp_Name like '%" + this.obj_epm.project_Manager_Emp_Name.trim() + "%' ");
    }

    if (this.obj_epm.coe) {
      if (this.v_epmSearchQuery.length > 54) {
        this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" or ")
      }
      this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" Coe like '%" + this.obj_epm.coe.trim() + "%' ");
    }
    if (this.obj_epm.edgePractice) {
      if (this.v_epmSearchQuery.length > 54) {
        this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" or ")
      }
      this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" Edge_Practice_Description like '%" + this.obj_epm.edgePractice.trim() + "%' ");
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


   // console.log(this.v_epmSearchQuery);
    //passing generated search query to get the required records

    //this.v_epmSearchQuery = 'SELECT * FROM pact_rmg.view_getepmdetails';
    this.reportService.getAllEPMDetails(this.v_epmSearchQuery).subscribe((data: object) => {
      this.result = data;
      if (!this.result.status) {
        this.dialogService.openAlertDialog(this.result.exception.Message);
        //console.log(this.result.exception);
      }
      else {
        this.noData = false;
        this.data_Source = new MatTableDataSource<ReportsEPMAttribute>(this.result.data);
        if (this.data_Source.filteredData.length) {
          this.noData = true;
        }
        this.vload = 0;
        this.data_Source.sort = this.sort;
        this.data_Source.paginator = this.paginator;
        this.v_searchbar = false;
        this.list_EPM = this.result.data;
      }
    });

  }
  //to get all the records in table
  LoadEmpProjManage() {
 
    //this.v_epmSearchQuery = 'SELECT * FROM pact_rmg.view_getepmdetails';
    //this.reportService.getAllEPMDetails(this.v_epmSearchQuery).subscribe((data: object) => {
    //  this.result = data;

    //  if (!this.result.status) {
    //    this.dialogService.openAlertDialog('Something went wrong! Please try again.');
    //    //console.log(this.result.exception);
    //  }
    //  else {
    //    this.data_Source = new MatTableDataSource<ReportsEPMAttribute>(this.result.data);
    //    this.vload = 0;
    //    this.data_Source.sort = this.sort;
    //    this.data_Source.paginator = this.paginator;
    //    this.v_searchbar = false;
    //    this.list_EPM = this.result.data;
    //  }
    //});

    this.m_epmSearchQuery();


  }

  filter(value: string) {
    this.pmNames2 = this.pmNames;
 
    this.pmNames2 = this.pmNames.filter(data => data.toLowerCase().includes(value));
  }

  //to hide the search bar
  m_searchbar() {
    this.v_searchbar = !this.v_searchbar;
  }
  //employee dropdown
  LoadEmpDrop() {
    this.assignProjectService.getempdrop().subscribe((data: EmpassignDropAttribute[]) => { this.empdroplist = data; });
  }

  LoadEdgePracticeDescription() {
    this.employeeService.GetAllEdgePractice()
      .subscribe((data: EdgePractice[]) => {
        this.edge = data;
      })
  }
  //To get the dropdown for COE
  LoadGetAllCoeDescription() {
    this.employeeService.GetAllCoeDescription()
      .subscribe((data: CoeDescription[]) => {
        this.coe = data;
      })
  }
  LoadPMNames() {
    this.reportService.loadPMNames()
      .subscribe((data: object) => {
        this.data1 = data;
        this.pmNames = this.data1.data;
        this.pmNames2 = this.data1.data;
      })
  }

  //LoadProjectsDrop() {
  //  this.assignProjectService.GetProjectDropdown().subscribe((data: projectnameAssigndrop[]) => { this.projectdroplist = data; });
  //}

  //exportAsXLSX(): void {
  //  this.excelService.exportAsExcelFile(this.list_EPM, 'EmployeeProjectMngmt');
  //}


  //method to open edit popup
  editPopup(row) {
    this.reportService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EmpProjMngtEditPopupComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result = !null) {
        this.LoadEmpProjManage();
      }
    });
  }


  //export method
  exportAsXLSX(): void {

    var excelData = [];

    for (let data of this.list_EPM) { //this.list_EPM is the object taken from Loadallemployees method

      excelData.push({

        'Employee Id': data.emp_Id,

        'Employee Name': data.emp_Name,

        'Project Name': data.project_Name,

        'Project Code': data.project_Code,

        'EDGE Practice': data.edgePractice,

        'COE': data.coe,

        'Assign Project StartDate': data.assign_Project_StartDate,

        'Assign Project EndDate': data.assign_Project_EndDate,

        'Billable': data.billable,

        'Billing Percentage': data.billing_Percentage,

        'project Manager Employee Id': data.project_Manager_Employee_Id,

        'project Manager Email Id': data.project_Manager_Emp_Name,

        'Location': data.location,

        'Onsite': data.onsite,

       

      })

    }

    this.excelService.exportAsExcelFile(excelData, 'list_EPM')

  }

  displayedColumns: string[] = ['edit', 'emp_Id', 'emp_Name', 'project_Name', 'project_Code','coe','edgePractice','project_Manager_Employee_Id','project_Manager_Email_Id','assign_Project_StartDate', 'assign_Project_EndDate', 'billable', 'billing_Percentage', 'location', 'onsite'];

  openImport() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(UploadComponent, dialogConfig);
  }
  //reset the search form
  OnResetSearch()
  {
    this.epmForm.reset();
  }

  }
