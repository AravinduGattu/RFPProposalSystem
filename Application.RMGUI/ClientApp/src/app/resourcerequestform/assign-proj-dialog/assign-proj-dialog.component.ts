import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material";
import { EmpassignDropAttribute } from '../../models/empassignDropAttribute';
import { AssignProjectService } from '../../Services/AssignProjectService';
import { NotificationService } from '../../services/NotificationService';
import { AssignProject } from '../../models/AssignProject';
import { BaseLocation } from '../../models/BaseLocation';
import { ProjectdropdownAttribute } from '../../models/ProjectdropdownAttribute';
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
  selector: 'app-assign-proj-dialog',
  templateUrl: './assign-proj-dialog.component.html',
  styleUrls: ['./assign-proj-dialog.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AssignProjDialogComponent implements OnInit {

  constructor(public assignpro: AssignProjectService, public dialogRef: MatDialogRef<AssignProjDialogComponent>, private notificationservice: NotificationService) { }

  Pro: AssignProject[] = [];
  empdroplist: EmpassignDropAttribute[];
  editable;
  assPrjLocation: BaseLocation[];
  title = 'Assign Project';

  ngOnInit() {
    this.dialogRef.updateSize('50%', '60%');
    this.LoadEmpDrop();
    this.LoadCity();
    
    
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.assignpro.assignProjectForm.controls[controlName].hasError(errorName);
  }

  OnSubmit() {
    if (this.assignpro.assignProjectForm.valid) {

      this.Pro = Object.assign({}, this.assignpro.assignProjectForm.value);
      console.log(this.Pro);
      return this.assignpro.AddAssignProject(this.Pro).subscribe(
        result => {
          console.log(result);
          this.assignpro.assignProjectForm.reset();
          this.notificationservice.success('Submitted Succesfully');
          this.closeDialog();



        },
        err => {

          console.log(err);
        }
      );
    }
  }


  LoadEmpDrop() {
    this.assignpro.getempdrop()
      .subscribe((data: EmpassignDropAttribute[]) => { this.empdroplist = data; });
  }
  LoadCity() {
    this.assignpro.GetAllCity()
      .subscribe((data: BaseLocation[]) => {
        this.assPrjLocation = data;
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
