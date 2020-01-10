import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Employee } from '../../models/Employee';
import { Designation } from '../../models/Designation';
import { Department } from '../../models/Department';
import { EdgePractice } from '../../models/EdgePractice';
import { CoeDescription } from '../../models/CoeDescription';
import { BaseLocation } from '../../models/BaseLocation';
import { BusinessGroup } from '../../models/BusinessGroup';
import { NotificationService } from '../../services/NotificationService';
import { EmployeeService } from '../../services/EmployeeService';
import { ExcelService } from '../../services/ExcelExport';
import { UserService } from '../../services/UserService';
import { DialogService } from '../../services/dialog.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MyDateAdapter } from '../../shared/myDateAdapter';
import { JobFamily, JobFamilyDropdown } from '../../models/JobFamily';
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
  selector: 'app-employee-edit-popup',
  templateUrl: './employee-edit-popup.component.html',
  styleUrls: ['./employee-edit-popup.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EmployeeEditPopupComponent implements OnInit {
  title = 'EDIT EMPLOYEE';
  emps: Employee[];//var
  empUpdate: any;
  employee: Employee[] = [];//var
  design: Designation[];//var
  dept: Department[];//var
  edge: EdgePractice[];//var
  coe: CoeDescription[];//var
  Location: BaseLocation[];//var
  empid: Employee[];
  ReportingTo: Employee[];
  CatAndSubCat: JobFamily[];
  editable: boolean;
 businessgroup: BusinessGroup[];
  EditRowId: any = '';//var
  EmployeeForm: FormGroup;//var
  selectedoption: any;
  jobData: any;
  categoriesData: any;
  subCatData: any;
  dd1: string[];
  dd2: string[];
  dd3: string[];
  data_Source: MatTableDataSource<Employee>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(@Inject(MAT_DIALOG_DATA) public data, private dialogService: DialogService, private userservice: UserService,
    private notificationservice: NotificationService, public dialogRef: MatDialogRef<EmployeeEditPopupComponent>,
    public employeeService: EmployeeService, private excelService: ExcelService) {
    this.categoriesData = [];}

  ngOnInit() {
    this.LoadEmployeeDetails();
    this.EmployeeForm = new FormGroup({
      bg_id: new FormControl('', [Validators.required]),
      emp_Id: new FormControl('', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
      emp_Name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z, ]+$'), Validators.maxLength(100)]),
      designation_Id: new FormControl('', ),
      department_Id: new FormControl('', ),
      edge_Practice_Id: new FormControl('', ),
      coe_Id: new FormControl(''),
      job_Description: new FormControl(''),
      cat_Description: new FormControl(''),
      sub_Cat_Description : new FormControl(''),
      location_Id: new FormControl(''),
      location: new FormControl(''),
      joining_Date: new FormControl('', [Validators.required]),
      contact_Number: new FormControl('', [ Validators.minLength(10), Validators.maxLength(13), Validators.pattern('[0-9]+$')]),
      address: new FormControl('',),
      email_Id: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@pactera.com+$')]),
      reporting_To: new FormControl('', ),
      reporting_To_Email: new FormControl('', [ Validators.pattern('^[a-zA-Z0-9_.+-]+@pactera.com+$')]),
      flag_Status: new FormControl(''),
    });
    this.LoadGetAllBusinessGroup();
    this.LoadDesignationDescription();
    this.LoadDepartmentDescription();
    this.LoadEdgePracticeDescription();
    this.LoadGetAllCoeDescription();
    this.LoadGetAllCity();
    this.LoadGetAllReportingToAndEmail();
    this.LoadGetAllJobFamily();
    //this.LoadGetCategory();
    //this.LoadGetSubCategory();
    console.log(this.employeeService.EmployeeForm.get('job_Description').value);
    
    //console.log(this.emps[0]);
    this.LoadGetCategory2(this.employeeService.EmployeeForm.get('job_Description').value);
    
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.EmployeeForm.controls[controlName].hasError(errorName); 
  }

  //To add the Employee Details
  Submit() {
    if (this.employeeService.EmployeeForm.dirty === true) {
    if (this.employeeService.EmployeeForm.valid)
    {
      this.emps = Object.assign({}, this.employeeService.EmployeeForm.value);
      return this.employeeService.updateEmployee(this.emps).subscribe(
        result => {
          this.empUpdate = result;
          if (!this.empUpdate.status) {
            this.dialogService.openAlertDialog(this.empUpdate.exception.Message);
          }
          else {
            this.EmployeeForm.reset();
            this.employeeService.InitializeForm();
            this.notificationservice.success('Submitted succesfully');
            this.LoadEmployeeDetails();
            this.close();
          }
        },
        err => {
          console.log(err);
        });
      }

    }
    else {
      this.notificationservice.success('No Changes To Save');
    }
  }


  //To Retrieve all the Employee details
  LoadEmployeeDetails() {
    this.employeeService.GetAllEmployee()
      .subscribe((data: Employee[]) => {
        this.employee = data;
        this.data_Source = new MatTableDataSource<Employee>(this.employee);
        this.data_Source.sort = this.sort;
        this.data_Source.paginator = this.paginator;
      });
  }
 //To close the popup
  close() {
    this.EmployeeForm.reset();
    this.dialogRef.close();
  }
  //To clear the form
  clear() {
    this.EmployeeForm.reset();
  }
  //To get the dropdown for BusinessGroup
  LoadGetAllBusinessGroup() {
    this.employeeService.GetAllBusinessGroup().subscribe((data: BusinessGroup[]) => {
      this.businessgroup = data;
    })
  }

  //To get the dropdown for EmployeeDesignation
  LoadDesignationDescription() {
    this.employeeService.GetAllDesignation()
      .subscribe((data: Designation[]) => {
        this.design = data;
      });
  }
  //To get the dropdown for Department
  LoadDepartmentDescription() {
    this.employeeService.GetAllDepartment()
      .subscribe((data: Department[]) => {
        this.dept = data;
      })
  }

  //To get the dropdown for EDGE
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

  //To get the dropdown for Location
  LoadGetAllCity() {
    this.employeeService.GetAllCity()
      .subscribe((data: BaseLocation[]) => {
        this.Location = data;
      })
  }
  //To get the dropdown for Name and Email
  LoadGetAllReportingToAndEmail() {
    this.employeeService.GetAllReportingToAndEmail()
      .subscribe((data: Employee[]) => {
        this.ReportingTo = data;
      })
  }

  //To get the dropdown for Job Family, Category and Sub Category
  LoadGetAllJobFamily() {
    this.employeeService.GetAllJobFamilyDropdown()
      .subscribe((data: object) => {
        this.jobData = data;
        this.dd1 = this.jobData;
      }
    //    if (!this.jobData.status) {
    //      this.dialogService.openAlertDialog(this.jobData.exception.Message);
    //    }
    //    else {
          
    //}
    )
  }


  //To get the dropdown for Job Family, Category and Sub Category
  LoadGetCategory(jobFam: string) {
    this.employeeService.GetAllCategoryDropdown(jobFam)
      .subscribe((data: object) => {
        this.categoriesData = data;
        this.dd2 = this.categoriesData;
      } )
  }

  LoadGetCategory2(jobFam: string) {
    this.employeeService.GetAllCategoryDropdown(jobFam)
      .subscribe((data: object) => {
        this.categoriesData = data;
        this.dd2 = this.categoriesData;
        console.log(this.employeeService.EmployeeForm.get('cat_Description').value);
        this.LoadGetSubCategory(this.employeeService.EmployeeForm.get('cat_Description').value);
      })
  }



  //To get the dropdown for Job Family, Category and Sub Category
  LoadGetSubCategory(category:string) {
    this.employeeService.GetAllSubCategoryDropdown(category)
      .subscribe((data: object) => {
        this.subCatData = data;
        if (!this.subCatData.status) {
          this.dialogService.openAlertDialog(this.subCatData.exception.Message);
        }
        else {
          this.dd3 = this.subCatData.data;
        }
      })
  }




 //To auto fill employee name and email
  GetEmailID(event: any) {
    const RMEmail = this.ReportingTo.filter(data => data.emp_Name === event.option.value);
    this.employeeService.EmployeeForm.get('reporting_To_Email').setValue(RMEmail[0].email_Id);
  }
}


