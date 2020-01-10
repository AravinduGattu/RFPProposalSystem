import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { EdgePracAtt } from '../../models/EdgePracAtt';
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
  selector: 'app-editedgepopup',
  templateUrl: './editedgepopup.component.html', 
  styleUrls: ['./editedgepopup.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EditedgepopupComponent implements OnInit {
  title = 'EDIT EDGE PRACTICE';
  public edgeform: FormGroup;
  v_searchbar = false;
  edgeUpdate: any;
  s_edge: EdgePracAtt;
  edgestatus = '';
  load = 1;
  editable;
  selectedoption;
  data_Source = new MatTableDataSource<EdgePracAtt>();

  edge: MatTableDataSource<EdgePracAtt>;
  Edge: EdgePracAtt[];

  prefix: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data,private dialogService:DialogService, private notificationservice: NotificationService, public dialogRef: MatDialogRef<EditedgepopupComponent>, public adminservice: AdminService, private dialog: MatDialog, public datepipe: DatePipe) { }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit() {
    this.LoadEdge();
    this.edgeform = new FormGroup({
      edgePractice: new FormControl('', [Validators.maxLength(30)]),
      epStatus: new FormControl('', [Validators.maxLength(500)]),
      epStartDate: new FormControl('', ),
      epEndDate: new FormControl('', ),

    });

  }
  public hasError = (controlName: string, errorName: string) => {
    return this.edgeform.controls[controlName].hasError(errorName);

  }
  ngAfterViewInit() {
    this.data_Source.paginator = this.paginator;
  }
  //To add the Edge Details
  Submit()
  {
    if (this.adminservice.edgeform.dirty === true) {
      if (this.adminservice.edgeform.valid) {
        this.Edge = Object.assign({}, this.adminservice.edgeform.value);
        return this.adminservice.updateEdgePractice(this.Edge).subscribe(
          result => {
            this.edgeUpdate = result;
            if (!this.edgeUpdate.status) {
              this.dialogService.openAlertDialog('Something went wrong.Please try again.');
            }
            else {
              this.edgeform.reset();
              this.adminservice.InitializeFormedge();
              this.notificationservice.success('Submitted succesfully');
              this.LoadEdge();
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
    this.edgeform.reset();
    this.dialogRef.close();
  }
  clear() {
    this.edgeform.reset();
    this.dialogRef.close();
  }

  LoadEdge() {
    this.adminservice.GetAllEdgePractice().subscribe((data: EdgePracAtt[]) => {
      this.Edge = data;
      this.edge = new MatTableDataSource<EdgePracAtt>(this.Edge);
      this.edge.paginator = this.paginator;
    });
  }

}

