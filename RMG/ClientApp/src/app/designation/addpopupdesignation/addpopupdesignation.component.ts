import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../../services/NotificationService';
import { AdminService } from '../../services/AdminConfigService';
import { DesignationComponent } from '../designation.component';
import { DesignAtt } from '../../models/DesingAtt';
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
  selector: 'app-addpopupdesignation',
  templateUrl: './addpopupdesignation.component.html',
  styleUrls: ['./addpopupdesignation.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AddpopupdesignationComponent implements OnInit {
  title = 'ADD DESIGNATION';
  desgAdd: any;
  public desgform: FormGroup;
  desg: DesignAtt[];
  desglist: DesignAtt[];
  service: any;
  designStatus;
  selectedoption: any;
  selected: any;
  nrSelect = 'Active';
  Active;
  constructor(@Inject(MAT_DIALOG_DATA) public data, private dialogService: DialogService, public dialogRef: MatDialogRef<DesignationComponent>, private adminservice: AdminService, private notificationservice: NotificationService) {
  }
  ngOnInit() {
    //console.log(sessionStorage.getItem("Employee_Id"));
    this.desgform = new FormGroup({
      designation: new FormControl('', [Validators.maxLength(30)]),
      designCode: new FormControl('', [Validators.required]),
      designStatus: new FormControl('', [Validators.maxLength(500)]),
      designStartDate: new FormControl('',),
      designEndDate: new FormControl('', ),
      created_By: new FormControl(sessionStorage.getItem("Employee_Id"))
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.desgform.controls[controlName].hasError(errorName);
  }
  onSubmit() {
    if (this.desgform.valid) {
      this.desg = Object.assign({}, this.desgform.value);
      return this.adminservice.AddDesignation(this.desg).subscribe(
        result => {
          this.desgAdd = result;
          if (!this.desgAdd.status) {
            this.dialogService.openAlertDialog('Something went wrong.Please try again.');
          }
          else
          {
            this.dialogRef.close(this.desgform.value);
            this.desgform.reset();
            this.notificationservice.success(':: Submitted successfully');
            this.onClose();
          }
        },
        err => {
          console.log(err);
        });
    }
    else {
      this.notificationservice.warn('Please enter the details');
    }
  }

  onClose() {
    this.desgform.reset();
    this.adminservice.InitializeFormdesg();
    this.dialogRef.close();
  }

  onClear() {
       if (this.desgform.touched == true) {
      this.desgform.reset();
      this.notificationservice.success('Cleared Succesfully');
    }
    else {
      this.notificationservice.warn('There is nothing to Clear');
    }
    
  }
}
