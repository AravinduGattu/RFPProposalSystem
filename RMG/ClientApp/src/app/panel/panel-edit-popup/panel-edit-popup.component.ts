import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from '@angular/material';
import { Panel } from '../../models/Panel';
import { EmployeeNameDropDown } from '../../models/EmployeeNameDropDown';
import { PanelService } from '../../services/PanelService';
import { NotificationService } from '../../services/NotificationService';
import { Designation } from '../../models/Designation';

@Component({
  selector: 'app-panel-edit-popup',
  templateUrl: './panel-edit-popup.component.html',
  styleUrls: ['./panel-edit-popup.component.css']
})
export class PanelEditPopupComponent implements OnInit {
  panelStatus = '';
  panels: Panel[] = [];
  panel: Panel[];
  //EditRowId: any = '';
  public panelForm: FormGroup;
  title = 'EDIT PANEL'
  design: Designation[];
  panelemp: EmployeeNameDropDown[];
  data_Source: MatTableDataSource<Panel>;
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<PanelEditPopupComponent>, public panelService: PanelService, private notificationservice: NotificationService) { }

  ngOnInit() {
    this.LoadPanel();
    this.LoadEmployeeName();
    this.LoadDesignationDescription();
    this.panelForm = new FormGroup({
      //panel_id: new FormControl('',),
      panel_code: new FormControl('', [Validators.required]),
      panel_name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z, ]+$')]),
      email_id: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[pactera.com]+$')]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(13), Validators.pattern('[0-9]+$')]),
      panel_role: new FormControl('', [Validators.required]),
      panel_status: new FormControl('', [Validators.required]),
      panel_startdate: new FormControl('', [Validators.required]),
      panel_enddate: new FormControl('', [Validators.required]),
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.panelForm.controls[controlName].hasError(errorName);

  }
  LoadDesignationDescription() {
    this.panelService.GetAllDesignation()
      .subscribe((data: Designation[]) => {
        this.design = data;
      });
  }
  Submit() {
    if (this.panelService.panelForm.valid) {
      this.panels = Object.assign({}, this.panelService.panelForm.value);
      console.log(this.panels);
      return this.panelService.UpdatePanel(this.panels).subscribe(
        result => {
          console.log(result);
          this.dialogRef.close(this.panelForm.value);
          this.panelForm.reset();
          this.notificationservice.success('Submitted successfully');
          this.LoadPanel();
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
        this.data_Source = new MatTableDataSource(this.panel);
      });
  }
  Close() {
   
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
