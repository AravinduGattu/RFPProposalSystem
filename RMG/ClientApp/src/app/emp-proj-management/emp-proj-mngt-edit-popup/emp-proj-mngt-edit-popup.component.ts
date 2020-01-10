//created by sudeep on 12-09-2019
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReportService } from '../../services/reportservice';
import { MatDialogRef } from '@angular/material';
import { ReportsEPMAttribute } from '../../models/ReportsEPMAttribute';
import { NotificationService } from '../../services/NotificationService';
import { DatePipe } from '@angular/common';
import { UserRole } from '../../models/UserRole';
import { UserService } from '../../services/UserService';
import { DialogService } from '../../services/dialog.service';
import { Location } from '../../models/Location';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MyDateAdapter } from '../../shared/myDateAdapter';
import { ProjectdropdownAttribute } from '../../models/ProjectdropdownAttribute';
import { RoleService } from '../../services/RoleService';
import { BaseLocation } from '../../models/BaseLocation';
import { ProjectService } from '../../services/ProjectService';
import { ProjectAttribute } from '../../Models/ProjectAttribute';

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
  selector: 'app-emp-proj-mngt-edit-popup',
  templateUrl: './emp-proj-mngt-edit-popup.component.html',
  styleUrls: ['./emp-proj-mngt-edit-popup.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EmpProjMngtEditPopupComponent implements OnInit {

  obj: ReportsEPMAttribute;
  EmpProjForm: FormGroup;
  minDate: string;
  currentReleaseDate: any;
  editable;
  result: any;
  countries: BaseLocation[];
  prjdroplist1: any;
  prjdroplist: any;
  constructor(public reportService: ReportService, private ds: DialogService, private ns: NotificationService, private projectService: ProjectService,
    private roleservice: RoleService, public dialogRef: MatDialogRef<EmpProjMngtEditPopupComponent>, public datepipe: DatePipe) { }

  ngOnInit() {

    this.currentReleaseDate = this.reportService.EmpProjForm.controls['assign_Project_EndDate'].value;

    this.loadprojectdrop();
    this.loadLocation();
    this.GetAllProjectCodeAndName();
  }

  //submit method to update emp-proj table
  Submit() {
    if (this.reportService.EmpProjForm.dirty === true) {
      if (this.reportService.EmpProjForm.valid) {
        this.obj = Object.assign({}, this.reportService.EmpProjForm.value);

        this.obj.assign_Project_StartDate = this.datepipe.transform(this.obj.assign_Project_StartDate, 'yyyy-MM-dd');
        this.obj.assign_Project_EndDate = this.datepipe.transform(this.obj.assign_Project_EndDate, 'yyyy-MM-dd');

        return this.reportService.updateEmpProjInfo(this.obj).subscribe(
          result => {
            //console.log(result);
            
            this.close();
            this.ns.success('Submitted succesfully');
            
            
          },
          err => {
            console.log(err);
          }
        );
       
      }

    }
    else {
      this.ns.success('No Changes To Save');
    }
  }

  GetProjectCode(event: any) {
    console.log(event);
    const ProjCode = this.prjdroplist1.filter(data => data.project_Name === event.value);
    this.reportService.EmpProjForm.get('project_Code').setValue(ProjCode[0].project_Code);
  }


  loadprojectdrop() {
    this.roleservice.getprjdrop().subscribe((data: ProjectdropdownAttribute[]) => {
      this.prjdroplist = data;
    });
  }




  //method to close the dialog
  close() {
    this.reportService.EmpProjForm.reset();
    this.dialogRef.close();
  }
  loadLocation() {
    this.reportService.loadLocation().subscribe((data: object) => {
      this.result = data;

      if (!this.result.status) {
        this.ds.openAlertDialog('Something went wrong! Please try again.');
        //console.log(this.result.exception);
      }
      else {
        this.countries = this.result.data;
        console.log(this.countries);
      }
    });
  }

  GetAllProjectCodeAndName() {
    this.projectService.GetAllProjectCodeAndName().subscribe(res => {
      this.prjdroplist1 = res;
    });
  }


  getReleaseDate(assignDate: any) {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
   
    const monthFirst = new Date(currentYear, currentMonth, 1);
    const assignedDate = new Date(assignDate);

    if (assignedDate > monthFirst) {
      return assignDate
    } else {
      return monthFirst;

    }
  }
 

}


