import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { ReportService } from '../services/reportservice';
import { ReportsEPMAttribute } from '../models/ReportsEPMAttribute';
import { MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AssignProjectService } from '../Services/AssignProjectService';
import { EmpassignDropAttribute } from '../models/empassignDropAttribute';
import { projectnameAssigndrop } from '../models/projectnameAssigndrop ';
import { ExcelService } from '../services/ExcelExport';

@Component({
  selector: 'deliverable',
  templateUrl: './deliverable.component.html',
  styleUrls: ['./deliverable.component.css']
})
export class DeliverableComponent implements OnInit {
 
  constructor(public datepipe: DatePipe, private reportService: ReportService, private assignProjectService: AssignProjectService, private excelService:ExcelService) { }
  public epmForm: FormGroup;
  vload = 1;
  v_searchbar = false;
  list_EPM: ReportsEPMAttribute[];
  empdroplist: EmpassignDropAttribute[];
  projectdroplist: projectnameAssigndrop[];
  data_Source: MatTableDataSource<ReportsEPMAttribute>;
  v_epmSearchQuery: string;
  obj_epm: ReportsEPMAttribute;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit() {
  
    //this.epmForm = new FormGroup({
    //  emp_Id: new FormControl('', [Validators.maxLength(10)]),
    //  emp_Name: new FormControl('', [Validators.maxLength(30)]),
    //  project_Name: new FormControl('', [Validators.maxLength(30)]),
    //  assign_Project_StartDate: new FormControl(''),
    //  assign_Project_EndDate: new FormControl(''),
    //  billable: new FormControl(''),
    //  billing_Percentage: new FormControl('', [Validators.maxLength(100)]),
    //  location: new FormControl('', [Validators.maxLength(10)]),
    //  onsite: new FormControl(''),
    //});

   

    //this.LoadEmpDrop();
    //this.LoadProjectsDrop();

  }

  m_searchbar() { }

  
  //m_epmSearchQuery() {


  //  this.v_epmSearchQuery = 'SELECT * FROM pact_rmg.view_getepmdetails';
    
  //  this.obj_epm = Object.assign({}, this.epmForm.value);
  //  this.obj_epm.assign_Project_StartDate = this.datepipe.transform(this.obj_epm.assign_Project_StartDate, 'yyyy-MM-dd');
  //  this.obj_epm.assign_Project_EndDate = this.datepipe.transform(this.obj_epm.assign_Project_EndDate, 'yyyy-MM-dd');


  //  if (this.obj_epm.emp_Id || this.obj_epm.emp_Name || this.obj_epm.project_Name ||
  //    this.obj_epm.assign_Project_StartDate || this.obj_epm.assign_Project_EndDate || this.obj_epm.billable
  //    || this.obj_epm.billing_Percentage || this.obj_epm.location || this.obj_epm.onsite) {
  //    this.v_epmSearchQuery = this.v_epmSearchQuery.concat(' where');
  //    console.log(this.v_epmSearchQuery.length)
  //  }
  //  if (this.obj_epm.emp_Id) {
  //    if (this.v_epmSearchQuery.length > 54) {
  //      this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" or ")
  //    }
  //    this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" emp_Id like '%" + this.obj_epm.emp_Id.trim() + "%' ");
  //  }
  //  if (this.obj_epm.emp_Name) {
  //    if (this.v_epmSearchQuery.length > 54) {
  //      this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" or ")
  //    }
  //    this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" emp_Name like '%" + this.obj_epm.emp_Name.trim() + "%' ");
  //  }
  //  if (this.obj_epm.project_Name) {
  //    if (this.v_epmSearchQuery.length > 54) {
  //      this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" or ")
  //    }
  //    this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" project_Name like '%" + this.obj_epm.project_Name.trim() + "%' ");
  //  }
  //  if (this.obj_epm.assign_Project_StartDate) {
  //    if (this.v_epmSearchQuery.length > 54) {
  //      this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" or ")
  //    }
  //    this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" Assign_Project_StartDate like '%" + this.obj_epm.assign_Project_StartDate.trim() + "%' ");
  //  }
  //  if (this.obj_epm.assign_Project_EndDate) {
  //    if (this.v_epmSearchQuery.length > 54) {
  //      this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" or ")
  //    }
  //    this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" Assign_Project_EndDate like '%" + this.obj_epm.assign_Project_EndDate.trim() + "%' ");
  //  }
  //  if (this.obj_epm.billable) {
  //    if (this.v_epmSearchQuery.length > 54) {
  //      this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" or ")
  //    }
  //    this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" Billable like '%" + this.obj_epm.billable.trim() + "%' ");
  //  }
  //  if (this.obj_epm.billing_Percentage) {
  //    if (this.v_epmSearchQuery.length > 54) {
  //      this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" or ")
  //    }
  //    this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" Billing_Percentage like '%" + this.obj_epm.billing_Percentage.trim() + "%' ");
  //  }
  //  if (this.obj_epm.location) {
  //    if (this.v_epmSearchQuery.length > 54) {
  //      this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" or ")
  //    }
  //    this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" Location like '%" + this.obj_epm.location.trim() + "%' ");
  //  }
  //  if (this.obj_epm.onsite) {
  //    if (this.v_epmSearchQuery.length > 54) {
  //      this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" or ")
  //    }
  //    this.v_epmSearchQuery = this.v_epmSearchQuery.concat(" Onsite like '%" + this.obj_epm.onsite.trim() + "%' ");
  //  }


  //  console.log(this.v_epmSearchQuery);

  //  this.reportService.getAllEPMDetails(this.v_epmSearchQuery).subscribe((data: ReportsEPMAttribute[]) => {
  //    this.list_EPM = data;
  //    this.data_Source = new MatTableDataSource<ReportsEPMAttribute>(this.list_EPM);
  //    this.vload = 0;
  //    this.data_Source.sort = this.sort;
  //    this.data_Source.paginator = this.paginator;
  //  });

  //}


  //m_searchbar() {
  //  if (this.v_searchbar) {
  //    this.v_searchbar = false;
  //  }
  //  else {
  //    this.v_searchbar = true;
  //  }

  //}

  //LoadEmpDrop() {
  //  this.assignProjectService.getempdrop().subscribe((data: EmpassignDropAttribute[]) => { this.empdroplist = data; });
  //}
  //LoadProjectsDrop() {
  //  this.assignProjectService.GetProjectDropdown().subscribe((data: projectnameAssigndrop[]) => { this.projectdroplist = data; });
  //}

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.list_EPM, 'EmployeeProjectMngmt');
  }

  //displayedColumns: string[] = [ 'emp_Id', 'emp_Name', 'project_Name', 'assign_Project_StartDate', 'assign_Project_EndDate', 'billable', 'billing_Percentage', 'location', 'onsite'];

  }


