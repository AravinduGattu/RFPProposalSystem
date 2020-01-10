import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatTableDataSource, MatDialog } from '@angular/material';
import { RoleService } from '../../services/RoleService';
import { ExcelService } from '../../services/ExcelExport';
import { NotificationService } from '../../services/NotificationService';
import { RoleAttribute } from '../../models/RoleAttribute';
import { EmpDropAttribute } from '../../models/empDropAttribute';
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
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EditRoleComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<EditRoleComponent>, private dialog: MatDialog,
    public roleservice: RoleService, private excelService: ExcelService, private notificationservice: NotificationService, private dialogService: DialogService) { }
  roles: RoleAttribute[] = [];
  empdroplist: EmpDropAttribute[];
  empdesignation: EmployeeDesignationAttribute[];
  prjdroplist: ProjectdropdownAttribute[];
  prjrolelist: ProjectRoleAttribute[];
  data_Source: MatTableDataSource<RoleAttribute>;
  public RoleAttributeList: RoleAttribute[];
  selectedoption;
  selected: any;
  roleUpdate: any;
  roleForm: FormGroup;
  EditRowId: any = '';
  title = 'Edit Project Role';
  editable;
  roleStatus = '';
  ngOnInit() {
    this.dialogRef.updateSize('65%', '45%');
    this.LoadEmpDrop();
    this.LoadEmployeeDesignation();
    this.roleservice.LoadRoleDetails();
    this.LoadProjectDrop();
    this.LoadPrjroleDrop();


    this.roleForm = new FormGroup({
      employee_Id: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      employee_Name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      role_Designation: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      project_Name: new FormControl('', [Validators.required]),
      role_Projects: new FormControl('', [Validators.required]),
      role_Status: new FormControl('', [Validators.required]),
      role_Description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      role_StartDate: new FormControl('', [Validators.required]),
      role_EndDate: new FormControl('', [Validators.required]),
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.roleForm.controls[controlName].hasError(errorName);

  }

  LoadEmpDrop() { this.roleservice.getempdrop().subscribe((data: EmpDropAttribute[]) => { this.empdroplist = data; }); }

  LoadEmployeeDesignation() { this.roleservice.getempdes().subscribe((data: EmployeeDesignationAttribute[]) => { this.empdesignation = data; }); }

  LoadProjectDrop() { this.roleservice.getprjdrop().subscribe((data: ProjectdropdownAttribute[]) => { this.prjdroplist = data; }); }

  LoadPrjroleDrop() { this.roleservice.getprjroledrop().subscribe((data: ProjectRoleAttribute[]) => { this.prjrolelist = data; }); }

  onUpdate() {
    if (this.roleservice.roleForm.dirty === true) {
    if (this.roleservice.roleForm.valid)
    {
      this.roles = Object.assign({}, this.roleservice.roleForm.value);
      console.log(this.roles);
      return this.roleservice.updateRole(this.roles).subscribe(
        result => {
          this.roleUpdate = result;
          if (!this.roleUpdate.status) {
            this.dialogService.openAlertDialog('Something went wrong, please try again.');
          }
          else {
          console.log(result);
          this.dialogRef.close(this.roleForm.value);
          this.roleservice.roleForm.reset();
          this.roleservice.LoadRoleDetails();
          this.notificationservice.success('Submitted successfully');
          this.onClose();
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

  //LoadRoleDetails() {
  //  this.roleservice.getRole()
  //    .subscribe((data: RoleAttribute[]) => {
  //      this.RoleAttributeList = data;
  //      this.data_Source = new MatTableDataSource(this.RoleAttributeList);
  //    });
  //}

  onClose() {
    this.roleForm.reset();
    this.roleservice.intiliazeFormGroup();
    this.roleservice.LoadRoleDetails();
    this.dialogRef.close();
  }

  onClear() {
    this.onClose();
  }

 }
