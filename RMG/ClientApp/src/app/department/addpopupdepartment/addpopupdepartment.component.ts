import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DepartAtt } from '../../models/DepartAtt';
import { DepartmentComponent } from '../department.component';
import { AdminService } from '../../services/AdminConfigService';
import { NotificationService } from '../../services/NotificationService';
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
  selector: 'app-addpopupdepartment',
  templateUrl: './addpopupdepartment.component.html',
  styleUrls: ['./addpopupdepartment.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AddpopupdepartmentComponent implements OnInit {
  title = 'ADD DEPARTMENT';
  public deptform: FormGroup;
  Depart: DepartAtt[];
  deptAdd: any;
  deptlist: DepartAtt[];
  service: any;
  deptStatus;
  nrSelect = 'Active';
  Active;
  constructor(@Inject(MAT_DIALOG_DATA) public data, private dialogService: DialogService, public dialogRef: MatDialogRef<DepartmentComponent>, private adminservice: AdminService, private notificationservice: NotificationService) {
  }
    ngOnInit() {
      //this.dialogRef.updateSize('35%', '39%');

      this.deptform = new FormGroup({
        department: new FormControl('', [Validators.maxLength(30)]),
        departmentCode: new FormControl('', [Validators.maxLength(30)]),
        deptStatus: new FormControl('', [Validators.maxLength(500)]),
        depStartDate: new FormControl('', ),
        depEndDate: new FormControl('', ),
        created_By: new FormControl(sessionStorage.getItem("Employee_Id"))
      });
    }
  public hasError = (controlName: string, errorName: string) => {
    return this.deptform.controls[controlName].hasError(errorName);

  }
    onSubmit() {
      if (this.deptform.valid) {
        this.Depart = Object.assign({}, this.deptform.value);
        return this.adminservice.AddDepartment(this.Depart).subscribe(
          result => {
            this.deptAdd = result;
            if (!this.deptAdd.status) {
              this.dialogService.openAlertDialog('Something went wrong.Please try again');
            }
            else {
              this.dialogRef.close(this.deptform.value);
              this.deptform.reset();
              this.notificationservice.success(':: Submitted successfully');
              //this.projectservice.LoadProjectDetails();
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
    onClose() {
      this.deptform.reset();
      this.adminservice.InitializeFormdept();
      this.dialogRef.close();
    }

    onClear() {
      

      if (this.deptform.touched == true) {
        this.deptform.reset();
        this.notificationservice.success('Cleared Succesfully');
      }
      else {
        this.notificationservice.warn('There is nothing to Clear');
      }
    }
}
