import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartAtt } from '../models/DepartAtt';
import { AdminService } from '../services/AdminConfigService';
import { MatTableDataSource, MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { ExcelService } from '../services/ExcelExport';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { BusinessgroupAtt } from '../models/businessgroupAtt';
import { UploadComponent } from '../upload/upload.component';
import { EditbussinesspopupComponent } from './editbussinesspopup/editbussinesspopup.component';
import { AddbusinessgrouppopupComponent } from './addbusinessgrouppopup/addbusinessgrouppopup.component';
import { DialogService } from '../services/dialog.service';
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
  selector: 'app-bussinessgroup',
  templateUrl: './bussinessgroup.component.html',
  styleUrls: ['./bussinessgroup.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class BussinessgroupComponent implements OnInit {

//new variables
bgData:any[]=[];
obj_bg:BusinessgroupAtt;
//


  public BGform: FormGroup;
  v_searchbar = true;
  s_Bg: BusinessgroupAtt;
  bg_status = '';
  load = 1;
  data_Source = new MatTableDataSource<BusinessgroupAtt>();
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  Businessgroup: MatTableDataSource<BusinessgroupAtt>;
  /*BG: BusinessgroupAtt[]*/;
  BG: any;
  businessGroup: BusinessgroupAtt[];
  prefix: string;
  constructor(private adminservice: AdminService, private excelService: ExcelService, public datepipe: DatePipe, private dialog: MatDialog, public dialogService: DialogService) { }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit() {
    //this.LoadBusinessgroup();
    this.BGform = new FormGroup({
      bg_description: new FormControl('', ),
      bg_status: new FormControl('', ),
      bg_startdate: new FormControl('', ),
      bg_enddate: new FormControl('', ),
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.BGform.controls[controlName].hasError(errorName);
  }
  ngAfterViewInit() {
    this.data_Source.paginator = this.paginator;
  }
  m_searchbar() {
    this.v_searchbar = !this.v_searchbar;
  }

  searchQuery() {
    this.obj_bg = Object.assign({}, this.BGform.value);

    this.obj_bg.bg_startdate = this.datepipe.transform(this.obj_bg.bg_startdate, 'yyyy-MM-dd');
    this.obj_bg.bg_enddate = this.datepipe.transform(this.obj_bg.bg_enddate, 'yyyy-MM-dd');
    
     this.obj_bg.bg_description==null?this.obj_bg.bg_description='':this.obj_bg.bg_description=this.obj_bg.bg_description;
     this.obj_bg.bg_startdate==null?this.obj_bg.bg_startdate='':this.obj_bg.bg_startdate=this.obj_bg.bg_startdate;
     this.obj_bg.bg_enddate==null?this.obj_bg.bg_enddate='':this.obj_bg.bg_enddate=this.obj_bg.bg_enddate;

    // if(this.obj_bg.bg_startdate==null){
    //   this.obj_bg.bg_startdate='';
    // }
      console.log(this.obj_bg);
    this.adminservice.getAllBusinessGroups(this.obj_bg.bg_description,this.obj_bg.bg_startdate,this.obj_bg.bg_enddate).subscribe((response: any[]) => {

      if (response) {
        this.bgData = response;
        this.data_Source = new MatTableDataSource<any>(this.bgData);
        //  this.data_Source.data = this.BG;
          this.load = 0;
          this.data_Source.paginator = this.paginator;
          this.v_searchbar = false;
          this.businessGroup = this.bgData;
        

      } else {
      }
    },
    error => {
      console.log(error)
    });




     

  }


  searchQuery1() {
    this.prefix = 'select * from view_getallbusinessgroup';

    this.s_Bg = Object.assign({}, this.BGform.value);

this.s_Bg.bg_startdate = this.datepipe.transform(this.s_Bg.bg_startdate, 'yyyy-MM-dd');
this.s_Bg.bg_enddate = this.datepipe.transform(this.s_Bg.bg_enddate, 'yyyy-MM-dd');

console.log(this.s_Bg.bg_startdate);
    console.log(this.prefix.length + ":length");
    console.log(this.s_Bg);
    //code to add where to prefix
if (this.s_Bg.bg_description|| this.s_Bg.bg_startdate || this.s_Bg.bg_enddate) {
      this.prefix = this.prefix.concat(' where');
      console.log(this.prefix.length + ":length");
    }
    //code to add proj name to prefix
if (this.s_Bg.bg_description) {
  if (this.prefix.length > 54) {
    this.prefix = this.prefix.concat(" or ")
  }
  this.prefix = this.prefix.concat(" bg_desc like '%" + this.s_Bg.bg_description.trim() + "%' ");
    }
    //code to add proj start date to prefix
    if (this.s_Bg.bg_startdate) {
      if (this.prefix.length > 54) {
        this.prefix = this.prefix.concat(" or ")
      }
      this.prefix = this.prefix.concat(" bg_start_date like '%" + this.s_Bg.bg_startdate.trim() + "%' ")
    }
    //code to add proj end date to prefix
    if (this.s_Bg.bg_enddate) {
      if (this.prefix.length > 54) {
        this.prefix = this.prefix.concat(" or ")
      }
      this.prefix = this.prefix.concat(" bg_end_date like '%" + this.s_Bg.bg_enddate.trim()+ "%' ")
    }
    return this.adminservice.searchQueryBusinessgroup(this.prefix).subscribe((data: BusinessgroupAtt[]) => {
      this.BG = data;
      if (!this.BG.status) {
        this.dialogService.openAlertDialog("Something is Wrong, Please Try Again");
      }
      this.data_Source = new MatTableDataSource<BusinessgroupAtt>(this.BG.data);
    //  this.data_Source.data = this.BG;
      this.load = 0;
      this.data_Source.paginator = this.paginator;
      this.v_searchbar = false;
      this.businessGroup = this.BG.data;
    });
  }
  LoadBusinessgroup() {
    this.adminservice.GetAllBusinessgroup().subscribe((data: BusinessgroupAtt[]) => {
      this.BG = data;
      if (!this.BG.status) {
        this.dialogService.openAlertDialog("Something is Wrong, Please Try Again");
      }
      this.data_Source = new MatTableDataSource<BusinessgroupAtt>(this.BG.data);
      this.data_Source.sort = this.sort;
      this.data_Source.paginator = this.paginator;
      this.businessGroup = this.BG.data;
    });
  }

  openDialog() {
    this.adminservice.InitializeFormbg();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "40%";
    this.dialog.open(AddbusinessgrouppopupComponent, dialogConfig).afterClosed().subscribe((result) => {
      if (result = !null) {
        this.LoadBusinessgroup();
      }
    });
  }
  onEdit(row) {
    this.adminservice.populateFormbusiness(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(EditbussinesspopupComponent, dialogConfig).afterClosed().subscribe((result) => {
      if (result = !null) {
        this.LoadBusinessgroup();
      }
    });
  }
  exportAsXLSX(): void {
    //this.excelService.exportAsExcelFile(this.BG, 'Business Group');
    var excelData = [];
    for (let data of this.businessGroup) {
      excelData.push({
        'Business Group': data.bg_description,
        'Status': data.bg_status,
        'Start Date': data.bg_startdate,
          'End Date': data.bg_enddate

      })

    }

    this.excelService.exportAsExcelFile(excelData, 'Business Group')

  }




displayedColumns: string[] = ['edit', 'bg_description', 'bg_status', 'bg_startdate', 'bg_enddate'];

  selection = new SelectionModel<BusinessgroupAtt>(true, []);

  openImport() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(UploadComponent, dialogConfig);
  }

  OnResetSearch()
  {
    this.BGform.reset();
  }
}
