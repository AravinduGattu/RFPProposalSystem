import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource, MatDialog, MatPaginator, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';
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
  selector: 'app-coe-add-popup',
  templateUrl: './coe-add-popup.component.html',
  styleUrls: ['./coe-add-popup.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],

})
export class CoeAddPopupComponent implements OnInit {
  title = 'ADD COE';
  coeAdd: any;
  public coeform: FormGroup;
  v_searchbar = false;
  s_coe: CoeAtt;
  coestatus = '';
  selectedoption;
  load = 1;
  data_Source = new MatTableDataSource<CoeAtt>();
  nrSelect = 'Active';
  Active;
  coe: MatTableDataSource<CoeAtt>;
  Coe: CoeAtt[];

  prefix: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data, private dialogService: DialogService, private notificationservice: NotificationService, public dialogRef: MatDialogRef<CoeAddPopupComponent>, public adminservice: AdminService, private dialog: MatDialog, public datepipe: DatePipe) { }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit() {
    this.LoadCoe();
    this.coeform = new FormGroup({
      coe: new FormControl('', [Validators.required]),
      coeStatus: new FormControl('', [Validators.required]),
      coeStartDate: new FormControl('', ),
      coeEndDate: new FormControl('',),
      created_By: new FormControl(sessionStorage.getItem("Employee_Id"))
    });

  }
  public hasError = (controlName: string, errorName: string) => {
    return this.coeform.controls[controlName].hasError(errorName);

  }
  ngAfterViewInit() {
    this.data_Source.paginator = this.paginator;
  }
  //To add the Employee Details
  OnSubmit() {
    if (this.coeform.valid) {
      this.Coe = Object.assign({}, this.coeform.value);
      return this.adminservice.AddCoe(this.Coe).subscribe(
        result => {
          this.coeAdd = result;
          if (!this.coeAdd.status)
          {
            this.dialogService.openAlertDialog('Something went wrong, Please try again.');
          }
          else
          {
            this.coeform.reset();
            this.adminservice.InitializeForm();
            this.notificationservice.success('Submitted succesfully');
            this.dialogRef.close();
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
  clear() {
    this.coeform.reset();
    if (this.coeform.touched == true) {
      this.coeform.reset();
      this.notificationservice.success('Cleared Succesfully');
    }
    else {
      this.notificationservice.warn('There is nothing to Clear');
    }
  }
  onClose() {

    this.coeform.reset();
    this.adminservice.InitializeForm();
    this.dialogRef.close(false);
  }

  LoadCoe() {
    this.adminservice.GetAllCOE().subscribe((data: CoeAtt[]) => {
      this.Coe = data;
      this.coe = new MatTableDataSource<CoeAtt>(this.Coe);
      this.coe.paginator = this.paginator;
    });
  }

}
