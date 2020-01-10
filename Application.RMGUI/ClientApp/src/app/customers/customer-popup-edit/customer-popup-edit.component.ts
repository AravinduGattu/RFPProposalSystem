import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from '../../services/CustomerService';
import { NotificationService } from '../../services/NotificationService';
import { Customer } from '../../models/Customer';
import { BaseLocation } from '../../models/BaseLocation';
import { BusinessGroup } from '../../models/BusinessGroup';
import { DialogService } from '../../services/dialog.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MyDateAdapter } from '../../shared/myDateAdapter';
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
  selector: 'app-customer-popup-edit',
  templateUrl: './customer-popup-edit.component.html',
  styleUrls: ['./customer-popup-edit.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class CustomerPopupEditComponent implements OnInit {
  customerStatus = '';
  show = false;
  custupdate: any;
  custs: Customer;
  cust: Customer[];
  public customerForm: FormGroup;
  custLocation: BaseLocation[];
  custBusinessGroup: BusinessGroup[];
  selectedoption;
  editable: boolean;
  title = 'EDIT CUSTOMER'
  custLocationCountry: BaseLocation[];
  data_Source: MatTableDataSource<Customer>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<CustomerPopupEditComponent>, private dialogService: DialogService, public customerService: CustomerService, private notificationservice: NotificationService) { }
  ngOnInit() {
    this.LoadCity();
    this.LoadBusinessGroup();
    this.LoadCountry();
    this.customerService.LoadCustomer();
   //this.dialogRef.updateSize('30%', '50%');
    this.customerForm = new FormGroup({
      business_group: new FormControl('', [Validators.required]),
      cust_code: new FormControl('', [Validators.required, Validators.minLength(4)]),
      cust_name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z_, ]+$')]),
      //project_Name: new FormControl('', [Validators.required]),
      country: new FormControl('', ),
      location_id: new FormControl(''),
      location: new FormControl(''),
      cust_status: new FormControl('', [Validators.required]),
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.customerForm.controls[controlName].hasError(errorName);
  }
  Submit() {
    if (this.customerService.customerForm.dirty === true) {
      if (this.customerService.customerForm.valid) {
        this.custs = Object.assign({}, this.customerService.customerForm.value);
        this.custs.city = this.custs.location;
        //this.custs.country = this.custs.location.country;
        //this.custs.region = this.custs.location.region;
        console.log(this.custs);
        return this.customerService.UpdateCustomer(this.custs).subscribe(
          result => {
            this.custupdate = result;
            if (!this.custupdate.status) {
              this.dialogService.openAlertDialog('Something went wrong, please try again.');
            }
            else {
              
              this.customerForm.reset();
        //      this.customerService.IntializeForm();
              this.notificationservice.success('Submitted successfully');
              this.LoadCustomer();
              this.Close();
                     
            }
          },
          err => {
            console.log(err);
          }
        );
      }

   }
    else {
      this.notificationservice.success('No Changes To Save');
    }
  }



  LoadCustomer() {
    this.customerService.GetAllCustomer()
      .subscribe((data: Customer[]) => {
        this.cust = data;
        this.data_Source = new MatTableDataSource <Customer>(this.cust);
        this.data_Source.sort = this.sort;
        this.data_Source.paginator = this.paginator;
      });
  }




  //changeValue(event: any) {
  //  this.show = false;
  //  alert('true');

  //}




  LoadCountry() {
    this.customerService.GetAllCountry()
      .subscribe((data: BaseLocation[]) => {
        this.custLocationCountry = data;
      });
  }
  // LoadCustomer() {
  //  this.customerService.GetAllCustomer()
  //    .subscribe((data: Customer[]) => {
  //      this.cust = data;
  //      //this.data_Source = new MatTableDataSource(this.cust);
  //    });
  //}
  LoadCity() {
    this.customerService.GetAllCity()
      .subscribe((data: BaseLocation[]) => {
        this.custLocation = data;
      });
  }
  LoadBusinessGroup() {
    this.customerService.GetAllBusinessGroups().subscribe((data: BusinessGroup[]) => {
      this.custBusinessGroup = data;
    })
  }
  Close() {
    //this.customerForm.reset();
    this.dialogRef.close();
  }
  Cancel() {
    this.dialogRef.close();
  }

  Clear() {
    this.customerService.customerForm.reset();
  }


}
