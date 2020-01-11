import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSort, MatPaginator, MatDialog } from "@angular/material";
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { AssignProjDialogComponent } from '../assign-proj-dialog/assign-proj-dialog.component';
import { NewjobrequirementComponent } from '../newjobrequirement/newjobrequirement.component';
import { ResourceReqAttribute } from '../../Models/ResourceReqAttribute';
import { ResourceReqChildAttribute } from '../../models/ResourceReqChildAttribute';
import { ResourceReqService } from '../../services/ResourceReqService';
import { AssignProjectService } from '../../Services/AssignProjectService';
import { UserRole } from '../../models/UserRole';
import { UserService } from '../../services/UserService';
import { AssignprojacceptformComponent } from '../assignprojacceptform/assignprojacceptform.component';
import { AcceptAssignProjReq } from '../../models/AcceptAssignProjReq';
import { DialogService } from '../../services/dialog.service';
import { AlertDialogComponent } from '../../dialogs/alert-dialog/alert-dialog.component';
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
  selector: 'app-rrfchild-dialog',
  templateUrl: './rrfchild-dialog.component.html',
  styleUrls: ['./rrfchild-dialog.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class RRFChildDialogComponent implements OnInit {
  pid: string;
  public id: Message;
  obj_RRFC: ResourceReqAttribute;
  data_Source: MatTableDataSource<ResourceReqChildAttribute>;
  utype: UserRole;
  v_type: string;
  userRole: string;
  user = sessionStorage.getItem("empId");
  requestBy: string;
  obj_AAPR: AcceptAssignProjReq;

  result: any;
  result2: any;
  result3: any;
  result4: any;
  result5: any;

  public ResReqChildAttributeList: ResourceReqChildAttribute[];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  msg: any;


  constructor(@Inject(MAT_DIALOG_DATA) public data,
    private dialog: MatDialog,
    private userService: UserService,
    public resourcereqservice: ResourceReqService,
    public dialogRef: MatDialogRef<RRFChildDialogComponent>,
    private assignProService: AssignProjectService) { }
  

 

  closeDialog() {
    this.dialogRef.close(false);
  }
  ngOnInit()
  {
     this.pid = this.data.id;
    

    this.user = this.user.toUpperCase();
  
   

    this.resourcereqservice.getRRFPDetails(this.pid)
      .subscribe((data: object) => {
        this.result = data;
        
        if (!this.result.status) {
          let msg = "Something went wrong! Please try again.";
          //this.dialogService.openAlertDialog('Something went wrong! Please try again.');
          this.dialog.open(AlertDialogComponent, { width: '350px', height: '180px', panelClass: 'confirm-dialog-container', disableClose: true, data: { message: msg } });
        }
        else {
          this.obj_RRFC = this.result.data;
          this.requestBy = this.result.data.requested_by_id;
          this.requestBy = this.requestBy.toUpperCase();
          //console.log(this.user + "=user || " + this.requestBy + "=requestby");
        }
      });


    this.resourcereqservice.getChildResReqDetails(this.pid)
      .subscribe((data: object) => {
        this.result2 = data;
        if (!this.result2.status) {
          //this.dialogService.openAlertDialog('Something went wrong! Please try again.');
        }
        else {
          this.data_Source = new MatTableDataSource(this.result2.data);
          this.data_Source.paginator = this.paginator;
        }
      });




   //getting usertype into local variable
        this.userRole = sessionStorage.getItem("userType");

  




  }


  assignproject(row) {
    this.msg = 'Assign Project';
    this.dialog.open(AssignProjDialogComponent, { width: '350px', height: '180px', panelClass: 'confirm-dialog-container', disableClose: true, data: { message: this.msg } }).afterClosed().subscribe(result => {
      if (result = !null) {
        this.getChildDetails(this.pid);
        this.m_LoadParentStatus();
      }
    });
    // this.assignProService.AssignButton_Click(row);
    this.assignProService.populateValues(row);
    }


  createnewjob(row) {
    this.msg = 'New Job Requirement';
    this.dialog.open(NewjobrequirementComponent, { width: '350px', height: 'auto', panelClass: 'confirm-dialog-container', disableClose: true, data: { message: this.msg } });
    // this.assignProService.AssignButton_Click(row);
  }

  cancelAssignRequest(childId: string) {

    //console.log(childId);
    this.msg = childId;
    this.resourcereqservice.cancelAssignRequest(childId)
      .subscribe((data: boolean) => {
        this.getChildDetails(this.pid);
        this.resourcereqservice.updatePrtStatus(this.pid).subscribe((data: boolean) => {
          this.m_LoadParentStatus();
        });
      });
    //console.log(this.pid);
   
    
  }

  acceptAssignRequest(childId: string) {
    this.msg = childId;
    this.resourcereqservice.acceptAssignRequest(childId)
      .subscribe((data: boolean) => {
        this.getChildDetails(this.pid);
        this.m_LoadParentStatus();
        this.resourcereqservice.updatePrtStatus(this.pid).subscribe((data: boolean) => {
          
        });
      });
   // console.log(this.pid);


  }



  getChildDetails(childId: string) {
    this.resourcereqservice.getChildResReqDetails(this.pid)
      .subscribe((data: object) => {
        this.result4 = data;
        if (!this.result4.status) {
          //
        }
        else {
          this.ResReqChildAttributeList = this.result4.data;
          this.data_Source = new MatTableDataSource(this.ResReqChildAttributeList);
          this.data_Source.paginator = this.paginator;
        }
      });
  }



  //method to open accept assigned project 
  openAcceptDialog(childId: string) {
    this.msg = childId;
    
    //console.log(this.user + "=user || " + this.requestBy + "=requestby");

    this.dialog.open(AssignprojacceptformComponent, { width: '60%', height: '55%', panelClass: 'confirm-dialog-container', disableClose: true, data: { id: childId } }).afterClosed().subscribe((result) => {
      //console.log(result);
      if (result = !null) {
        
        this.getChildDetails(this.pid);
        this.m_LoadParentStatus();
      }
    });

    this.assignProService.getAssignedProjDetails(childId).subscribe((data: object) => {

      this.result5 = data;
      //this.obj_AAPR = this.result5.data;
      if (!this.result5.status) {

      }
      else {
        this.assignProService.addAcceptFormValues(this.result5.data);
      }
      
    });

    
  }


  m_LoadParentStatus() {
    //this.resourcereqservice.getRRFPDetails(this.pid)
    //  .subscribe((data: ResourceReqAttribute) => {
    //    this.obj_RRFC = data;

    //  });

    this.resourcereqservice.getRRFPDetails(this.pid)
      .subscribe((data: object) => {
        this.result = data;

        if (!this.result.status) {
          //this.dialogService.openAlertDialog('Something went wrong! Please try again.');
        }
        else {
          this.obj_RRFC = this.result.data;
        }
      });

  }

  displayedColumns: string[] = ['createnewjob', 'assign', 'viewsuggestion', 'cancel', 'res_req_pid', 'res_req_cid', 'res_req_project_name', 'res_req_customer_name', 'creq_status','res_req_ccc', 'res_req_skillset', 'res_req_type_of_billing', 'res_req_location', 'res_req_category', 'res_req_practice_name', 'res_req_start_date', 'res_req_end_date', 'res_req_created_by'];
  

}
