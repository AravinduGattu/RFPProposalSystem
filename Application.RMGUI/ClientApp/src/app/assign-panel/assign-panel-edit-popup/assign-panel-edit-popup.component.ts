import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AssignPanel } from '../../models/AssignPanel';
import { PanelDropdown } from '../../models/PanelDropdown';
import { AssignPanelService } from '../../services/AssignPanelService';
import { NotificationService } from '../../services/NotificationService';

@Component({
  selector: 'app-assign-panel-edit-popup',
  templateUrl: './assign-panel-edit-popup.component.html',
  styleUrls: ['./assign-panel-edit-popup.component.css']
})
export class AssignPanelEditPopupComponent implements OnInit {
  panels: AssignPanel[] = [];  // inserting
  panel: AssignPanel[];  // fetching
  assign_panelstatus = '';   // hard code
  panelemp: PanelDropdown[];  // drp down
  public assignpanelForm: FormGroup;
  title = 'EDIT ASSIGN PANEL'
  editable: boolean;
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<AssignPanelEditPopupComponent>, public assignpanelService: AssignPanelService, private notificationservice: NotificationService) { }

  ngOnInit() {
    this.LoadAssignPanel();
    this.LoadPanelName();
    this.assignpanelForm = new FormGroup({
            assigning_panel_code: new FormControl('', [Validators.required]),
      assign_panel_name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z, ]+$')]),
      applicant_name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z, ]+$')]),
      type_of_assessment: new FormControl('', [Validators.required]),
      time_slot: new FormControl('', [Validators.required]),
      assign_panel_status: new FormControl('', [Validators.required]),
      assignpanel_start_date: new FormControl('',[Validators.required]),
      assignpanel_end_date: new FormControl('', [Validators.required]),

    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.assignpanelForm.controls[controlName].hasError(errorName);

  }
  Submit() {
    if (this.assignpanelService.assignpanelForm.valid) {

      this.panels = Object.assign({}, this.assignpanelService.assignpanelForm.value);
      return this.assignpanelService.UpdateAssignPanel(this.panels).subscribe(
        result => {
          console.log(result);
          this.dialogRef.close(this.assignpanelForm.value);
          this.assignpanelForm.reset();
          this.notificationservice.success('Submitted Succesfully');
          this.Close();
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  LoadAssignPanel() {
    this.assignpanelService.GetAllPanel()
      .subscribe((data: AssignPanel[]) => {
        this.panel = data;
      });
  }
  Close() {
    this.assignpanelForm.reset();
    this.dialogRef.close();
  }

  Cancel() {
    this.assignpanelForm.reset();
    this.dialogRef.close();
    //this.customerService.IntializeForm();
    //this.notificationservice.success(':: Cleared successfully');
  }
  LoadPanelName() {
    this.assignpanelService.PanelDropdown().subscribe((data: PanelDropdown[]) => {
      this.panelemp = data;
    });
  }



}
