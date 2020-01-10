import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../services/CustomerService';
import { Customer } from '../models/Customer';
import { BaseLocation } from '../models/BaseLocation';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ExcelService } from '../services/ExcelExport';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { BusinessGroup } from '../models/BusinessGroup';
import { UploadComponent } from '../upload/upload.component';
import { CustomerPopupInsertComponent } from './customer-popup-insert/customer-popup-insert.component';
import { CustomerPopupEditComponent } from './customer-popup-edit/customer-popup-edit.component';
import { UserService } from '../services/UserService';
import { UserRole } from '../models/UserRole';
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
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class CustomersComponent implements OnInit {
  customerStatus = '';
  obj_Cust: Customer;
  list_customers: Customer[]=[];
  custs: Customer[] = [];
  cust: any;
  //cust: Customer[]=[];
  custLocation: BaseLocation[];
  CUST: Customer[];
  custBusinessGroup: BusinessGroup[];
  public customerForm: FormGroup;
  EditRowId: any = '';
  data_Source: MatTableDataSource<Customer>;
  v_custSearchQuery: string;
  vload = 1;
  v_searchbar = true;
  utype: UserRole;
  v_type: string;
  disable: string;
  noData: boolean;
  custLocationCountry: BaseLocation[];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  selection = new SelectionModel<Customer>(true, []);
  constructor(public customerService: CustomerService, private userService: UserService, private excelService: ExcelService, private dialogService: DialogService , private dialog: MatDialog) { }
  ngOnInit() {
    this.LoadCity();
    this.LoadBusinessGroup();
    this.LoadCountry();
  //  this.LoadCustomer();
    this.customerForm = new FormGroup({
      business_group: new FormControl(''),
      cust_code: new FormControl('',),
      cust_name: new FormControl('',),
      //project_Name: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl(''),
      region: new FormControl('',),
      cust_status: new FormControl(''),
    });

    

    let v_utype = sessionStorage.getItem("userType");

    if (v_utype == 'OP' || v_utype == 'TA' || v_utype == 'TA_ADMIN' || v_utype == 'FINANCE' || v_utype == 'COE' || v_utype == 'PM') {
      this.disable = v_utype;
    }
      }

  public hasError = (controlName: string, errorName: string) => {
    return this.customerForm.controls[controlName].hasError(errorName);

  }
  openPopup() {
        const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "40%";
    //dialogConfig.height = "50 %";

    this.dialog.open(CustomerPopupInsertComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result = !null) {
        this.LoadCustomer();
      }
    });
  }
  editPopup(row) {
    this.customerService.populatecustomerForm(row);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    //dialogConfig.height = "50 %";

    this.dialog.open(CustomerPopupEditComponent, dialogConfig).afterClosed().subscribe(result => {
      if (result = !null) {
        this.LoadCustomer();
      }
    });
  }

  LoadCustomer() {
    //this.customerService.GetAllCustomer()
    //  .subscribe((data: Customer[]) => {
    //    this.cust = data;
    //    if (!this.cust.status) {
    //      this.dialogService.openAlertDialog('Something went wrong! Please try again.');
    //    }
    //    this.data_Source = new MatTableDataSource(this.cust.data);
    //    this.data_Source.sort = this.sort;
    //    this.data_Source.paginator = this.paginator;
    //  });
    this.v_custSearchQuery = 'SELECT * FROM view_getallcustomers';
    return this.customerService.custSearchQuery(this.v_custSearchQuery).subscribe((data: Customer[]) => {
      this.cust = data;
      if (!this.cust.status) {
        this.dialogService.openAlertDialog('Something went wrong! Please try again.');
      }
      this.data_Source = new MatTableDataSource<Customer>(this.cust.data);
      this.vload = 0;
      this.data_Source.paginator = this.paginator;
      this.data_Source.sort = this.sort;
      this.v_searchbar = false;
    });


  }


 
 
  openImport() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(UploadComponent, dialogConfig);
  }

  

  m_customerSearchQuery() {

    this.v_custSearchQuery = 'SELECT * FROM view_getallcustomers';

    this.obj_Cust = Object.assign({}, this.customerForm.value);
    if (this.obj_Cust.business_group || this.obj_Cust.cust_code || this.obj_Cust.cust_name /*|| this.obj_Cust.project_Name*/ || this.obj_Cust.city || this.obj_Cust.country || this.obj_Cust.region || this.obj_Cust.cust_status) {
      this.v_custSearchQuery = this.v_custSearchQuery.concat(' where');
      console.log(this.v_custSearchQuery.length)
    }
    if (this.obj_Cust.business_group) {
      if (this.v_custSearchQuery.length > 49) {
        this.v_custSearchQuery = this.v_custSearchQuery.concat(" or ")
      }
      this.v_custSearchQuery = this.v_custSearchQuery.concat(" bg_desc like '%" + this.obj_Cust.business_group.trim() + "%' ");
    }
    if (this.obj_Cust.cust_code) {
      if (this.v_custSearchQuery.length > 49) {
        this.v_custSearchQuery = this.v_custSearchQuery.concat(" or ")
      }
      this.v_custSearchQuery = this.v_custSearchQuery.concat(" cust_code like '%" + this.obj_Cust.cust_code.trim() + "%' ");
    }
    if (this.obj_Cust.cust_name) {
      if (this.v_custSearchQuery.length > 49) {
        this.v_custSearchQuery = this.v_custSearchQuery.concat(" or ")
      }
      this.v_custSearchQuery = this.v_custSearchQuery.concat(" cust_name like '%" + this.obj_Cust.cust_name.trim() + "%' ");
    }
    //if (this.obj_Cust.project_Name) {
    //  if (this.v_custSearchQuery.length > 49) {
    //    this.v_custSearchQuery = this.v_custSearchQuery.concat(" and ")
    //  }
    //  this.v_custSearchQuery = this.v_custSearchQuery.concat(" Project_Name like '%" + this.obj_Cust.project_Name + "%' ");
    //}

    if (this.obj_Cust.city) {
      if (this.v_custSearchQuery.length > 49) {
        this.v_custSearchQuery = this.v_custSearchQuery.concat(" or ")
      }
      this.v_custSearchQuery = this.v_custSearchQuery.concat(" city like '%" + this.obj_Cust.city.trim() + "%' ");
    }
    if (this.obj_Cust.country) {
      if (this.v_custSearchQuery.length > 49) {
        this.v_custSearchQuery = this.v_custSearchQuery.concat(" or ")
      }
      this.v_custSearchQuery = this.v_custSearchQuery.concat(" Country like '%" + this.obj_Cust.country.trim() + "%' ");
    }

    if (this.obj_Cust.region) {
      if (this.v_custSearchQuery.length > 49) {
        this.v_custSearchQuery = this.v_custSearchQuery.concat(" or ")
      }
      this.v_custSearchQuery = this.v_custSearchQuery.concat(" region like '%" + this.obj_Cust.region.trim() + "%' ");
    }
    
    if (this.obj_Cust.cust_status) {
      if (this.v_custSearchQuery.length > 49) {
        this.v_custSearchQuery = this.v_custSearchQuery.concat(" or ")
      }
      this.v_custSearchQuery = this.v_custSearchQuery.concat(" cust_status like '%" + this.obj_Cust.cust_status.trim() + "%' ");
    }


    console.log(this.v_custSearchQuery);

    return this.customerService.custSearchQuery(this.v_custSearchQuery).subscribe((data: Customer[]) => {
      this.cust = data;
      if (!this.cust.status) {
        this.dialogService.openAlertDialog('Something went wrong! Please try again.');
      }
      else {
        this.noData = false;
        this.data_Source = new MatTableDataSource<Customer>(this.cust.data);
        if (this.data_Source.filteredData.length > 0) {
          this.noData = true;
        }
        this.vload = 0;
        this.data_Source.paginator = this.paginator;
        this.data_Source.sort = this.sort;
        this.v_searchbar = false;
        this.CUST = this.cust.data;
      }

                           
    });


  }

  m_searchbar() {
    this.v_searchbar = !this.v_searchbar;
    window.scrollTo(0, 0);
  }
  LoadBusinessGroup() {
    this.customerService.GetAllBusinessGroups().subscribe((data: BusinessGroup[]) => {
      this.custBusinessGroup = data;
    })
  }

  LoadCity() {
    this.customerService.GetAllCity()
      .subscribe((data: BaseLocation[]) => {
        this.custLocation = data;
      });
  }
  LoadCountry() {
    this.customerService.GetAllCountry()
      .subscribe((data: BaseLocation[]) => {
        this.custLocationCountry = data;
      });
  }
  //exportAsXLSX(): void {
  //  this.excelService.exportAsExcelFile(this.cust, 'Customer');
  //}


  exportAsXLSX(): void {

    var excelData = [];

    for (let data of this.CUST) { //this.employee is the object taken from Loadallemployees method

      excelData.push({

        'Business Group': data.business_group,

        'Customer Code': data.cust_code,

        'Customer Name': data.cust_name,

        'City': data.city,

        'Country': data.country,

        'Region': data.region,

        'Customer Status': data.cust_status
                
      })

    }

    this.excelService.exportAsExcelFile(excelData, 'Customer')

  }



  displayedColumns: string[] = ['edit', 'business_group', 'cust_code', 'cust_name',  'city', 'country', 'region', 'cust_status'];

  OnResetSearch()
  {
    this.customerForm.reset();
  }
}
