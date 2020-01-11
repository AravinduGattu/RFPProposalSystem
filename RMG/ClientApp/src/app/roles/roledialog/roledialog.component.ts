import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material';
import { EmpDropAttribute } from '../../models/empDropAttribute';
import { RoleService } from '../../services/RoleService';
import { ExcelService } from '../../services/ExcelExport';
import { NotificationService } from '../../services/NotificationService';
import { RoleAttribute } from '../../models/RoleAttribute';
import { ProjectdropdownAttribute } from '../../models/ProjectdropdownAttribute';
import { ProjectRoleAttribute } from '../../models/ProjectRoleAttribute';
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
  selector: 'app-roledialog',
  templateUrl: './roledialog.component.html',
  styleUrls: ['./roledialog.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class RoledialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<RoledialogComponent>, private dialog: MatDialog,
    private roleservice: RoleService, private excelService: ExcelService, private notificationservice: NotificationService, private dialogService: DialogService) { }

  roles: RoleAttribute[] = [];
  empdroplist: EmpDropAttribute[];
  prjdroplist: ProjectdropdownAttribute[];
  empdesignation: EmployeeDesignationAttribute[];
  prjrolelist: ProjectRoleAttribute[];
  public RoleAttributeList: RoleAttribute[];
  roleForm: FormGroup;
  EditRowId: any = '';
  roleStatus = '';
  res: any;
  selected: any = 'Active';
  title = 'Assign Project Role';
  error: any = { isError: false, errorMessage: '' };
  ngOnInit() {
  //  this.dialogRef.updateSize('75%', '45%');
    this.LoadEmpDrop();
    this.LoadEmployeeDesignation();
    this.LoadProjectDrop();
    this.LoadPrjroleDrop();
    
    this.roleForm = new FormGroup({
      employee_Id: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      employee_Name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      role_Projects: new FormControl('', [Validators.required]),
      project_Name: new FormControl('', [Validators.required]),
      role_Designation: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      role_Description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      role_StartDate: new FormControl('', [Validators.required]),
      role_EndDate: new FormControl('', [Validators.required]),
      role_CreatedBy: new FormControl(sessionStorage.getItem("Employee_Id"))
    });
  }


  public hasError = (controlName: string, errorName: string) => {
    return this.roleForm.controls[controlName].hasError(errorName);

  }

  LoadEmpDrop() { this.roleservice.getempdrop().subscribe((data: EmpDropAttribute[]) => { this.empdroplist = data; }); }

  LoadEmployeeDesignation() { this.roleservice.getempdes().subscribe((data: EmployeeDesignationAttribute[]) => { this.empdesignation = data; }); }

  LoadProjectDrop() { this.roleservice.getprjdrop().subscribe((data: ProjectdropdownAttribute[]) => { this.prjdroplist = data; }); }

  LoadPrjroleDrop() { this.roleservice.getprjroledrop().subscribe((data: ProjectRoleAttribute[]) => { this.prjrolelist = data; }); }

  onSubmit() {
    if (this.roleForm.valid) {
      this.roles = Object.assign({}, this.roleForm.value);
      return this.roleservice.saveRole(this.roles).subscribe(
        result => {
          this.res = result;
          if (!this.res.status) {
            this.dialogService.openAlertDialog('Something went wrong, please try again.');
          }
          else {
            console.log(result);
            this.roleForm.reset();
            this.notificationservice.success('Submitted Succesfully');
            this.close();
          }
        },
        err => {
          console.log(err);
        }
      );
    }
    else {
      this.notificationservice.success('Please enter details');
    }
  }

  close() {
    this.roleForm.reset();
    this.roleservice.intiliazeFormGroup();
    this.dialogRef.close();
  }

  onClear() {
    if (this.roleForm.touched == true) {
      this.roleForm.reset();
      this.notificationservice.success('Cleared Succesfully');
    }
    else {
      this.notificationservice.warn('There is nothing to Clear');
    }

  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.RoleAttributeList, 'Roles');
  }

  getEmployeeName(event: any) {
    const EmpNameList = this.empdroplist.filter(data => data.emp_Id === event.option.value);
    const EmpName = EmpNameList[0].emp_Name;
    this.roleForm.get('employee_Name').setValue(EmpName);
  }

  getEmployeeId(event: any) {
    const EmpIdList = this.empdroplist.filter(data => data.emp_Name === event.option.value);
    const EmpId = EmpIdList[0].emp_Id;
    this.roleForm.get('employee_Id').setValue(EmpId);
  }

}

