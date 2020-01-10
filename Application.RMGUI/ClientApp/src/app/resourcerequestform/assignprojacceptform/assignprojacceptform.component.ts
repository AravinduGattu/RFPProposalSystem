import { Component, OnInit } from '@angular/core';
import { AssignProjectService } from '../../Services/AssignProjectService';
import { FormGroup, FormControl } from '@angular/forms';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MatDialogRef } from '@angular/material';
import { ResourceReqService } from '../../services/ResourceReqService';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { AcceptAssignProjReq } from '../../models/AcceptAssignProjReq';
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
  selector: 'app-assignprojacceptform',
  templateUrl: './assignprojacceptform.component.html',
  styleUrls: ['./assignprojacceptform.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AssignprojacceptformComponent implements OnInit {

  public id: Message;
  cid: string;
  obj: AcceptAssignProjReq;
  title = 'Request Acceptance';
  editable;
  res: any;

  constructor(public assignpro: AssignProjectService, public resourcereqservice: ResourceReqService, public dialogRef: MatDialogRef<AssignprojacceptformComponent>) { }
  addFormValues: FormGroup;

  ngOnInit() {

    this.obj = Object.assign({}, this.assignpro.addFormValues.value);

   // console.log(this.obj);
  }



  acceptAssignRequest() {
    this.cid = this.assignpro.addFormValues.get('res_req_cid').value;
    //console.log(this.obj);
    //console.log(this.assignpro.addFormValues.value);
    //console.log(this.assignpro.addFormValues.get('res_req_cid').value);

    this.resourcereqservice.acceptAssignRequest(this.cid).subscribe((data: object) => {
      this.res = data;
      if (!this.res.status) {
        //this.dialogService.openAlertDialog('Something went wrong! Please try again.');
      }

      });

    this.close();


  }

  rejectAssignProject() {
    this.cid = this.assignpro.addFormValues.get('res_req_cid').value;
    this.resourcereqservice.rejectAssignProject(this.cid)
      .subscribe((data: object) => {
        this.res = data;
        if (!this.res.status) {
          //this.dialogService.openAlertDialog('Something went wrong! Please try again.');
        }
      });
  }

  


  close() {
    this.dialogRef.close(false);
  }



}
