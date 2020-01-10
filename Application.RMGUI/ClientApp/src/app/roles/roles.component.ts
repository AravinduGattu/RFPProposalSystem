import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { RoleAttribute } from '../models/RoleAttribute';
import { RoleService } from '../services/RoleService';
import { ExcelService } from '../services/ExcelExport';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { EmpDropAttribute } from '../models/empDropAttribute';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { DialogService } from '../services/dialog.service';
import { UploadComponent } from '../upload/upload.component';
import { RoledialogComponent } from './roledialog/roledialog.component';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { ProjectdropdownAttribute } from '../models/ProjectdropdownAttribute'
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MyDateAdapter } from '../shared/myDateAdapter';
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
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class RolesComponent implements OnInit {
  roleStatus = '';
  constructor(public roleservice: RoleService, private dialog: MatDialog, private dialogService: DialogService, private excelService: ExcelService, public datepipe: DatePipe) { }

  roles: RoleAttribute[]=[];
  empdroplist: EmpDropAttribute[];
  empdesignation: EmployeeDesignationAttribute[];
  prjdroplist: ProjectdropdownAttribute[];
  public RoleAttributeList: RoleAttribute[];
  list_roles: RoleAttribute[] = [];
  roleForm: FormGroup;
  EditRowId: any = '';
  v_rolesSearchQuery: string;
  obj_roles: RoleAttribute;
  vload = 1;
  searchbtn = true;
  result: any;
  res: any;

  data_Source: MatTableDataSource<RoleAttribute>;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;


  ngOnInit() {
    this.LoadEmpDrop();
    this.LoadEmployeeDesignation();
    this.LoadProjectDrop();
    this.LoadAllProjectRoles();

    this.roleForm = new FormGroup({
      employee_Id: new FormControl('',[]),
      employee_Name: new FormControl('', []),
      role_CreatedBy: new FormControl(''),
      role_Designation: new FormControl('', []),
      role_Projects: new FormControl('', []),
      project_Name: new FormControl('',[]),
      role_Description: new FormControl('', []),
      role_StartDate: new FormControl('', []),
      role_EndDate: new FormControl('', []),

    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.roleForm.controls[controlName].hasError(errorName);

  }

  m_rolesSearchQuery() {

    this.v_rolesSearchQuery = 'SELECT * FROM view_getallroles';

    this.obj_roles = Object.assign({}, this.roleForm.value);
    this.obj_roles.role_StartDate = this.datepipe.transform(this.obj_roles.role_StartDate, 'yyyy-MM-dd');
    this.obj_roles.role_EndDate = this.datepipe.transform(this.obj_roles.role_EndDate, 'yyyy-MM-dd');
  

    if (this.obj_roles.employee_Id || this.obj_roles.employee_Name || this.obj_roles.role_Designation || this.obj_roles.role_Projects || this.obj_roles.project_Name ||
      this.obj_roles.role_Description || this.obj_roles.role_StartDate || this.obj_roles.role_EndDate || this.obj_roles.role_Status) {

      this.v_rolesSearchQuery = this.v_rolesSearchQuery.concat(' where ');
      
    }
    if (this.obj_roles.employee_Id) {
      if (this.v_rolesSearchQuery.length > 49) {
        this.v_rolesSearchQuery = this.v_rolesSearchQuery.concat(" or ")
        }
      this.v_rolesSearchQuery = this.v_rolesSearchQuery.concat("Employee_Id like '%"+this.obj_roles.employee_Id.trim() +"%' ");
    }
    if (this.obj_roles.employee_Name) {
      if (this.v_rolesSearchQuery.length > 49) {
        this.v_rolesSearchQuery = this.v_rolesSearchQuery.concat(" or ")
      }
      this.v_rolesSearchQuery = this.v_rolesSearchQuery.concat(" Emp_Name like '%" + this.obj_roles.employee_Name.trim() + "%' ");
    }
    if (this.obj_roles.role_Designation) {
      if (this.v_rolesSearchQuery.length > 49) {
        this.v_rolesSearchQuery = this.v_rolesSearchQuery.concat(" or ")
      }
      this.v_rolesSearchQuery = this.v_rolesSearchQuery.concat(" Role_Designation like '%" + this.obj_roles.role_Designation.trim() + "%' ");
    }
    if (this.obj_roles.project_Name) {
      if (this.v_rolesSearchQuery.length > 49) {
        this.v_rolesSearchQuery = this.v_rolesSearchQuery.concat(" or ")
      }
      this.v_rolesSearchQuery = this.v_rolesSearchQuery.concat(" Project_Name like '%" + this.obj_roles.project_Name.trim() + "%' ");
    }
    if (this.obj_roles.role_Projects) {
      if (this.v_rolesSearchQuery.length > 49) {
        this.v_rolesSearchQuery = this.v_rolesSearchQuery.concat(" or ")
      }
      this.v_rolesSearchQuery = this.v_rolesSearchQuery.concat(" Role_Projects like '%" + this.obj_roles.role_Projects.trim() + "%' ");
    }
    if (this.obj_roles.role_Description) {
      if (this.v_rolesSearchQuery.length > 49) {
        this.v_rolesSearchQuery = this.v_rolesSearchQuery.concat(" or ")
      }
      this.v_rolesSearchQuery = this.v_rolesSearchQuery.concat(" Role_Description like '%" + this.obj_roles.role_Description.trim() + "%' ");
    }
    if (this.obj_roles.role_Description) {
      if (this.v_rolesSearchQuery.length > 49) {
        this.v_rolesSearchQuery = this.v_rolesSearchQuery.concat(" or ")
      }
      this.v_rolesSearchQuery = this.v_rolesSearchQuery.concat(" Role_Description like '%" + this.obj_roles.role_Description.trim() + "%' ");
    }
    if (this.obj_roles.role_StartDate) {
      if (this.v_rolesSearchQuery.length > 49) {
        this.v_rolesSearchQuery = this.v_rolesSearchQuery.concat(" or ")
      }
      this.v_rolesSearchQuery = this.v_rolesSearchQuery.concat(" Role_StartDate like '%" + this.obj_roles.role_StartDate.trim() + "%' ");
    }
    if (this.obj_roles.role_EndDate) {
      if (this.v_rolesSearchQuery.length > 49) {
        this.v_rolesSearchQuery = this.v_rolesSearchQuery.concat(" or ")
      }
      this.v_rolesSearchQuery = this.v_rolesSearchQuery.concat(" Role_EndDate like '%" + this.obj_roles.role_EndDate.trim() + "%' ");
    }
    if (this.obj_roles.role_Status) {
      if (this.v_rolesSearchQuery.length > 49) {
        this.v_rolesSearchQuery = this.v_rolesSearchQuery.concat(" or ")
      }
      this.v_rolesSearchQuery = this.v_rolesSearchQuery.concat(" Role_Status like '" + this.obj_roles.role_Status.trim() + "' ");
    }

    return this.roleservice.rolesSearchQuery(this.v_rolesSearchQuery).subscribe((data: object) => {
      this.result = data;
      if (!this.result.status) {
        this.dialogService.openAlertDialog(this.result.exception.Message);
      }
      else {
        this.data_Source = new MatTableDataSource<RoleAttribute>(this.result.data);
        this.data_Source.data = this.result.data;
        this.vload = 0;
        this.data_Source.paginator = this.paginator;
        this.data_Source.sort = this.sort;
        this.searchbtn = false;
      }
    });

  }

  LoadAllProjectRoles() {
    this.roleservice.LoadRoleDetails()
      .subscribe((data: object) => {
        this.res = data;
        if (!this.res.status) {
          this.dialogService.openAlertDialog(this.res.exception.Message);
        }
        else {

          this.data_Source = new MatTableDataSource<RoleAttribute>(this.res.data);
          this.data_Source.data = this.res.data;
          this.data_Source.sort = this.sort;
          this.data_Source.paginator = this.paginator;
        }
      });
  }
  onSearch() {
    this.searchbtn = !this.searchbtn;
}

  LoadEmpDrop() { this.roleservice.getempdrop().subscribe((data: EmpDropAttribute[]) => { this.empdroplist = data; }); }

  LoadEmployeeDesignation() { this.roleservice.getempdes().subscribe((data: EmployeeDesignationAttribute[]) => { this.empdesignation = data; }); }

  LoadProjectDrop() { this.roleservice.getprjdrop().subscribe((data: ProjectdropdownAttribute[]) => { this.prjdroplist = data; }); }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(RoledialogComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result = !null) {
        this.LoadAllProjectRoles();
      }
    });

  }

  openImport() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(UploadComponent, dialogConfig);
  }

  onEdit(row) {
    this.roleservice.roleForm.reset();
    this.roleservice.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(EditRoleComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result = !null) {
        this.LoadAllProjectRoles();
      }
    });

  }

  //exportAsXLSX(): void {
  //  this.excelService.exportAsExcelFile(this.RoleAttributeList, 'Roles');
  //}
  exportAsXLSX(): void {

    var excelData = [];

    for (let data of this.roles) { //this.roles is the object taken from LoadAllProjectRoles method

      excelData.push({

        'Employee Id': data.employee_Id,

        'Employee Name': data.employee_Name,

        'Role Designation': data.role_Designation,

        'Role Projects': data.role_Projects,

        'Project Name': data.project_Name,

        'Role Description': data.role_Description,

        'Role Status': data.role_Status,

        'Role StartDate': data.role_StartDate,

        'Role EndDate': data.role_EndDate,


      })

    }

    this.excelService.exportAsExcelFile(excelData, 'Roles')

  }
  displayedColumns: string[] = ['edit', 'employee_Id', 'employee_Name', 'role_Designation','project_Name','role_Projects', 'role_Description', 'role_Status', 'role_StartDate','role_EndDate'];

  selection = new SelectionModel<RoleAttribute>(true, []);

  OnResetSearch()
  {
    this.roleForm.reset();
  }


}
