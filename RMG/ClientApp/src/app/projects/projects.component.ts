import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProjectAttribute } from '../models/ProjectAttribute';
import { ProjectService } from '../services/ProjectService';
import { ExcelService } from '../services/ExcelExport';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { MatTableDataSource,MatDialogConfig, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BaseLocation } from '../models/BaseLocation';
import { UploadComponent } from '../upload/upload.component';
import { CustomerDetailsAtrribute } from '../models/CustomerDetails';
import { AddprojectpopupComponent } from './addprojectpopup/addprojectpopup.component';
import { EditProjectpopupComponent } from './edit-projectpopup/edit-projectpopup.component';
import { UserService } from '../services/UserService';
import { UserRole } from '../models/UserRole';
import { DialogService } from '../services/dialog.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MyDateAdapter } from '../shared/myDateAdapter';
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
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class ProjectsComponent implements OnInit, AfterViewInit{
  projectStatus = '';
  projectBillable = '';
  public projectForm: FormGroup;
  proj: any;
  s_proj: ProjectAttribute;
  data_Source : MatTableDataSource<ProjectAttribute>;
  Location: BaseLocation[];
  Customer: CustomerDetailsAtrribute[];
  prefix: string;
  projectlist: any;
  project: ProjectAttribute[];
  load = 1;
  utype: UserRole;
  v_type: string;
  disable: string;
  noData: boolean;

  PROJ: ProjectAttribute[];


  v_searchbar = true;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(public projectservice: ProjectService, private userService: UserService, private excelService: ExcelService, public datepipe: DatePipe,
    private dialog: MatDialog, public dialogService: DialogService) { }



  ngOnInit() {
  
    this.LoadCity();
    this.LoadCustomerDetails();
   // this.LoadProjectDetails(); 
    this.projectForm = new FormGroup({
      //Project_ID: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      project_Name: new FormControl(''),
      project_Code: new FormControl(''),
      project_Description: new FormControl(''),
      project_StartDate: new FormControl(''),
      project_EndDate: new FormControl(''),
      project_Status: new FormControl(''),
      project_LocationId: new FormControl(''),
      project_Location: new FormControl(''),
      project_Billable: new FormControl(''),
      customer_Details: new FormControl(''),

    });


   

        let v_utype = sessionStorage.getItem("userType");

        if (v_utype == 'OP' || v_utype == 'TA' || v_utype == 'TA_ADMIN' || v_utype == 'FINANCE'  || v_utype == 'COE' || v_utype == 'PM'  ) {
          this.disable = v_utype;
        }

    



  }
  selection = new SelectionModel<ProjectAttribute>(true, []);

  LoadProjectDetails() {
    //this.projectservice.getProjects()
    //  .subscribe((data: ProjectAttribute[]) => {
    //    this.projectlist = data;
    //    if (!this.projectlist.status) {
    //      this.dialogService.openAlertDialog("Something is Wrong, Please Try Again");
    //    }
    //    this.data_Source = new MatTableDataSource(this.projectlist.data);
    //    this.data_Source.sort = this.sort;
    //    this.data_Source.paginator = this.paginator;
    //    this.project = this.projectlist.data;
    //  });
    this.prefix = 'select * from view_getallprojects';
    this.projectservice.searchQuery(this.prefix).subscribe((data: ProjectAttribute[]) => {
      this.projectlist = data;
      if (!this.projectlist.status) {
        this.dialogService.openAlertDialog(this.projectlist.exception.Message);
      }
      this.data_Source = new MatTableDataSource(this.projectlist.data);
      this.load = 0;
      this.data_Source.paginator = this.paginator;
      this.data_Source.sort = this.sort;
      this.v_searchbar = false;
    });


  }
  LoadCity() {
    this.projectservice.GetAllCity()
      .subscribe((data: BaseLocation[]) => {
        this.Location = data;
      });
  }

 
  LoadCustomerDetails() {
    this.projectservice.GetAllCustomerDetails()
      .subscribe((data: CustomerDetailsAtrribute[]) => {
        this.Customer = data;
      });
  }

  openImport() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(UploadComponent, dialogConfig);
  }

  ngAfterViewInit() {
    this.data_Source.paginator = this.paginator;
  }
 
  public hasError = (controlName: string, errorName: string) => {
    return this.projectForm.controls[controlName].hasError(errorName);

  }

  //method to get cities from db
 
  openDialog() {
    this.projectservice.intiliazeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.autoFocus = false;
    this.dialog.open(AddprojectpopupComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result = !null) {
        this.LoadProjectDetails();
      }
    });

  }
  onEdit(row) {
    this.projectservice.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(EditProjectpopupComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result = !null) {
        this.LoadProjectDetails();
      }
    });
  }
  //method for search
  searchQuery() {

    this.prefix = 'select * from view_getallprojects';

    this.s_proj = Object.assign({}, this.projectForm.value);

    this.s_proj.project_StartDate = this.datepipe.transform(this.s_proj.project_StartDate, 'yyyy-MM-dd');
    this.s_proj.project_EndDate = this.datepipe.transform(this.s_proj.project_EndDate, 'yyyy-MM-dd');
    
    console.log(this.s_proj.project_StartDate);
    console.log(this.prefix.length+":length");
    console.log(this.s_proj);


    //code to add where to prefix
    if (this.s_proj.project_Name || this.s_proj.project_Code || this.s_proj.project_Description || this.s_proj.project_StartDate || this.s_proj.project_EndDate || this.s_proj.project_Location || this.s_proj.project_Billable || this.s_proj.customer_Details) {
      this.prefix = this.prefix.concat(' where ');
      console.log(this.prefix.length + ":length");
    }
    //code to add proj name to prefix
    if (this.s_proj.project_Name) {
      if (this.prefix.length > 49) {
        this.prefix = this.prefix.concat(" or ")
      }
      this.prefix=this.prefix.concat(" Project_Name like '%" + this.s_proj.project_Name.trim() + "%' ");
    }
    if (this.s_proj.project_Code) {
      if (this.prefix.length > 49) {
        this.prefix = this.prefix.concat(" or ")
      }
      this.prefix = this.prefix.concat(" Project_Code like '%" + this.s_proj.project_Code.trim() + "%' ");
    }
    //code to add proj description to prefox
    if (this.s_proj.project_Description) {
      if (this.prefix.length > 49) {
        this.prefix = this.prefix.concat(" or ")
      }
      this.prefix = this.prefix.concat(" Project_Description like '%" + this.s_proj.project_Description.trim() + "%' ")
    }
    //code to add proj start date to prefix
    if (this.s_proj.project_StartDate) {
      if (this.prefix.length > 49) {
        this.prefix = this.prefix.concat(" or ")
      }
      this.prefix = this.prefix.concat(" Project_StartDate like '" + this.s_proj.project_StartDate.trim() + "' ")
    }
    //code to add proj end date to prefix
    if (this.s_proj.project_EndDate) {
      if (this.prefix.length > 49) {
        this.prefix = this.prefix.concat(" or ")
      }
      this.prefix = this.prefix.concat(" Project_EndDate like '" + this.s_proj.project_EndDate.trim() + "' ")
    }
    // code to add city to prefix
    if (this.s_proj.project_Location) {
      if (this.prefix.length > 49) {
        this.prefix = this.prefix.concat(" or ")
      }
      this.prefix = this.prefix.concat(" City like '%" + this.s_proj.project_Location.trim() + "%' ")
    }
    //code to add proj billable to prefix
    if (this.s_proj.project_Billable) {
      if (this.prefix.length > 49) {
        this.prefix = this.prefix.concat(" or ")
      }
      this.prefix = this.prefix.concat(" Project_Billable like '" + this.s_proj.project_Billable.trim() + "' ")
    }
    if (this.s_proj.customer_Details) {
      if (this.prefix.length > 49) {
        this.prefix = this.prefix.concat(" or ")
      }
      this.prefix = this.prefix.concat("Customer_Details like '%" + this.s_proj.customer_Details.trim() + "%' " )
    }

    console.log(this.prefix);
    return this.projectservice.searchQuery(this.prefix).subscribe((data: ProjectAttribute[]) => {
      this.projectlist = data;
      if (!this.projectlist.status) {
        this.dialogService.openAlertDialog(this.projectlist.exception.Message);
      }
      else {
        this.noData = false;
        this.data_Source = new MatTableDataSource(this.projectlist.data);
        if (this.data_Source.filteredData.length > 0) {
          this.noData = true;
        }
        this.load = 0;
        this.data_Source.paginator = this.paginator;
        this.data_Source.sort = this.sort;
        this.v_searchbar = false;
        this.PROJ = this.projectlist.data;}
     
    });
  }



  m_searchbar() {
    this.v_searchbar = !this.v_searchbar;
  }


  exportAsXLSX(): void {

    var excelData = [];

    for (let data of this.PROJ) { //this.projectlist is the object taken from Loadallemployees method

      excelData.push({

        'Project Name': data.project_Name,

        'Project Code': data.project_Code,

        'Project Description': data.project_Description,

        'Start Date': data.project_StartDate,

        'End Date': data.project_EndDate,

        'Status': data.project_Status,

        'Location': data.project_Location,

        'Billing': data.project_Billable,

        'Customer': data.customer_Details,

      })

    }

    this.excelService.exportAsExcelFile(excelData, 'Projects')

  }
  displayedColumns: string[] = ['edit', 'project_Name', 'project_Code', 'customer_Details', 'project_Description', 'project_StartDate', 'project_EndDate', 'project_Status', 'project_Location', 'project_Billable'];



  OnResetSearch()
  {
    this.projectForm.reset();
  }
}
