import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../models/Employee';
import { EmployeeService } from '../services/EmployeeService';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ExcelService } from '../services/ExcelExport';
import { Designation } from '../models/Designation';
import { Department } from '../models/Department';
import { EdgePractice } from '../models/EdgePractice';
import { CoeDescription } from '../models/CoeDescription';
import { BaseLocation } from '../models/BaseLocation';
import { MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogService } from '../services/dialog.service';
import { DatePipe } from '@angular/common'
import { BusinessGroup } from '../models/BusinessGroup';
import { UploadComponent } from '../upload/upload.component';
import { EmployeeAddPopupComponent } from './employee-add-popup/employee-add-popup.component';
import { EmployeeEditPopupComponent } from './employee-edit-popup/employee-edit-popup.component';
import { UserService } from '../services/UserService';
import { UserRole } from '../models/UserRole';
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
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EmployeeComponent implements OnInit {
  emps: Employee[];//var
  //employee: Employee[] = [];//var
  employee: any;
  design: Designation[];//var
  dept: Department[];//var
  edge: EdgePractice[];//var
  coe: CoeDescription[];//var
  Location: BaseLocation[];//var
  businessgroup: BusinessGroup[];
  EditRowId: any = '';//var
  EmployeeForm: FormGroup;//var
  v_empSearchQuery: string;//var
  obj_emp: Employee;//var
  EMP: Employee[];
  v_searchbar = true;
  data_Source: MatTableDataSource<Employee>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  vload = 1;
  noData: boolean;
  utype: UserRole;
  v_type: string;
  disable: string;
  jobsDD: any[];
  catDD: any[];
  subCat: any[];
  v_DD1: any;
  v_DD2: any;
  v_DD3: any;

  constructor(private employeeService: EmployeeService, private userService: UserService,private excelService: ExcelService, private dialog: MatDialog, private dialogService: DialogService, public datepipe: DatePipe) { }

  ngOnInit() {
    this.EmployeeForm = new FormGroup({
      bg_id:new FormControl(''),
      emp_Id: new FormControl(''),
      emp_Name: new FormControl('', [Validators.pattern('[a-zA-Z, ]+$')]),
      designation_Id: new FormControl(''),
      department_Id:new FormControl(''),
      edge_Practice_Id: new FormControl(''),
      coe_Id: new FormControl(''),
      location_Id: new FormControl(''),
      location: new FormControl(''),
      joining_Date: new FormControl(''),
      contact_Number: new FormControl('', [Validators.pattern('[0-9]+$')]),
      email_Id: new FormControl(''),
      reporting_To: new FormControl(''),
      reporting_To_Email: new FormControl(''),
      flag_Status: new FormControl(''),
      job_Description: new FormControl(''),
      cat_Description: new FormControl(''),
      sub_Cat_Description : new FormControl(''),
    });
   // this.LoadEmployeeDetails();
    this.LoadDesignationDescription();
    this.LoadDepartmentDescription();
    this.LoadEdgePracticeDescription();
    this.LoadGetAllCoeDescription();
    this.LoadGetAllCity();
    this.LoadGetAllBusinessGroup();
    this.LoadJobFamily();
    this.LoadSubCategories();
    this.LoadCategories();

  }
  selection = new SelectionModel<Employee>(true, []);
  

  public hasError = (controlName: string, errorName: string) => { 
    return this.EmployeeForm.controls[controlName].hasError(errorName);
  }

  //method for search query
  m_employeeSearchQuery() {
    this.v_empSearchQuery = 'SELECT * FROM view_getallemployees';

    this.obj_emp = Object.assign({}, this.EmployeeForm.value);

    this.obj_emp.joining_Date = this.datepipe.transform(this.obj_emp.joining_Date, 'yyyy-MM-dd');
    console.log(this.v_empSearchQuery.length);
    //code to add where
    if (this.obj_emp.bg_id || this.obj_emp.emp_Id || this.obj_emp.emp_Name || this.obj_emp.designation_Id || this.obj_emp.contact_Number ||
      this.obj_emp.email_Id ||/* this.obj_emp.department_Id ||*/ this.obj_emp.edge_Practice_Id || this.obj_emp.coe_Id ||
      this.obj_emp.location || this.obj_emp.joining_Date || this.obj_emp.reporting_To || this.obj_emp.reporting_To_Email || this.obj_emp.job_Description
      || this.obj_emp.cat_Description || this.obj_emp.sub_Cat_Description) {
      this.v_empSearchQuery = this.v_empSearchQuery.concat(' where');
    }
    if (this.obj_emp.bg_id) {
      if (this.v_empSearchQuery.length > 49) {
        this.v_empSearchQuery = this.v_empSearchQuery.concat(" or ")
      }
      this.v_empSearchQuery = this.v_empSearchQuery.concat(" bg_desc like '%" + this.obj_emp.bg_id.trim() + "%' ");
    }
    if (this.obj_emp.emp_Id) {
      if (this.v_empSearchQuery.length > 49) {
        this.v_empSearchQuery = this.v_empSearchQuery.concat(" or ")
      }
      this.v_empSearchQuery = this.v_empSearchQuery.concat(" Emp_Id like '%" + this.obj_emp.emp_Id.trim() + "%' ");
    }
    if (this.obj_emp.emp_Name) {
      if (this.v_empSearchQuery.length > 49) {
        this.v_empSearchQuery = this.v_empSearchQuery.concat(" or ")
      }
      this.v_empSearchQuery = this.v_empSearchQuery.concat(" Emp_Name like '%" + this.obj_emp.emp_Name.trim() + "%' ");
    }
    if (this.obj_emp.designation_Id) {
      if (this.v_empSearchQuery.length > 49) {
        this.v_empSearchQuery = this.v_empSearchQuery.concat(" or ")
      }
      this.v_empSearchQuery = this.v_empSearchQuery.concat(" Design_Description like '%" + this.obj_emp.designation_Id.trim() + "%' ");
    }
    if (this.obj_emp.contact_Number) {
      if (this.v_empSearchQuery.length > 49) {
        this.v_empSearchQuery = this.v_empSearchQuery.concat(" or ")
      }
      this.v_empSearchQuery = this.v_empSearchQuery.concat(" Contact_Number like '%" + this.obj_emp.contact_Number.trim() + "%' ");
    }

    if (this.obj_emp.email_Id) {
      if (this.v_empSearchQuery.length > 49) {
        this.v_empSearchQuery = this.v_empSearchQuery.concat(" or ")
      }
      this.v_empSearchQuery = this.v_empSearchQuery.concat(" Email_Id like '%" + this.obj_emp.email_Id.trim() + "%' ");
    }
    if (this.obj_emp.department_Id) {
      if (this.v_empSearchQuery.length > 49) {
        this.v_empSearchQuery = this.v_empSearchQuery.concat(" or ")
      }
      this.v_empSearchQuery = this.v_empSearchQuery.concat(" Department_Description like '%" + this.obj_emp.department_Id.trim() + "%' ");
    }
    if (this.obj_emp.edge_Practice_Id) {
      if (this.v_empSearchQuery.length > 49) {
        this.v_empSearchQuery = this.v_empSearchQuery.concat(" or ")
      }
      this.v_empSearchQuery = this.v_empSearchQuery.concat(" Edge_Practice_Description like '%" + this.obj_emp.edge_Practice_Id.trim() + "%' ");
    }
    if (this.obj_emp.coe_Id) {
      if (this.v_empSearchQuery.length > 49) {
        this.v_empSearchQuery = this.v_empSearchQuery.concat(" or ")
      }
      this.v_empSearchQuery = this.v_empSearchQuery.concat(" Coe_Description like '%" + this.obj_emp.coe_Id.trim() + "%' ");
    }
    if (this.obj_emp.location) {
      if (this.v_empSearchQuery.length > 49) {
        this.v_empSearchQuery = this.v_empSearchQuery.concat(" or ")
      }
      this.v_empSearchQuery = this.v_empSearchQuery.concat(" City like '%" + this.obj_emp.location.trim() + "%' ");
    }
    if (this.obj_emp.joining_Date) {
      if (this.v_empSearchQuery.length > 49) {
        this.v_empSearchQuery = this.v_empSearchQuery.concat(" or ")
      }
      this.v_empSearchQuery = this.v_empSearchQuery.concat(" Joining_Date like '%" + this.obj_emp.joining_Date.trim() + "%' ");
    }
    if (this.obj_emp.reporting_To) {
      if (this.v_empSearchQuery.length > 49) {
        this.v_empSearchQuery = this.v_empSearchQuery.concat(" or ")
      }
      this.v_empSearchQuery = this.v_empSearchQuery.concat(" Reporting_To like '%" + this.obj_emp.reporting_To.trim() + "%' ");
    }
    if (this.obj_emp.reporting_To_Email) {
      if (this.v_empSearchQuery.length > 49) {
        this.v_empSearchQuery = this.v_empSearchQuery.concat(" or ")
      }
      this.v_empSearchQuery = this.v_empSearchQuery.concat(" Reporting_To_Email like '%" + this.obj_emp.reporting_To_Email.trim() + "%' ");
    }
    if (this.obj_emp.job_Description) {
      if (this.v_empSearchQuery.length > 49) {
        this.v_empSearchQuery = this.v_empSearchQuery.concat(" or ")
      }
      this.v_empSearchQuery = this.v_empSearchQuery.concat(" job_description like '%" + this.obj_emp.job_Description.trim() + "%' ");
    }
    if (this.obj_emp.cat_Description) {
      if (this.v_empSearchQuery.length > 49) {
        this.v_empSearchQuery = this.v_empSearchQuery.concat(" or ")
      }
      this.v_empSearchQuery = this.v_empSearchQuery.concat(" cat_description like '%" + this.obj_emp.cat_Description.trim() + "%' ");
    }
    if (this.obj_emp.sub_Cat_Description) {
      if (this.v_empSearchQuery.length > 49) {
        this.v_empSearchQuery = this.v_empSearchQuery.concat(" or ")
      }
      this.v_empSearchQuery = this.v_empSearchQuery.concat(" sub_cat_description like '%" + this.obj_emp.sub_Cat_Description.trim() + "%' ");
    }
    //console.log(this.v_empSearchQuery);
 


    //checks the condition and give the access to edit employee based on role
    let v_utype = sessionStorage.getItem("userType");
    if (v_utype == 'OP' || v_utype == 'TA' || v_utype == 'TA_ADMIN' || v_utype == 'FINANCE' || v_utype == 'DM' || v_utype == 'COE' || v_utype == 'PM' || v_utype == 'RMG') {
      this.disable = v_utype;
    }
   
    return this.employeeService.empSearchQuery(this.v_empSearchQuery).subscribe((data: Employee[]) => {
      this.employee = data;
      if (!this.employee.status) {
        this.dialogService.openAlertDialog(this.employee.exception.Message);
      }
      this.noData = false;
      this.data_Source = new MatTableDataSource<Employee>(this.employee.data);
      if (this.data_Source.filteredData.length > 0) {
        this.noData = true;
      }
     // this.data_Source.data = this.employee;
      this.vload = 0;
      this.data_Source.paginator = this.paginator;
      this.data_Source.sort = this.sort;
      this.v_searchbar = false;
      this.EMP = this.employee.data;
    });
  }

  //method to display or hide search bar
  m_searchbar()
  {
    this.v_searchbar = !this.v_searchbar;
    window.scrollTo(0, 0);
  }
  //To get the dropdown for EmployeeDesignation
  LoadDesignationDescription()
  {
    this.employeeService.GetAllDesignation()
      .subscribe((data: Designation[]) => {
        this.design = data;
      });
  }
  //To get the dropdown for Department
  LoadDepartmentDescription()
  {
    this.employeeService.GetAllDepartment()
      .subscribe((data: Department[]) => {
        this.dept = data;
      })
  }

  //To get the dropdown for EDGE
  LoadEdgePracticeDescription()
  {
    this.employeeService.GetAllEdgePractice()
      .subscribe((data: EdgePractice[]) => {
        this.edge = data;
      })
  }

  //To get the dropdown for COE
  LoadGetAllCoeDescription()
  {
    this.employeeService.GetAllCoeDescription()
      .subscribe((data: CoeDescription[]) => {
        this.coe = data;
      })
  }

  //To get the dropdown for Location
  LoadGetAllCity()
  {
    this.employeeService.GetAllCity()
      .subscribe((data: BaseLocation[]) => {
        this.Location = data;
      })
  }

  LoadGetAllBusinessGroup() {
    this.employeeService.GetAllBusinessGroup().subscribe((data: BusinessGroup[]) => {
      this.businessgroup = data;
    })
  }
  //method to get data for job family dropdown
  LoadJobFamily() {
    this.employeeService.getDDAllJobs().subscribe((data: object) => {
      this.v_DD1 = data;

      this.jobsDD = this.v_DD1.data;
    })
  }
  //method to get data from categories dropdown
  LoadCategories() {
    this.employeeService.getDDAllCategories().subscribe((data: object) => {
      this.v_DD2 = data;
      this.catDD = this.v_DD2.data;
    })
  }
  LoadSubCategories() {
    this.employeeService.getDDAllsubCategories().subscribe((data: object) => {
      this.v_DD3 = data;
      this.subCat = this.v_DD3.data;
    })
  }


  //To Retrieve all the Employee details
  LoadEmployeeDetails() {
    this.employeeService.GetAllEmployee()
      .subscribe((data: Employee[]) => {
        this.employee = data;
        if (!this.employee.status) {
          this.dialogService.openAlertDialog(this.employee.exception.Message);
          console.log(this.employee.exception);
        }
        this.noData = false;
        this.data_Source = new MatTableDataSource<Employee>(this.employee.data);
        if (this.data_Source.filteredData.length > 0) {
          this.noData = true;
        }
        this.data_Source.sort = this.sort;
        this.data_Source.paginator = this.paginator;
        this.EMP = this.employee.data;
      });
  }
  openDialog() {
    this.employeeService.InitializeForm();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "65%";
   // this.dialog.open(EmployeeAddPopupComponent, dialogConfig);
    this.dialog.open(EmployeeAddPopupComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result = !null) {
        this.LoadEmployeeDetails();
      }
    }); 
  }
  onEdit(row)
  {
    this.employeeService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EmployeeEditPopupComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result = !null) {
        this.m_employeeSearchQuery();
      }
    });

  }
  exportAsXLSX(): void
  {
    var excelData = [];
    for (let data of this.EMP) { //this.employee is the object taken from Loadallemployees method
      excelData.push({
        'Business Group': data.bg_id,
        'Employee Id': data.emp_Id,
        'Employee Name': data.emp_Name,
        'Designation': data.designation_Id,
        'Edge Practice': data.edge_Practice_Id,
        'COE': data.coe_Id,
        'Job Family': data.job_Description,
        'Category': data.cat_Description,
        'Sub Category': data.sub_Cat_Description,
        'Location': data.location,
        'Joining Date': data.joining_Date,
        'Contact Number': data.contact_Number,
        'Address': data.address,
        'Email Id': data.email_Id,
        'Reporting Manager': data.reporting_To,
        'Reporting Manager Email': data.reporting_To_Email,
        'Status': data.flag_Status
      })
    }
    this.excelService.exportAsExcelFile(excelData, 'Employee')
  }

  openImport() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { type: 'employee' };
    this.dialog.open(UploadComponent, dialogConfig);
  }

  displayedColumns: string[] = ['edit', 'bg_id', 'emp_Id', 'emp_Name', 'designation_Id', 'department_Id', 'edge_Practice_Id', 'coe_Id', 'job_Description', 'cat_Description', 'sub_Cat_Description', 'location', 'joining_Date', 'contact_Number','address', 'email_ID', 'reporting_To', 'reporting_To_email', 'flag_Status'];

  OnResetSearch()
  {
    this.EmployeeForm.reset();
  }
}

