import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BussinessgroupComponent } from '../bussinessgroup.component';
import { AdminService } from '../../services/AdminConfigService';
import { NotificationService } from '../../services/NotificationService';
import { BusinessgroupAtt } from '../../models/businessgroupAtt';
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
  selector: 'app-addbusinessgrouppopup',
  templateUrl: './addbusinessgrouppopup.component.html',
  styleUrls: ['./addbusinessgrouppopup.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AddbusinessgrouppopupComponent implements OnInit {
  title = 'ADD BUSINESS GROUP';
  public BGform: FormGroup;
  bgAdd: any;
  Business: BusinessgroupAtt[];
  bg_status;
  service: any;
  selectedoption: any;
  selected: any;
  nrSelect = 'Active';
  Active;
  constructor(@Inject(MAT_DIALOG_DATA) public data, private dialogService: DialogService, public dialogRef: MatDialogRef<BussinessgroupComponent>, private adminservice: AdminService, private notificationservice: NotificationService) {
  }
  ngOnInit() {
   // this.dialogRef.updateSize('35%', '39%');

    this.BGform = new FormGroup({
      bg_description: new FormControl('', [Validators.required]),
      bg_status: new FormControl('', [Validators.required]),
      bg_startdate: new FormControl('',),
      bg_enddate: new FormControl('', ),
      created_By: new FormControl(sessionStorage.getItem("Employee_Id"))
      });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.BGform.controls[controlName].hasError(errorName);
  }
  onSubmit() {
    if (this.BGform.valid) {
      this.Business = Object.assign({}, this.BGform.value);
      return this.adminservice.AddBusinessGroup(this.Business).subscribe(
        result => {
          this.bgAdd = result;
          if (!this.bgAdd.status) {
            this.dialogService.openAlertDialog('Something went wrong.Please try again.');
          }
          else {
            this.dialogRef.close(this.BGform.value);
            this.BGform.reset();
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
    this.BGform.reset();
    this.adminservice.InitializeFormbg();
    this.dialogRef.close();
  }

  onClear() {
    if (this.BGform.touched == true) {
      this.BGform.reset();
      this.notificationservice.success('Cleared Succesfully');
    }
    else {
      this.notificationservice.warn('There is nothing to Clear');
    }

  }
}
