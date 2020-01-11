import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { EmployeeNameDropDown } from '../../models/EmployeeNameDropDown';
import { Panel } from '../../models/Panel';
import { PanelService } from '../../services/PanelService';
import { NotificationService } from '../../services/NotificationService';
import { Designation } from '../../models/Designation';


@Component({
  selector: 'app-panel-insert-popup',
  templateUrl: './panel-insert-popup.component.html',
  styleUrls: ['./panel-insert-popup.component.css']
})
export class PanelInsertPopupComponent implements OnInit {
  panelStatus = '';
  panels: Panel[] = [];
  panel: Panel[];
  //EditRowId: any = '';
  design: Designation[];//var
  public panelForm: FormGroup;
  title = 'ADD PANEL'
  panelemp: EmployeeNameDropDown[];
  data_Source: MatTableDataSource<Panel>;
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<PanelInsertPopupComponent>, public panelService: PanelService, private notificationservice: NotificationService) { }

  ngOnInit() {
    this.LoadPanel();
    this.LoadDesignationDescription();
    this.LoadEmployeeName();
    this.panelForm = new FormGroup({
      panel_id: new FormControl(''),
      //panel_code: new FormControl(''),
      panel_name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z, ]+$')]),
      email_id: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[pactera.com]+$')]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(13), Validators.pattern('[0-9]+$')]),
      panel_role: new FormControl('', [Validators.required]),
      //panel_status: new FormControl('', [Validators.required]),
      panel_startdate: new FormControl('', [Validators.required]),
      panel_enddate: new FormControl('', [Validators.required]),
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.panelForm.controls[controlName].hasError(errorName);

  }
  OnSubmit() {
    if (this.panelForm.valid) {

      this.panels = Object.assign({}, this.panelForm.value);
      return this.panelService.AddPanel(this.panels).subscribe(
        result => {
          console.log(result);
          this.dialogRef.close(this.panelForm.value);
          this.panelForm.reset();
          this.notificationservice.success('Submitted Succesfully');
          this.Close();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  LoadPanel() {
    this.panelService.GetAllPanel()
      .subscribe((data: Panel[]) => {
        this.panel = data;
      });
  }

  LoadDesignationDescription() {
    this.panelService.GetAllDesignation()
      .subscribe((data: Designation[]) => {
        this.design = data;
      });
  }

  Close() {
    this.panelForm.reset();
    this.dialogRef.close();
  }

  Clear() {
    this.panelForm.reset();
    //this.customerService.IntializeForm();
    //this.notificationservice.success(':: Cleared successfully');
  }
  LoadEmployeeName() {
    this.panelService.EmployeeNameDropdown().subscribe((data: EmployeeNameDropDown[]) => {
      this.panelemp = data;
    });
  }






}
