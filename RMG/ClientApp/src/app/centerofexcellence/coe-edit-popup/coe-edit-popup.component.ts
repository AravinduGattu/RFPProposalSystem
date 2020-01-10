import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource, MatDialog, MatPaginator, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';
import { CoeAddPopupComponent } from '../coe-add-popup/coe-add-popup.component';
import { CoeAtt } from '../../models/CoeAtt';
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
  selector: 'app-coe-edit-popup',
  templateUrl: './coe-edit-popup.component.html',
  styleUrls: ['./coe-edit-popup.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class CoeEditPopupComponent implements OnInit {
  title = 'EDIT COE';
  coeUpdate: any;
  public coeform: FormGroup;
  v_searchbar = false;
  s_coe: CoeAtt;
  coestatus = '';
  load = 1;
  editable;
  selectedoption;
  data_Source = new MatTableDataSource<CoeAtt>();

  coe: MatTableDataSource<CoeAtt>;
  Coe: CoeAtt[];

  prefix: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data, private dialogService: DialogService, private notificationservice: NotificationService, public dialogRef: MatDialogRef<CoeAddPopupComponent>, public adminservice: AdminService, private dialog: MatDialog, public datepipe: DatePipe) { }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit() {
   // this.LoadCoe();
    this.coeform = new FormGroup({
      coe: new FormControl('', [Validators.required]),
      coeStatus: new FormControl('', [Validators.required]),
      coeStartDate: new FormControl('',),
      coeEndDate: new FormControl('',),
    });

  }
  public hasError = (controlName: string, errorName: string) => {
    return this.coeform.controls[controlName].hasError(errorName);

  }
  ngAfterViewInit() {
    this.data_Source.paginator = this.paginator;
  }
  //To add the Employee Details
  Submit() {
    if (this.adminservice.coeform.dirty === true) {
    if (this.adminservice.coeform.valid) {
      this.Coe = Object.assign({}, this.adminservice.coeform.value);
      return this.adminservice.updateCoe(this.Coe).subscribe(
        result => {
          this.coeUpdate = result;
          if (!this.coeUpdate.status) {
            this.dialogService.openAlertDialog('Something went wrong.Please try again.');
          }
          else {
            this.coeform.reset();
            this.adminservice.InitializeForm();
            this.notificationservice.success('Submitted succesfully');
            this.LoadCoe();
            this.close();
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }
    else {
  this.notificationservice.success('No Changes To Save');
}
  }
  close() {
    this.coeform.reset();
    this.dialogRef.close();
  }
  clear() {
    this.coeform.reset();
    this.dialogRef.close();
  }

  LoadCoe() {
    this.adminservice.GetAllCOE().subscribe((data: CoeAtt[]) => {
      this.Coe = data;
      this.coe = new MatTableDataSource<CoeAtt>(this.Coe);
      this.coe.paginator = this.paginator;
    });
  }

}
