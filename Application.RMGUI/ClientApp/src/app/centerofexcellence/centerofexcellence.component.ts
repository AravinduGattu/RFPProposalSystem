import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartAtt } from '../models/DepartAtt';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { ExcelService } from '../services/ExcelExport';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { CoeAtt } from '../models/CoeAtt';
import { AdminService } from '../services/AdminConfigService';
import { UploadComponent } from '../upload/upload.component';
import { CoeAddPopupComponent } from './coe-add-popup/coe-add-popup.component';
import { CoeEditPopupComponent } from './coe-edit-popup/coe-edit-popup.component';
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
  selector: 'app-centerofexcellence',
  templateUrl: './centerofexcellence.component.html',
  styleUrls: ['./centerofexcellence.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class CenterofexcellenceComponent implements OnInit {
  public coeform: FormGroup;
  v_searchbar = true;
  s_coe: CoeAtt;
  coestatus = '';
  load = 1;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  data_Source = new MatTableDataSource<CoeAtt>();
  coe: MatTableDataSource<CoeAtt>;
  //Coe: CoeAtt[];
  Coe: any;
  COE: CoeAtt[];
  prefix: string;
  constructor(private adminservice: AdminService, private excelService: ExcelService, private dialog: MatDialog, private dialogService: DialogService, public datepipe: DatePipe) { }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  ngOnInit() {
   // this.LoadCoe();
    this.coeform = new FormGroup({
      coe: new FormControl('', ),
      coeStatus: new FormControl('', ),
      coeStartDate: new FormControl('', ),
      coeEndDate: new FormControl('', ),
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.coeform.controls[controlName].hasError(errorName);
  }
  ngAfterViewInit() {
    this.data_Source.paginator = this.paginator;
  }
  m_searchbar() {
    this.v_searchbar = !this.v_searchbar;
  }
  searchQuery() {

    this.prefix = 'select * from view_getallcoe';

    this.s_coe = Object.assign({}, this.coeform.value);

    this.s_coe.coeStartDate = this.datepipe.transform(this.s_coe.coeStartDate, 'yyyy-MM-dd');
    this.s_coe.coeEndDate = this.datepipe.transform(this.s_coe.coeEndDate, 'yyyy-MM-dd');
    
    //code to add where to prefix
    if (this.s_coe.coe || this.s_coe.coeStartDate || this.s_coe.coeEndDate) {
      this.prefix = this.prefix.concat(' where');
     
    }
    //code to add coe name to prefix
    if (this.s_coe.coe) {
      if (this.prefix.length > 43) {
        this.prefix = this.prefix.concat(" or ")
      }
      this.prefix = this.prefix.concat(" Coe_Description like '%" + this.s_coe.coe.trim() + "%' ");
    }
   
    //code to add coe start date to prefix
    if (this.s_coe.coeStartDate) {
      if (this.prefix.length > 43) {
        this.prefix = this.prefix.concat(" or ")
      }
      this.prefix = this.prefix.concat(" COE_StartDate like '" + this.s_coe.coeStartDate.trim()+ "' ")
    }
    //code to add coe end date to prefix
    if (this.s_coe.coeEndDate) {
      if (this.prefix.length > 43) {
        this.prefix = this.prefix.concat(" or ")
      }
      this.prefix = this.prefix.concat(" COE_EndDate like '" + this.s_coe.coeEndDate + "' ")
    }
    return this.adminservice.searchQuerycoe(this.prefix).subscribe((data: CoeAtt[]) => {
      this.Coe = data;
      if (!this.Coe.status) {
        this.dialogService.openAlertDialog('Something went wrong! Please try again.');
      }
      this.data_Source = new MatTableDataSource<CoeAtt>(this.Coe.data);
     // this.data_Source.data = this.Coe;
      this.load = 0;
      this.data_Source.paginator = this.paginator;
      this.v_searchbar = false;
      this.COE = this.Coe.data;
    });
  }

  LoadCoe() {
    this.adminservice.GetAllCOE().subscribe((data: CoeAtt[]) => {
      this.Coe = data;
      if (!this.Coe.status) {
        this.dialogService.openAlertDialog(this.Coe.exception.Message);
      }
      this.data_Source = new MatTableDataSource<CoeAtt>(this.Coe.data);
      this.data_Source.sort = this.sort;
      this.data_Source.paginator = this.paginator;
    });
  }
  openDialog() {
    this.adminservice.InitializeForm();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "40%";
    this.dialog.open(CoeAddPopupComponent, dialogConfig).afterClosed().subscribe((result) => {
      if (result = !null) {
        this.LoadCoe()
      }
    });
  }
  onEdit(row) {
    this.adminservice.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(CoeEditPopupComponent, dialogConfig).afterClosed().subscribe((result) => {
      if (result = !null) {
        this.LoadCoe()
      }
    });
     
  }
  
  exportAsXLSX(): void {
    var excelData = [];
    for (let data of this.COE) {
      excelData.push({
        'Center Of Excellence': data.coe,
        'Status': data.coeStatus,
        'Start Date': data.coeStartDate,
        'End Date': data.coeEndDate

      })

    }

    this.excelService.exportAsExcelFile(excelData, 'Center Of Excellence');

  }


  displayedColumns: string[] = ['edit', 'coe', 'coeStatus', 'coeStartDate', 'coeEndDate'];

  selection = new SelectionModel<CoeAtt>(true, []);

  openImport() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(UploadComponent, dialogConfig);
  }

  OnResetSearch()
  {
    this.coeform.reset();
  }

}
