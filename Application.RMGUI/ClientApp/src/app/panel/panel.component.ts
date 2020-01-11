import { Component, OnInit, ViewChild } from '@angular/core';
import { Panel } from '../models/Panel';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PanelService } from '../services/PanelService';
import { EmployeeNameDropDown } from '../models/EmployeeNameDropDown';
import { MatTableDataSource, MatPaginator, MatDialog, MatSort, MatDialogConfig } from '@angular/material';
import { ExcelService } from '../services/ExcelExport';
import { UploadComponent } from '../upload/upload.component';
import { PanelInsertPopupComponent } from './panel-insert-popup/panel-insert-popup.component';
import { PanelEditPopupComponent } from './panel-edit-popup/panel-edit-popup.component';
@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  panels: Panel[] = [];
  panel: Panel[];
  EditRowId: any = '';
  obj_Panel: Panel;
  panelStatus = '';
  list_panels: Panel[] = [];
  panelemp: EmployeeNameDropDown[];
  public panelForm: FormGroup;
  data_Source: MatTableDataSource<Panel>;
  v_panelSearchQuery: string;
  vload = 1;
  v_searchbar = true;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(private panelService: PanelService, private excelService: ExcelService, private dialog: MatDialog, ) { }

  ngOnInit() {
    this.LoadPanel();
    this.LoadEmployeeName();
    this.panelForm = new FormGroup({
      panel_id:new FormControl(''),
      panel_code: new FormControl(''),
      panel_name: new FormControl('', [Validators.pattern('[a-zA-Z ]+$')]),
      email_id: new FormControl(''),
      phone: new FormControl('',[Validators.pattern('[0-9]+$')]),
      panel_role: new FormControl(''),
      panel_status: new FormControl(''),
      panel_startdate: new FormControl(''),
      panel_enddate: new FormControl(''),
    });
  }


  LoadEmployeeName() {
    this.panelService.EmployeeNameDropdown().subscribe((data: EmployeeNameDropDown[]) => {
      this.panelemp = data;
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.panelForm.controls[controlName].hasError(errorName);

  }

  openPopup() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    //dialogConfig.height = "70 %";

    this.dialog.open(PanelInsertPopupComponent, dialogConfig);

  }
  editPopup(row) {
    this.panelService.populatepanelForm(row);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    //dialogConfig.height = "60 %";

    this.dialog.open(PanelEditPopupComponent, dialogConfig);
    //const dialogRef = this.dialog.open(CustomerPopupInsertComponent, dialogConfig);

    //dialogRef.afterClosed().subscribe(
    //  data => console.log("Dialog output:", data)
    //);
  }
  //<!--panel_code
  // panel_name
  // email_id
  // phone
  // panel_role
  // panel_status
  // panel_startdate
  // panel_enddate-->


  openImport() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(UploadComponent, dialogConfig);
  }

  m_panelSearchQuery() {

    this.v_panelSearchQuery = 'SELECT * FROM pact_rmg.view_getallpanels';

    this.obj_Panel = Object.assign({}, this.panelForm.value);
    if (this.obj_Panel.panel_code || this.obj_Panel.panel_name || this.obj_Panel.email_id || this.obj_Panel.phone || this.obj_Panel.panel_role || this.obj_Panel.panel_status || this.obj_Panel.panel_startdate || this.obj_Panel.panel_enddate) {
      this.v_panelSearchQuery = this.v_panelSearchQuery.concat(' where');
      console.log(this.v_panelSearchQuery.length)
    }
    if (this.obj_Panel.panel_code) {
      if (this.v_panelSearchQuery.length > 49) {
        this.v_panelSearchQuery = this.v_panelSearchQuery.concat(" or ")
      }
      this.v_panelSearchQuery = this.v_panelSearchQuery.concat(" panel_code like '%" + this.obj_Panel.panel_code.trim() + "%' ");
    }
    if (this.obj_Panel.panel_name) {
      if (this.v_panelSearchQuery.length > 49) {
        this.v_panelSearchQuery = this.v_panelSearchQuery.concat(" or ")
      }
      this.v_panelSearchQuery = this.v_panelSearchQuery.concat(" Emp_Name like '%" + this.obj_Panel.panel_name.trim() + "%' ");
    }
    if (this.obj_Panel.email_id) {
      if (this.v_panelSearchQuery.length > 49) {
        this.v_panelSearchQuery = this.v_panelSearchQuery.concat(" or ")
      }
      this.v_panelSearchQuery = this.v_panelSearchQuery.concat(" email_id like '%" + this.obj_Panel.email_id.trim() + "%' ");
    }
    if (this.obj_Panel.phone) {
      if (this.v_panelSearchQuery.length > 49) {
        this.v_panelSearchQuery = this.v_panelSearchQuery.concat(" or ")
      }
      this.v_panelSearchQuery = this.v_panelSearchQuery.concat(" phone like '%" + this.obj_Panel.phone.trim() + "%' ");
    }
    if (this.obj_Panel.panel_role) {
      if (this.v_panelSearchQuery.length > 49) {
        this.v_panelSearchQuery = this.v_panelSearchQuery.concat(" or ")
      }
      this.v_panelSearchQuery = this.v_panelSearchQuery.concat(" panel_role like '%" + this.obj_Panel.panel_role.trim() + "%' ");
    }
    if (this.obj_Panel.panel_status) {
      if (this.v_panelSearchQuery.length > 49) {
        this.v_panelSearchQuery = this.v_panelSearchQuery.concat(" or ")
      }
      this.v_panelSearchQuery = this.v_panelSearchQuery.concat(" panel_status like '%" + this.obj_Panel.panel_status.trim() + "%' ");
    }
    if (this.obj_Panel.panel_startdate) {
      if (this.v_panelSearchQuery.length > 49) {
        this.v_panelSearchQuery = this.v_panelSearchQuery.concat(" or ")
      }
      this.v_panelSearchQuery = this.v_panelSearchQuery.concat(" panel_startdate like '%" + this.obj_Panel.panel_startdate.trim() + "%' ");
    }
    if (this.obj_Panel.panel_enddate) {
      if (this.v_panelSearchQuery.length > 49) {
        this.v_panelSearchQuery = this.v_panelSearchQuery.concat(" or ")
      }
      this.v_panelSearchQuery = this.v_panelSearchQuery.concat(" panel_enddate like '%" + this.obj_Panel.panel_enddate.trim() + "%' ");
    }

    console.log(this.v_panelSearchQuery);

    return this.panelService.panelSearchQuery(this.v_panelSearchQuery).subscribe((data: Panel[]) => {
      this.panel = data;
      this.data_Source = new MatTableDataSource(this.panel);
      this.vload = 0;
      this.data_Source.paginator = this.paginator;
      this.data_Source.sort = this.sort;
      this.v_searchbar = false;
    });

  }
  m_searchbar() {
    this.v_searchbar = !this.v_searchbar;
  }

  LoadPanel() {
    this.panelService.GetAllPanel()
      .subscribe((data: Panel[]) => {
        this.panel = data;
      });
  }


  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.panel, 'Panel');
  }
  displayedColumns: string[] = ['edit', 'panel_code', 'panel_name', 'email_id', 'phone', 'panel_role', 'panel_status', 'panel_startdate', 'panel_enddate'];

  OnResetSearch()
  {
    this.panelForm.reset();
  }
}

