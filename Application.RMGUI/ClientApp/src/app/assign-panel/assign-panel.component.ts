import { Component, OnInit, ViewChild } from '@angular/core';
import { AssignPanel } from '../models/AssignPanel';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { AssignPanelService } from '../services/AssignPanelService';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PanelDropdown } from '../models/PanelDropdown';
import { UploadComponent } from '../upload/upload.component';
import { AssignPanelInsertPopupComponent } from './assign-panel-insert-popup/assign-panel-insert-popup.component';
import { AssignPanelEditPopupComponent } from './assign-panel-edit-popup/assign-panel-edit-popup.component';
import { ExcelService } from '../services/ExcelExport';

@Component({
  selector: 'app-assign-panel',
  templateUrl: './assign-panel.component.html',
  styleUrls: ['./assign-panel.component.css']
})
export class AssignPanelComponent implements OnInit {

  panels: AssignPanel[] = [];  // inserting
  panel: AssignPanel[];  // fetching
  EditRowId: any = '';   // Edit 
  panelStatus = '';   // hard code
  obj_AssignPanel: AssignPanel;  // search query  
  list_Assignpanels: AssignPanel[] = [];  // search query 
  panelemp: PanelDropdown[];  // drp down
  public assignpanelForm: FormGroup;
  data_Source: MatTableDataSource<AssignPanel>;
  v_assignpanelSearchQuery: string;
  vload = 1;
  v_searchbar = true;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(private assignpanelService: AssignPanelService, private dialog: MatDialog, private excelService: ExcelService ) { }

  ngOnInit() {
    this.LoadAssignPanel();
    this.LoadAssignPanel();
    this.assignpanelForm = new FormGroup({
      
      assigning_panel_code: new FormControl(''),
      assign_panel_name: new FormControl('', [Validators.pattern('[a-zA-Z, ]+$')]),
      applicant_name: new FormControl('', [Validators.pattern('[a-zA-Z, ]+$')]),
      type_of_assessment: new FormControl(''),
      time_slot: new FormControl(''),
      assign_panel_status: new FormControl(''),
      assignpanel_start_date: new FormControl(''),
      assignpanel_end_date: new FormControl(''),

    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.assignpanelForm.controls[controlName].hasError(errorName);

  }
  openPopup() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    //dialogConfig.height = "70 %";

    this.dialog.open(AssignPanelInsertPopupComponent, dialogConfig);

  }

  editPopup(row) {
    this.assignpanelService.populateassignpanelForm(row);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    //dialogConfig.height = "60 %";

    this.dialog.open(AssignPanelEditPopupComponent,dialogConfig);
   
  }
  

  m_assignpanelSearchQuery() {

    this.v_assignpanelSearchQuery = 'SELECT * FROM pact_rmg.view_getallassignpanel';

    this.obj_AssignPanel = Object.assign({}, this.assignpanelForm.value);
    if (this.obj_AssignPanel.assigning_panel_code || this.obj_AssignPanel.assign_panel_name || this.obj_AssignPanel.applicant_name || this.obj_AssignPanel.type_of_assessment ||
      this.obj_AssignPanel.time_slot || this.obj_AssignPanel.assign_panel_status || this.obj_AssignPanel.assignpanel_start_date || this.obj_AssignPanel.assignpanel_end_date) {
      this.v_assignpanelSearchQuery = this.v_assignpanelSearchQuery.concat(' where');
      console.log(this.v_assignpanelSearchQuery.length)
    }
   
    if (this.obj_AssignPanel.assigning_panel_code) {
      if (this.v_assignpanelSearchQuery.length > 49) {
        this.v_assignpanelSearchQuery = this.v_assignpanelSearchQuery.concat(" or ")
      }
      this.v_assignpanelSearchQuery = this.v_assignpanelSearchQuery.concat(" assigning_panel_code like '%" + this.obj_AssignPanel.assigning_panel_code.trim() + "%' ");
    }
    if (this.obj_AssignPanel.assign_panel_name) {
      if (this.v_assignpanelSearchQuery.length > 49) {
        this.v_assignpanelSearchQuery = this.v_assignpanelSearchQuery.concat(" or ")
      }
      this.v_assignpanelSearchQuery = this.v_assignpanelSearchQuery.concat(" Emp_Name like '%" + this.obj_AssignPanel.assign_panel_name.trim() + "%' ");
    }
    if (this.obj_AssignPanel.applicant_name) {
      if (this.v_assignpanelSearchQuery.length > 49) {
        this.v_assignpanelSearchQuery = this.v_assignpanelSearchQuery.concat(" or ")
      }
      this.v_assignpanelSearchQuery = this.v_assignpanelSearchQuery.concat(" applicant_name like '%" + this.obj_AssignPanel.applicant_name.trim() + "%' ");
    }
    if (this.obj_AssignPanel.type_of_assessment) {
      if (this.v_assignpanelSearchQuery.length > 49) {
        this.v_assignpanelSearchQuery = this.v_assignpanelSearchQuery.concat(" or ")
      }
      this.v_assignpanelSearchQuery = this.v_assignpanelSearchQuery.concat(" type_of_assessment like '%" + this.obj_AssignPanel.type_of_assessment.trim() + "%' ");
    }
    if (this.obj_AssignPanel.time_slot) {
      if (this.v_assignpanelSearchQuery.length > 49) {
        this.v_assignpanelSearchQuery = this.v_assignpanelSearchQuery.concat(" or ")
      }
      this.v_assignpanelSearchQuery = this.v_assignpanelSearchQuery.concat(" time_slot like '%" + this.obj_AssignPanel.time_slot + "%' ");
    }

    if (this.obj_AssignPanel.assign_panel_status) {
      if (this.v_assignpanelSearchQuery.length > 49) {
        this.v_assignpanelSearchQuery = this.v_assignpanelSearchQuery.concat(" or ")
      }
      this.v_assignpanelSearchQuery = this.v_assignpanelSearchQuery.concat(" assign_panel_status like '%" + this.obj_AssignPanel.assign_panel_status.trim() + "%' ");
    }

    if (this.obj_AssignPanel.assignpanel_start_date) {
      if (this.v_assignpanelSearchQuery.length > 49) {
        this.v_assignpanelSearchQuery = this.v_assignpanelSearchQuery.concat(" or ")
      }
      this.v_assignpanelSearchQuery = this.v_assignpanelSearchQuery.concat(" assignpanel_start_date like '%" + this.obj_AssignPanel.assignpanel_start_date.trim() + "%' ");
    }

    if (this.obj_AssignPanel.assignpanel_end_date) {
      if (this.v_assignpanelSearchQuery.length > 49) {
        this.v_assignpanelSearchQuery = this.v_assignpanelSearchQuery.concat(" or ")
      }
      this.v_assignpanelSearchQuery = this.v_assignpanelSearchQuery.concat(" assignpanel_end_date like '%" + this.obj_AssignPanel.assignpanel_end_date.trim() + "%' ");
    }

    console.log(this.v_assignpanelSearchQuery);

    return this.assignpanelService.assignpanelSearchQuery(this.v_assignpanelSearchQuery).subscribe((data: AssignPanel[]) => {
      this.panel = data;
      this.data_Source = new MatTableDataSource(this.panel);
      this.vload = 0;
      this.data_Source.paginator = this.paginator;
      this.data_Source.sort = this.sort;
    });

  }
  m_searchbar() {
    this.v_searchbar = !this.v_searchbar;
  }

  LoadAssignPanel() {
    this.assignpanelService.GetAllPanel()
      .subscribe((data: AssignPanel[]) => {
        this.panel = data;
      });
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.panel, 'AssignPanel');
  }
  displayedColumns: string[] = ['edit', 'assigning_panel_code', 'assign_panel_name', 'applicant_name', 'type_of_assessment', 'time_slot', 'assign_panel_status', 'assignpanel_start_date', 'assignpanel_end_date'];

  openImport() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(UploadComponent, dialogConfig);
  }

  OnResetSearch()
  {
    this.assignpanelForm.reset();
  }

}
