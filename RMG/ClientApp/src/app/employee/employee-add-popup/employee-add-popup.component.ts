import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from '../../models/Employee';
import { Designation } from '../../models/Designation';
import { Department } from '../../models/Department';
import { EdgePractice } from '../../models/EdgePractice';
import { CoeDescription } from '../../models/CoeDescription';
import { BaseLocation } from '../../models/BaseLocation';
import { BusinessGroup } from '../../models/BusinessGroup';
import { NotificationService } from '../../services/NotificationService';
import { EmployeeService } from '../../services/EmployeeService';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UserService } from '../../services/UserService';
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
  selector: 'app-employee-add-popup',
  templateUrl: './employee-add-popup.component.html',
  styleUrls: ['./employee-add-popup.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EmployeeAddPopupComponent implements OnInit {
  title='ADD EMPLOYEE';
  emps: Employee[];//var
  empAdd: any;
  employee: Employee[] = [];//var
  design: Designation[];//var
  dept: Department[];//var
  edge: EdgePractice[];//var
  coe: CoeDescription[];//var
  Location: BaseLocation[];//var
  empid: Employee[];
  ReportingTo: Employee[];
  businessgroup: BusinessGroup[];
  EditRowId: any = '';//var
  EmployeeForm: FormGroup;//var
  data_Source: MatTableDataSource<Employee>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(@Inject(MAT_DIALOG_DATA) public data, private userservice: UserService, private notificationservice: NotificationService,
  public dialogRef: MatDialogRef<EmployeeAddPopupComponent>, public employeeService: EmployeeService, private dialogService: DialogService) { }
  myControl = new FormControl();
  ngOnInit() {
    this.EmployeeForm = new FormGroup({
      bg_id: new FormControl('', [Validators.required]),
      emp_Id: new FormControl('', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
      emp_Name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z, ]+$'), Validators.maxLength(100)]),
      designation_Id: new FormControl('', ),
      department_Id: new FormControl('', ),
      edge_Practice_Id: new FormControl('', ),
      coe_Id: new FormControl('', ),
      location_Id: new FormControl(''),
      location: new FormControl(''),
      joining_Date: new FormControl('', [Validators.required]),
      contact_Number: new FormControl('', [Validators.minLength(10), Validators.maxLength(13), Validators.pattern('[0-9]+$')]),
      address: new FormControl('', [Validators.maxLength(200)]),
      email_Id: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@pactera.com+$')]),
      reporting_To: new FormControl('', ),
      reporting_To_Email: new FormControl('', [Validators.pattern('^[a-zA-Z0-9_.+-]+@pactera.com+$')]),
      created_By: new FormControl(sessionStorage.getItem('empId'))
    });
    this.LoadGetAllBusinessGroup();
    this.employeeService.LoadEmployeeDetails();
    this.LoadDesignationDescription();
    this.LoadDepartmentDescription();
    this.LoadEdgePracticeDescription();
    this.LoadGetAllCoeDescription();
    this.LoadGetAllCity();
    this.LoadGetAllReportingToAndEmail();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.EmployeeForm.controls[controlName].hasError(errorName);
  }
  
  //To add the Employee Details
  OnSubmit() {
    if (this.EmployeeForm.valid)
    {
      this.emps = Object.assign({}, this.EmployeeForm.value);
      return this.employeeService.AddEmployee(this.emps).subscribe(  
        result => {
          this.empAdd = result;
          if (!this.empAdd.status)
          {
            this.dialogService.openAlertDialog(this.empAdd.exception.Message);
            console.log(this.empAdd.exception);
          }
          else
          {
            this.EmployeeForm.reset();
            this.employeeService.InitializeForm();
            this.notificationservice.success('Submitted succesfully');
            this.LoadEmployeeDetails();
            this.dialogRef.close();
            this.onClose();
          }
        },
        err => {
          console.log(err);
        }
      );
    }
    else {
      this.notificationservice.warn('Please enter the details');
    }
  }
  //To clear the form
  clear() {
    if (this.EmployeeForm.touched == true) {
      this.EmployeeForm.reset();
      this.notificationservice.success('Cleared Succesfully');
    }
    else {
      this.notificationservice.warn('There is nothing to Clear');
    }

  }
  //To close the form
  onClose() {
    this.dialogRef.close(false);
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
  //To get all the BusinessGroup
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
  //To get the dropdown for Reporting Manager and corresponding Email id
  LoadGetAllReportingToAndEmail() {
    this.employeeService.GetAllReportingToAndEmail()
      .subscribe((data: Employee[]) => {
        this.ReportingTo = data;
      })
  }

  //To autofill the employee name and email
  GetEmailID(event: any) {
    const RMEmail = this.ReportingTo.filter(data => data.emp_Name === event.option.value);
    this.EmployeeForm.get('reporting_To_Email').setValue(RMEmail[0].email_Id);
  }
}
