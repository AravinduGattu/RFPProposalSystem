import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatDialogConfig, MatDialog } from "@angular/material";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Newjobrequirement } from '../../models/NewjobrequirementAttribute';
import { NewjobrequirementService } from '../../services/NewjobrequirementService';
import { NotificationService } from '../../services/NotificationService';
import { UploadComponent } from '../../upload/upload.component';
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
  selector: 'app-newjobrequirement',
  templateUrl: './newjobrequirement.component.html',
  styleUrls: ['./newjobrequirement.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class NewjobrequirementComponent implements OnInit {

  public createnewjobForm: FormGroup;
  EditRowId: any = '';
  empid: string;

  createjob: Newjobrequirement[] = [];
  data_Source: MatTableDataSource<Newjobrequirement>;

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<NewjobrequirementComponent>, private dialog: MatDialog, private newjobrequirementservice: NewjobrequirementService, private notificationservice: NotificationService) { }


  ngOnInit() {
    this.dialogRef.updateSize('55%', '50%');
    this.createnewjobForm = new FormGroup({
      resourcerequest_Id: new FormControl('', [Validators.required]),
      newjobrequirement_code: new FormControl('', [Validators.required]),
      newjobrequirement_Id: new FormControl('', [Validators.required]),
      experience: new FormControl('', [Validators.required]),
      skills: new FormControl('', [Validators.required]),
      vacancies: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
      startdate: new FormControl('', [Validators.required]),
      enddate: new FormControl('', [Validators.required]),
    });


  }


  public hasError = (controlName: string, errorName: string) => {
    return this.createnewjobForm.controls[controlName].hasError(errorName);
  }
  Submit() {
    if (this.createnewjobForm.valid) {
      this.createjob = Object.assign({}, this.createnewjobForm.value);
      console.log(this.createjob);
      return this.newjobrequirementservice.Addnewjob(this.createjob).subscribe(
        result => {
          console.log(result);
          this.dialogRef.close(this.createnewjobForm.value);
          this.createnewjobForm.reset();
          this.notificationservice.success(':: Submitted successfully')
          this.close();

        },
        err => {
          console.log(err);
        }
      );
    }
    else {
      this.notificationservice.success('Please enter the details');
    }
  }
  //LoadAssignProject() {
  //  this.AssignProjectService.GetAllAssignProject()
  //    .subscribe((data: AssignProject[]) => {
  //      this.assignproj = data;
  //      this.data_Source = new MatTableDataSource(this.assignproj);
  //    });
  //}
 
  onClear() {
    this.createnewjobForm.reset();
    
    this.notificationservice.success(':: Cleared successfully');
  }
  close() {
    this.dialogRef.close(false);
    this.createnewjobForm.reset();

  }

  openImport() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(UploadComponent, dialogConfig);
  }
}
