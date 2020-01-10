import { Component, OnInit, HostListener, ElementRef, ViewChild, Input } from '@angular/core';
import { ResourceReqService } from '../services/ResourceReqService';
import { ResourceReqAttribute } from '../Models/ResourceReqAttribute';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialog, MatDialogConfig, MatSort, MatPaginator } from "@angular/material";
import { ProjectdropdownAttribute } from '../models/ProjectdropdownAttribute';
import { DialogService } from '../services/dialog.service';
import { MatTableDataSource } from '@angular/material';

import { CustomerdropdownAttribute } from '../models/CustomerdropdownAttribute';
import { DatePipe } from '@angular/common';
import { UploadComponent } from '../upload/upload.component';
import { ResourcedialogComponent } from './resourcedialog/resourcedialog.component';
import { ExcelService } from '../services/ExcelExport';
import { RRFChildDialogComponent } from './rrfchild-dialog/rrfchild-dialog.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MyDateAdapter } from '../shared/myDateAdapter';
import { EdgePractice } from '../models/EdgePractice';
import { CoeDescription } from '../models/CoeDescription';
import { EmployeeService } from '../services/EmployeeService';
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
  selector: 'app-resourcerequestform',
  templateUrl: './resourcerequestform.component.html',
  styleUrls: ['./resourcerequestform.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ResourcerequestformComponent implements OnInit {

  constructor(private resourcereqservice: ResourceReqService, private dialog: MatDialog, private dialogService: DialogService,
    private employeeService: EmployeeService,public datepipe: DatePipe, private excelservice: ExcelService) { }

  resourcerequest: ResourceReqAttribute[] = [];
  projectdropdownlist: ProjectdropdownAttribute[];
  customerdropdownlist: CustomerdropdownAttribute[];
  public ResourceReqAttributeList: ResourceReqAttribute[];


  dialogser: any;
  resourcereqForm: FormGroup;
  obj_RRFP: ResourceReqAttribute;
  typBill: any;
  loc: any;
  cat: any;
  pid: string;

  v_RRFPSearchQuery: string;
  vload = 1;
  edge: EdgePractice[];
  coe: CoeDescription[];
  loaddata = false;
  v_search = true;
  disable = "disabled";
  result: any;
  res: any;
  noData: boolean;
  userRole: string;
  data_Source: MatTableDataSource<ResourceReqAttribute>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  //@Input() public pid: string;
  ngOnInit() {
    this.LoadProjectDropdown();
    this.LoadEdgePracticeDescription();
    this.LoadGetAllCoeDescription();
    this.dialogser = this.dialogService;
    this.userRole = sessionStorage.getItem("userType");
    //this.LoadCustomerDropdown();
    //this.LoadPResReq();
    this.resourcereqForm = new FormGroup({

      res_req_num_res: new FormControl('', [Validators.maxLength(20)]),
      res_req_created_by: new FormControl(''),
      res_req_request_for: new FormControl('', []),
      res_req_project_name: new FormControl('', [Validators.maxLength(200)]),
      res_req_customer_name: new FormControl('', [Validators.maxLength(200)]),
      res_req_ccc: new FormControl('', [Validators.maxLength(15)]),
      res_req_skillset: new FormControl('', [Validators.maxLength(15)]),
      res_req_type_of_billing: new FormControl('', []),
      res_req_location: new FormControl('', []),
      res_req_category: new FormControl('', []),
      res_req_coe: new FormControl('', []),
      res_req_practice_name: new FormControl('', [Validators.maxLength(15)]),
      res_req_textarea: new FormControl('', [Validators.maxLength(500)]),
      res_req_start_date: new FormControl('', []),
      res_req_end_date: new FormControl('', []),
      res_req_status: new FormControl('', []),
    });
  }
  //editPopup(row) {
  //  this.AssignProjectService.populateassignprojectForm(row);
  //  const dialogConfig = new MatDialogConfig();

  //  dialogConfig.disableClose = true;
  //  dialogConfig.autoFocus = true;
  //  //dialogConfig.width = "30%";
  //  //dialogConfig.height = "70 %";

  //  this.dialog.open(AssignprojectEditPopupComponent, dialogConfig);

  //}

  m_RRFPSearchQuery() {

    this.v_RRFPSearchQuery = "SELECT * FROM view_getallresreqmst";
    this.obj_RRFP = Object.assign({}, this.resourcereqForm.value);
    this.obj_RRFP.res_req_start_date = this.datepipe.transform(this.obj_RRFP.res_req_start_date, 'yyyy-MM-dd');
    this.obj_RRFP.res_req_end_date = this.datepipe.transform(this.obj_RRFP.res_req_end_date, 'yyyy-MM-dd');

    if (this.obj_RRFP.res_req_project_name || this.obj_RRFP.res_req_customer_name || this.obj_RRFP.res_req_ccc
      || this.obj_RRFP.res_req_skillset || this.obj_RRFP.res_req_type_of_billing || this.obj_RRFP.res_req_category
      || this.obj_RRFP.res_req_location || this.obj_RRFP.res_req_practice_name || this.obj_RRFP.res_req_start_date
      || this.obj_RRFP.res_req_end_date || this.obj_RRFP.res_req_status || this.obj_RRFP.res_req_coe) {

      this.v_RRFPSearchQuery = this.v_RRFPSearchQuery.concat(' where ');

    }
    if (this.obj_RRFP.res_req_project_name) {
      if (this.v_RRFPSearchQuery.length > 50) {
        this.v_RRFPSearchQuery = this.v_RRFPSearchQuery.concat(" or ")
      }
      this.v_RRFPSearchQuery = this.v_RRFPSearchQuery.concat("res_req_project_name like '%" + this.obj_RRFP.res_req_project_name.trim() + "%' ")
    }

    if (this.obj_RRFP.res_req_customer_name) {
      if (this.v_RRFPSearchQuery.length > 50) {
        this.v_RRFPSearchQuery = this.v_RRFPSearchQuery.concat(" or ")
      }
      this.v_RRFPSearchQuery = this.v_RRFPSearchQuery.concat("res_req_customer_name like '%" + this.obj_RRFP.res_req_customer_name.trim() + "%' ")
    }

    if (this.obj_RRFP.res_req_ccc) {
      if (this.v_RRFPSearchQuery.length > 50) {
        this.v_RRFPSearchQuery = this.v_RRFPSearchQuery.concat(" or ")
      }
      this.v_RRFPSearchQuery = this.v_RRFPSearchQuery.concat("res_req_ccc like '%" + this.obj_RRFP.res_req_ccc.trim() + "%' ")
    }

    if (this.obj_RRFP.res_req_skillset) {
      if (this.v_RRFPSearchQuery.length > 50) {
        this.v_RRFPSearchQuery = this.v_RRFPSearchQuery.concat(" or ")
      }
      this.v_RRFPSearchQuery = this.v_RRFPSearchQuery.concat("res_req_skillset like '%" + this.obj_RRFP.res_req_skillset.trim() + "%' ")
    }

    if (this.obj_RRFP.res_req_type_of_billing) {
      if (this.v_RRFPSearchQuery.length > 50) {
        this.v_RRFPSearchQuery = this.v_RRFPSearchQuery.concat(" or ")
      }
      this.v_RRFPSearchQuery = this.v_RRFPSearchQuery.concat("res_req_type_of_billing like '%" + this.obj_RRFP.res_req_type_of_billing.trim() + "%' ")
    }

    if (this.obj_RRFP.res_req_category) {
      if (this.v_RRFPSearchQuery.length > 50) {
        this.v_RRFPSearchQuery = this.v_RRFPSearchQuery.concat(" or ")
      }
      this.v_RRFPSearchQuery = this.v_RRFPSearchQuery.concat("res_req_category like '%" + this.obj_RRFP.res_req_category.trim() + "%' ")
    }

    if (this.obj_RRFP.res_req_location) {
      if (this.v_RRFPSearchQuery.length > 50) {
        this.v_RRFPSearchQuery = this.v_RRFPSearchQuery.concat(" or ")
      }
      this.v_RRFPSearchQuery = this.v_RRFPSearchQuery.concat("res_req_location like '%" + this.obj_RRFP.res_req_location.trim() + "%' ")
    }

    if (this.obj_RRFP.res_req_practice_name) {
      if (this.v_RRFPSearchQuery.length > 50) {
        this.v_RRFPSearchQuery = this.v_RRFPSearchQuery.concat(" or ")
      }
      this.v_RRFPSearchQuery = this.v_RRFPSearchQuery.concat("res_req_practice_name like '%" + this.obj_RRFP.res_req_practice_name.trim() + "%' ")
    }

    if (this.obj_RRFP.res_req_start_date) {
      if (this.v_RRFPSearchQuery.length > 50) {
        this.v_RRFPSearchQuery = this.v_RRFPSearchQuery.concat(" or ")
      }
      this.v_RRFPSearchQuery = this.v_RRFPSearchQuery.concat("res_req_start_date like '%" + this.obj_RRFP.res_req_start_date.trim() + "%' ")
    }

    if (this.obj_RRFP.res_req_end_date) {
      if (this.v_RRFPSearchQuery.length > 50) {
        this.v_RRFPSearchQuery = this.v_RRFPSearchQuery.concat(" or ")
      }
      this.v_RRFPSearchQuery = this.v_RRFPSearchQuery.concat("res_req_end_date like '%" + this.obj_RRFP.res_req_end_date.trim() + "%' ")
    }

    if (this.obj_RRFP.res_req_status) {
      if (this.v_RRFPSearchQuery.length > 50) {
        this.v_RRFPSearchQuery = this.v_RRFPSearchQuery.concat(" or ")
      }
      this.v_RRFPSearchQuery = this.v_RRFPSearchQuery.concat("res_req_status like '" + this.obj_RRFP.res_req_status.trim() + "' ")
    }

   if(this.obj_RRFP.res_req_coe) {
      if (this.v_RRFPSearchQuery.length > 50) {
        this.v_RRFPSearchQuery = this.v_RRFPSearchQuery.concat(" or ")
      }
      this.v_RRFPSearchQuery = this.v_RRFPSearchQuery.concat("coe like '" + this.obj_RRFP.res_req_coe.trim() + "' ")
    }


    if (this.userRole == 'RMG' || this.userRole == 'ADMIN') { }
    else {
      if (this.obj_RRFP.res_req_project_name || this.obj_RRFP.res_req_customer_name || this.obj_RRFP.res_req_ccc
        || this.obj_RRFP.res_req_skillset || this.obj_RRFP.res_req_type_of_billing || this.obj_RRFP.res_req_category
        || this.obj_RRFP.res_req_location || this.obj_RRFP.res_req_practice_name || this.obj_RRFP.res_req_start_date
        || this.obj_RRFP.res_req_end_date || this.obj_RRFP.res_req_status) {

        this.v_RRFPSearchQuery = this.v_RRFPSearchQuery.concat("res_req_created_by = '" + sessionStorage.getItem("empId") + "' ");

      }
      else {
        this.v_RRFPSearchQuery = this.v_RRFPSearchQuery.concat(" where res_req_created_by = '" + sessionStorage.getItem("empId") + "' ");

      }
    }

    this.resourcereqservice.RRFPSearchQuery(this.v_RRFPSearchQuery)
      .subscribe((data: object) => {
        this.result = data;
        if (!this.result.status) {
          this.dialogService.openAlertDialog(this.result.exception.Message);
        }
        else {
          this.noData = false;
          this.data_Source = new MatTableDataSource(this.result.data);
          if (this.data_Source.filteredData.length > 0) {
            this.noData = true;
          }
          this.loaddata = true;
          this.vload = 0;
          this.data_Source.paginator = this.paginator;
          this.data_Source.sort = this.sort;
          this.v_search = false;
        }
      });
  }

  openRRFCDialog(msg: string) {
    //this.pid = id;
    //this.dialogService.openRRFDialog(this.pid);

    this.dialog.open(RRFChildDialogComponent, { width: '80%', height: '85%', panelClass: 'confirm-dialog-container', disableClose: true, data: { id: msg } }).afterClosed().subscribe(result => {
      if (result = !null) {
        this.m_RRFPSearchQuery();
      }
    });
  }

  m_searchbar() {
    this.v_search = !this.v_search;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.resourcereqForm.controls[controlName].hasError(errorName);
  }

  LoadProjectDropdown() {
    this.resourcereqservice.GetProjectDropdown().subscribe((data: ProjectdropdownAttribute[]) => { this.projectdropdownlist = data; });
  }

  LoadEdgePracticeDescription() {
    this.employeeService.GetAllEdgePractice()
      .subscribe((data: EdgePractice[]) => {
        this.edge = data;
      })
  }
  //To get the dropdown for COE
  LoadGetAllCoeDescription() {
    this.employeeService.GetAllCoeDescription()
      .subscribe((data: CoeDescription[]) => {
        console.log(data);
        this.coe = data;
      })
  }

  //LoadCustomerDropdown() {
  //  this.resourcereqservice.GetCustomerDropdown().subscribe((data: CustomerdropdownAttribute[]) => { this.customerdropdownlist = data; });
  //}
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "65%";
    dialogConfig.height = "85%";

    this.dialog.open(ResourcedialogComponent, dialogConfig).afterClosed().subscribe((result) => {
      //if (result != null) {
      //  this.LoadPResReq();
      //}
      this.m_RRFPSearchQuery();



    });
  }
  //LoadPResReq() {
  //  this.resourcereqservice.getPResreq()
  //    .subscribe((data: ResourceReqAttribute[]) =>
  //    {
  //      this.ResourceReqAttributeList = data;
  //      this.data_Source = new MatTableDataSource(this.ResourceReqAttributeList);
  //      this.data_Source.paginator = this.paginator;
  //      this.data_Source
  //    });

  //}

  //LoadChildResReq() {
  //  this.resourcereqservice.getChildResreq()
  //    .subscribe((data: ResourceReqChildAttribute[]) => {
  //      this.ResourceReqChildAttributeList = data;
  //      this.data_Source = new 
  //    });
  //}
  displayedColumns: string[] = ['edit', 'res_req_created_by', 'res_req_pid', 'res_req_num_res', 'res_req_status', 'res_req_project_name', 'res_req_customer_name', 'res_req_practice_name', 'res_req_coe','res_req_request_for', 'res_req_ccc', 'res_req_skillset', 'res_req_type_of_billing', 'res_req_location', 'res_req_category', 'res_req_start_date', 'res_req_end_date'];
  //exportAsXLSX(): void {
  //  this.excelservice.exportAsExcelFile(this.ResourceReqAttributeList, 'RRF_Export');
  //}

  OnResetSearch() {
    this.resourcereqForm.reset();
  }
}
