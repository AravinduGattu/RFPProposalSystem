import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EdgePracAtt } from '../../models/EdgePracAtt';
import { EdgepracticeComponent } from '../edgepractice.component';
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
  selector: 'app-addpopupedgepractice',
  templateUrl: './addpopupedgepractice.component.html',
  styleUrls: ['./addpopupedgepractice.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AddpopupedgepracticeComponent implements OnInit {
  title = 'ADD EDGE PRACTICE';
  public edgeform: FormGroup;
  Edge: EdgePracAtt[];
  edgeAdd: any;
  edgelist: EdgePracAtt[];
  service: any;
  selectedoption: any;
  selected: any;
  nrSelect = 'Active';
  Active;
  constructor(@Inject(MAT_DIALOG_DATA) public data,private dialogService:DialogService,public dialogRef: MatDialogRef<EdgepracticeComponent>, private adminservice: AdminService, private notificationservice: NotificationService) {
  }
  ngOnInit() {

    this.edgeform = new FormGroup({
      edgePractice: new FormControl('', [Validators.maxLength(30)]),
      epStatus: new FormControl('', [Validators.maxLength(500)]),
      epStartDate: new FormControl('', ),
      epEndDate: new FormControl('', ),
      created_By: new FormControl(sessionStorage.getItem("Employee_Id"))
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.edgeform.controls[controlName].hasError(errorName);

  }
  onSubmit() {
    if (this.edgeform.valid) {
      this.Edge = Object.assign({}, this.edgeform.value);
      return this.adminservice.AddEdgePractice(this.Edge).subscribe(
        result => {
          this.edgeAdd = result;
          if (!this.edgeAdd.status) {
            this.dialogService.openAlertDialog('Something went wrong.Please try again.');
          }
          this.dialogRef.close(this.edgeform.value);
          this.edgeform.reset();
          this.notificationservice.success(':: Submitted successfully');
          //this.projectservice.LoadProjectDetails();
          this.onClose();
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
    this.edgeform.reset();
    this.adminservice.InitializeFormedge();
    this.dialogRef.close();
  }

  onClear() {
   
    if (this.edgeform.touched == true) {
      this.edgeform.reset();
      this.notificationservice.success('Cleared Succesfully');
    }
    else {
      this.notificationservice.warn('There is nothing to Clear');
    }

  }
}
