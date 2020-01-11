import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../../services/NotificationService';
import { CustomerService } from '../../services/CustomerService';
import { Customer } from '../../models/Customer';
import { BaseLocation } from '../../models/BaseLocation';
import { BusinessGroup } from '../../models/BusinessGroup';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-customer-popup-insert',
  templateUrl: './customer-popup-insert.component.html',
  styleUrls: ['./customer-popup-insert.component.css']
})
export class CustomerPopupInsertComponent implements OnInit {
  customerStatus = '';
  custs: Customer;
  cust: Customer[];
  custadd: any;
  data_Source: MatTableDataSource<Customer>;
  public customerForm: FormGroup;
  custLocation: BaseLocation[];
  getCities: BaseLocation[];
  custBusinessGroup: BusinessGroup[];
  title = 'ADD CUSTOMER'
  custLocationCountry: BaseLocation[];
 
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<CustomerPopupInsertComponent>, public customerService: CustomerService, private notificationservice: NotificationService, private dialogService: DialogService) { }


  ngOnInit() {
    this.LoadCity();
    this.LoadCustomer();
    this.LoadBusinessGroup(); 
    //this.LoadCountry();
    //this.dialogRef.updateSize('30%', '50%');
    this.customerForm = new FormGroup({
      business_group: new FormControl('', [Validators.required]),
      cust_code: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      cust_name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z_, ]+$'), Validators.maxLength(30)]),
      //project_Name: new FormControl('', [Validators.required]),
      country: new FormControl(''),
      city: new FormControl(''),
      location: new FormControl(''),
      location_id: new FormControl('', ),
      //cust_status: new FormControl('', [Validators.required]),
      created_by: new FormControl(sessionStorage.getItem('empId')),
        });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.customerForm.controls[controlName].hasError(errorName);

  }
  //LoadCountry() {
  //  this.customerService.GetAllCountry()
  //    .subscribe((data: BaseLocation[]) => {
  //      this.custLocationCountry = data;
  //    });
  //}

  //OnSubmit() {
  //  if (this.customerForm.valid) {

  //    this.custs = Object.assign({}, this.customerForm.value);


  //    return this.customerService.AddCustomer(this.custs).subscribe(
  //      result => {
  //        console.log(result);
  //        this.dialogRef.close(this.customerForm.value);
  //        this.LoadCustomer();
  //        this.dialogRef.close();
  //        alert('submitted succesfully');
  //        this.customerForm.reset();
         
  //      },
  //      err => {
  //        console.log(err);
  //      }
  //    );
  //  }
  //}

  OnSubmit() {
    //if (this.customerForm.dirty === true)
    //{
      if (this.customerForm.valid)
      {
        this.custs = Object.assign({}, this.customerForm.value);
        this.custs.city = this.custs.location;
        //this.custs.country = this.custs.location.country;
        //this.custs.region = this.custs.location.region;
        
        return this.customerService.AddCustomer(this.custs).subscribe(
          result => {
            this.custadd = result;
            if (!this.custadd.status) {
              this.dialogService.openAlertDialog('Something went wrong, please try again.');
            }
            else {
              this.customerForm.reset();
              //this.customerService.IntializeForm();
              this.notificationservice.success('Submitted Succesfully');
              this.LoadCustomer();
              this.dialogRef.close();
              this.Close();
            }
            },  
          err => {
            console.log(err);
          }
        );
      }
    
    else {
      this.notificationservice.warn('Please enter the details');
    }
  }

  LoadCustomer() {
    this.customerService.GetAllCustomer()
      .subscribe((data: Customer[]) => {
        this.cust = data;
        this.data_Source = new MatTableDataSource(this.cust);
      });
  }
  LoadCity() {
    this.customerService.GetAllCity()
      .subscribe((data: BaseLocation[]) => {
        this.custLocation = data;
        this.getCities = data;
      });
  }
  GetCities(event: any) {
    alert(event.option.value);
    this.getCities = this.custLocation.filter(data => data.country === event.option.value);
  }
  LoadBusinessGroup() {
    this.customerService.GetAllBusinessGroups().subscribe((data: BusinessGroup[]) => {
      this.custBusinessGroup = data;
    })
  }
  
  Close() {
    this.customerForm.reset();
    this.dialogRef.close();
  }
  
 Clear() {
   if (this.customerForm.touched == true) {
     this.customerForm.reset();
      this.notificationservice.success('Cleared Succesfully');
    }
    else {
      this.notificationservice.warn('There is nothing to Clear');
    }

  }

 


}
