import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BusinessgroupAtt } from '../../models/businessgroupAtt';
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
  selector: 'app-editbussinesspopup',
  templateUrl: './editbussinesspopup.component.html',
  styleUrls: ['./editbussinesspopup.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EditbussinesspopupComponent implements OnInit {
  title = 'EDIT BUSINESS GROUP';
  bgUpdate: any;
  public BGform: FormGroup;
  v_searchbar = false;
  s_Bg: BusinessgroupAtt;
  load = 1;
  editable;
  bg_status;
  data_Source = new MatTableDataSource<BusinessgroupAtt>();

  business: MatTableDataSource<BusinessgroupAtt>;
  Business: BusinessgroupAtt[];

  prefix: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data, private dialogService: DialogService, private notificationservice: NotificationService, public dialogRef: MatDialogRef<EditbussinesspopupComponent>, public adminservice: AdminService, private dialog: MatDialog, public datepipe: DatePipe) { }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit() {
    this.LoadBusinessGroup();
    this.BGform = new FormGroup({
        bg_description: new FormControl('', [Validators.maxLength(30)]),
        bg_status: new FormControl('', [Validators.required]),
        bg_startdate: new FormControl('', ),
        bg_enddate: new FormControl('', ),
      });

  }
  public hasError = (controlName: string, errorName: string) => {
    return this.BGform.controls[controlName].hasError(errorName);

  }
  ngAfterViewInit() {
    this.data_Source.paginator = this.paginator;
  }
  //To add the Employee Details
  Submit() {
    if (this.adminservice.BGform.dirty === true) {
      if (this.adminservice.BGform.valid) {
        this.Business = Object.assign({}, this.adminservice.BGform.value);
        return this.adminservice.updateBusiness(this.Business).subscribe(
          result => {
            this.bgUpdate = result;
            console.log(this.bgUpdate);
            if (!this.bgUpdate.status) {
              this.dialogService.openAlertDialog('Something went wrong.Please try again.');
            }
            else {
              this.BGform.reset();
              this.adminservice.InitializeFormbg();
              this.notificationservice.success('Submitted succesfully');
              this.LoadBusinessGroup();
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
    this.BGform.reset();
    this.dialogRef.close();
  }
  clear() {
    this.BGform.reset();
    this.dialogRef.close();
  }

  LoadBusinessGroup() {
    this.adminservice.GetAllBusinessgroup().subscribe((data: BusinessgroupAtt[]) => {
      this.Business = data;
      this.business = new MatTableDataSource<BusinessgroupAtt>(this.Business);
      this.business.paginator = this.paginator;
    });
  }

} 
