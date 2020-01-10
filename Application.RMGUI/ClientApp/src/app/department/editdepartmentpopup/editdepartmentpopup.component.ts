import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DepartAtt } from '../../models/DepartAtt';
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
  selector: 'app-editdepartmentpopup',
  templateUrl: './editdepartmentpopup.component.html',
  styleUrls: ['./editdepartmentpopup.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EditdepartmentpopupComponent implements OnInit {
  title = 'EDIT DEPARTMENT';
  public deptform: FormGroup;
  deptUpdate: any;
  v_searchbar = false;
  s_dept: DepartAtt;
  deptStatus = '';
  load = 1;
  editable;
  data_Source = new MatTableDataSource<DepartAtt>();

  dept: MatTableDataSource<DepartAtt>;
  Depart: DepartAtt[];

  prefix: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data, private dialogService: DialogService, private notificationservice: NotificationService, public dialogRef: MatDialogRef<EditdepartmentpopupComponent>, public adminservice: AdminService, private dialog: MatDialog, public datepipe: DatePipe) { }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit() {
    this.LoadDepartment();
    this.deptform = new FormGroup({
      department: new FormControl('', [Validators.required]),
      departmentCode: new FormControl('', [Validators.required]),
      deptStatus: new FormControl('', [Validators.required]),
      depStartDate: new FormControl(''),
      depEndDate: new FormControl(''),
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.deptform.controls[controlName].hasError(errorName);
  }
  ngAfterViewInit() {
    this.data_Source.paginator = this.paginator;
  }
  //To add the Employee Details
  Submit() {
    if (this.adminservice.deptform.dirty === true) {
    if (this.adminservice.deptform.valid) {
      this.Depart = Object.assign({}, this.adminservice.deptform.value);
            return this.adminservice.updateDepartment(this.Depart).subscribe(
        result => {
          this.deptUpdate = result;
          if (!this.deptUpdate.status) {
            this.dialogService.openAlertDialog('Something went wrong.Please try again.');
          }
          else {
            this.deptform.reset();
            this.adminservice.InitializeFormedge();
            this.notificationservice.success('Submitted succesfully');
            this.LoadDepartment();
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
  }
  close() {
    this.deptform.reset();
    this.dialogRef.close();
  }
  clear() {
    this.deptform.reset();
    this.dialogRef.close();
  }

  LoadDepartment() {
    this.adminservice.GetAllDepartment().subscribe((data: DepartAtt[]) => {
      this.Depart = data;
      this.dept = new MatTableDataSource<DepartAtt>(this.Depart);
      this.dept.paginator = this.paginator;
    });
  }
}

