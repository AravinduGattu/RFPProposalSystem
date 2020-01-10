import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AssignPanelService } from '../../services/AssignPanelService';
import { NotificationService } from '../../services/NotificationService';
import { AssignPanel } from '../../models/AssignPanel';
import { PanelDropdown } from '../../models/PanelDropdown';

@Component({
  selector: 'app-assign-panel-insert-popup',
  templateUrl: './assign-panel-insert-popup.component.html',
  styleUrls: ['./assign-panel-insert-popup.component.css']
})
export class AssignPanelInsertPopupComponent implements OnInit {
  panels: AssignPanel[] = [];  // inserting
  panel: AssignPanel[];  // fetching
 assign_panelstatus ='';   // hard code
  panelemp: PanelDropdown[];  // drp down
  public assignpanelForm: FormGroup;
  title = 'ADD ASSIGN PANEL'
 
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<AssignPanelInsertPopupComponent>, public assignpanelService: AssignPanelService, private notificationservice: NotificationService) { }

  ngOnInit() {
    this.LoadAssignPanel();
    this.LoadPanelName();
    this.assignpanelForm = new FormGroup({

      //assigning_panel_code: new FormControl('' ),
      assign_panel_name: new FormControl('', [Validators.pattern('[a-zA-Z, ]+$')]),
      applicant_name: new FormControl('', [Validators.pattern('[a-zA-Z, ]+$')]),
      type_of_assessment: new FormControl(''),
      time_slot: new FormControl(''),
      //assign_panel_status: new FormControl(''),
      assignpanel_start_date: new FormControl('', [Validators.required]),
      assignpanel_end_date: new FormControl('', [Validators.required]),

    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.assignpanelForm.controls[controlName].hasError(errorName);

  }
  OnSubmit() {
    if (this.assignpanelForm.valid) {

      this.panels = Object.assign({}, this.assignpanelForm.value);
      return this.assignpanelService.AddAssignPanel(this.panels).subscribe(
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

  Clear() {
    this.assignpanelForm.reset();
    //this.customerService.IntializeForm();
    //this.notificationservice.success(':: Cleared successfully');
  }
  LoadPanelName() {
    this.assignpanelService.PanelDropdown().subscribe((data: PanelDropdown[]) => {
      this.panelemp = data;
    });
  }


}
