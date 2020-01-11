import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DesignAtt } from '../../models/DesingAtt';
import { NotificationService } from '../../services/NotificationService';
import { AdminService } from '../../services/AdminConfigService';
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
  selector: 'app-editdesignationpopup',
  templateUrl: './editdesignationpopup.component.html',
  styleUrls: ['./editdesignationpopup.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EditdesignationpopupComponent implements OnInit {
  title = 'EDIT DESIGNATION';
  public desgform: FormGroup;
  desgUpdate: any;
  v_searchbar = false;
  s_desg: DesignAtt;
  load = 1;
  editable;
  designStatus;
  data_Source = new MatTableDataSource<DesignAtt>();
  desg: MatTableDataSource<DesignAtt>;
  Desg: DesignAtt[];
  prefix: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data, private dialogService: DialogService, private notificationservice: NotificationService, public dialogRef: MatDialogRef<EditdesignationpopupComponent>, public adminservice: AdminService, private dialog: MatDialog, public datepipe: DatePipe) { }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit() {
    this.LoadDesignation();
    //this.dialogRef.updateSize('35%', '39%');
    this.desgform = new FormGroup({
      //Project_ID: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      designation: new FormControl('', [Validators.required]),
      designCode: new FormControl('', [Validators.required]),
      designStatus: new FormControl('', [Validators.required]),
      designStartDate: new FormControl('', ),
      designEndDate: new FormControl('', ),
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.desgform.controls[controlName].hasError(errorName);

  }
  ngAfterViewInit() {
    this.data_Source.paginator = this.paginator;
  }
  //To add the Employee Details
  Submit() {
    if (this.adminservice.desgform.dirty === true) {
    if (this.adminservice.desgform.valid) {
      this.Desg = Object.assign({}, this.adminservice.desgform.value);
      return this.adminservice.updateDesignation(this.Desg).subscribe(
        result => {
          this.desgUpdate = result;
          if (!this.desgUpdate.status) {
            this.dialogService.openAlertDialog('Something went wrong.Please try again.');
          }
          else {
            this.desgform.reset();
            this.adminservice.InitializeFormedge();
            this.notificationservice.success('Submitted succesfully');
            this.LoadDesignation();
            this.close();
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
    this.close();
  }
  close() {
    this.desgform.reset();
    this.dialogRef.close();
  }
  clear() {
    this.desgform.reset();
    this.dialogRef.close();
  }

  LoadDesignation() {
    this.adminservice.GetAllDesignation().subscribe((data: DesignAtt[]) => {
      this.Desg = data;
      this.desg = new MatTableDataSource<DesignAtt>(this.Desg);
      this.desg.paginator = this.paginator;
    });
  }

}
