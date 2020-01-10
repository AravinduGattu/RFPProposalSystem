import { Component, OnInit, ViewChild } from '@angular/core';
import { Vendor } from '../models/Vendor';
import { MatTableDataSource, MatDialogConfig, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VendorService } from '../services/VendorService';
import { ExcelService } from '../services/ExcelExport';
import { UploadComponent } from '../upload/upload.component';
import { VendorInsertPopUpComponent } from './vendor-insert-pop-up/vendor-insert-pop-up.component';
import { VendorEditPopUpComponent } from './vendor-edit-pop-up/vendor-edit-pop-up.component';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  vendors: Vendor[] = [];
  vendor: Vendor[]=[];
  EditRowId: any = '';
  obj_vendor: Vendor;
  vendorStatus = '';
  list_vendors: Vendor[] = [];
  
  public vendorForm: FormGroup;
  data_Source: MatTableDataSource<Vendor>;
  v_vendorSearchQuery: string;
  vload = 1;
  v_searchbar = true;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(private vendorService: VendorService, private excelService: ExcelService, private dialog: MatDialog, ) { }

  ngOnInit() {
    this.LoadVendor();
    this.vendorForm = new FormGroup({
      vendor_id: new FormControl(''),
      vendor_code: new FormControl(''),
      vendor_name: new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z, ]+$')]),
      email: new FormControl('',),
      mobile: new FormControl('',[Validators.pattern('[0-9]+$')]),
      telephone: new FormControl('',[Validators.pattern('[0-9]+$')]),
      vendor_site: new FormControl(''),
      vendor_status: new FormControl(''),
      vendor_startdate: new FormControl(''),
      vendor_enddate: new FormControl(''),
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.vendorForm.controls[controlName].hasError(errorName);

  }
  LoadVendor() {
    this.vendorService.GetAllVendor()
      .subscribe((data: Vendor[]) => {
        this.vendor = data;
        this.data_Source = new MatTableDataSource(this.vendor);
      });
  }

  openPopup() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    //dialogConfig.height = "70 %";

    this.dialog.open(VendorInsertPopUpComponent, dialogConfig);

  }

  openImport() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {type:'vendor'};
    this.dialog.open(UploadComponent, dialogConfig);
  }
  editPopup(row) {
    this.vendorService.populatevendorForm(row);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    //dialogConfig.height = "60 %";

    this.dialog.open(VendorEditPopUpComponent, dialogConfig);
    //const dialogRef = this.dialog.open(CustomerPopupInsertComponent, dialogConfig);

    //dialogRef.afterClosed().subscribe(
    //  data => console.log("Dialog output:", data)
    //);
  }
  //<!--vendor_code
  // vendor_name
  // email_id
  // phone
  // vendor_role
  // vendor_status
  // vendor_startdate
  // vendor_enddate-->


  m_vendorSearchQuery() {

    this.v_vendorSearchQuery = 'SELECT * FROM pact_rmg.view_getallvendors';

    this.obj_vendor = Object.assign({}, this.vendorForm.value);
    if (this.obj_vendor.vendor_code || this.obj_vendor.vendor_name || this.obj_vendor.email || this.obj_vendor.mobile || this.obj_vendor.telephone || this.obj_vendor.vendor_site || this.obj_vendor.vendor_status || this.obj_vendor.vendor_startdate || this.obj_vendor.vendor_enddate) {
      this.v_vendorSearchQuery = this.v_vendorSearchQuery.concat(' where');
      console.log(this.v_vendorSearchQuery.length)
    }
    if (this.obj_vendor.vendor_code) {
      if (this.v_vendorSearchQuery.length > 49) {
        this.v_vendorSearchQuery = this.v_vendorSearchQuery.concat(" or ")
      }
      this.v_vendorSearchQuery = this.v_vendorSearchQuery.concat(" vendor_code like '%" + this.obj_vendor.vendor_code.trim() + "%' ");
    }
    if (this.obj_vendor.vendor_name) {
      if (this.v_vendorSearchQuery.length > 49) {
        this.v_vendorSearchQuery = this.v_vendorSearchQuery.concat(" or ")
      }
      this.v_vendorSearchQuery = this.v_vendorSearchQuery.concat(" vendor_name like '%" + this.obj_vendor.vendor_name.trim() + "%' ");
    }
    if (this.obj_vendor.email) {
      if (this.v_vendorSearchQuery.length > 49) {
        this.v_vendorSearchQuery = this.v_vendorSearchQuery.concat(" or ")
      }
      this.v_vendorSearchQuery = this.v_vendorSearchQuery.concat(" email like '%" + this.obj_vendor.email.trim() + "%' ");
    }
    if (this.obj_vendor.mobile) {
      if (this.v_vendorSearchQuery.length > 49) {
        this.v_vendorSearchQuery = this.v_vendorSearchQuery.concat(" and ")
      }
      this.v_vendorSearchQuery = this.v_vendorSearchQuery.concat(" mobile like '%" + this.obj_vendor.mobile.trim() + "%' ");
    }
    if (this.obj_vendor.telephone) {
      if (this.v_vendorSearchQuery.length > 49) {
        this.v_vendorSearchQuery = this.v_vendorSearchQuery.concat(" or ")
      }
      this.v_vendorSearchQuery = this.v_vendorSearchQuery.concat(" telephone like '%" + this.obj_vendor.telephone.trim() + "%' ");
    }

    if (this.obj_vendor.vendor_site) {
      if (this.v_vendorSearchQuery.length > 49) {
        this.v_vendorSearchQuery = this.v_vendorSearchQuery.concat(" or ")
      }
      this.v_vendorSearchQuery = this.v_vendorSearchQuery.concat(" vendor_site like '%" + this.obj_vendor.vendor_site.trim() + "%' ");
    }
    if (this.obj_vendor.vendor_status) {
      if (this.v_vendorSearchQuery.length > 49) {
        this.v_vendorSearchQuery = this.v_vendorSearchQuery.concat(" or ")
      }
      this.v_vendorSearchQuery = this.v_vendorSearchQuery.concat(" vendor_status like '%" + this.obj_vendor.vendor_status.trim() + "%' ");
    }
    if (this.obj_vendor.vendor_startdate) {
      if (this.v_vendorSearchQuery.length > 49) {
        this.v_vendorSearchQuery = this.v_vendorSearchQuery.concat(" or ")
      }
      this.v_vendorSearchQuery = this.v_vendorSearchQuery.concat(" vendor_startdate like '%" + this.obj_vendor.vendor_startdate.trim() + "%' ");
    }
    if (this.obj_vendor.vendor_enddate) {
      if (this.v_vendorSearchQuery.length > 49) {
        this.v_vendorSearchQuery = this.v_vendorSearchQuery.concat(" or ")
      }
      this.v_vendorSearchQuery = this.v_vendorSearchQuery.concat(" vendor_enddate like '%" + this.obj_vendor.vendor_enddate.trim() + "%' ");
    }

    console.log(this.v_vendorSearchQuery);

    return this.vendorService.vendorSearchQuery(this.v_vendorSearchQuery).subscribe((data: Vendor[]) => {
      this.vendor = data;
      this.data_Source = new MatTableDataSource(this.vendor);
      this.vload = 0;
      this.data_Source.paginator = this.paginator;
      this.data_Source.sort = this.sort;
      this.v_searchbar = false;
    });

  }
  m_searchbar() {
    this.v_searchbar = !this.v_searchbar;
  }


  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.vendor, 'Vendor');
  }
  displayedColumns: string[] = ['edit', 'vendor_code', 'vendor_name', 'email', 'mobile','telephone', 'vendor_site', 'vendor_status', 'vendor_startdate', 'vendor_enddate'];
}
