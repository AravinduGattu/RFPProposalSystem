import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { Vendor } from '../../models/Vendor';
import { VendorService } from '../../services/VendorService';
import { NotificationService } from '../../services/NotificationService';

@Component({
  selector: 'app-vendor-insert-pop-up',
  templateUrl: './vendor-insert-pop-up.component.html',
  styleUrls: ['./vendor-insert-pop-up.component.css']
})
export class VendorInsertPopUpComponent implements OnInit {
    vendorStatus = '';
  vendors: Vendor[] = [];
  vendor: Vendor[];
  //EditRowId: any = '';
  public vendorForm: FormGroup;
  title = 'ADD VENDOR'
 
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<VendorInsertPopUpComponent>, public vendorService: VendorService, private notificationservice: NotificationService) { }

  ngOnInit() {
    this.LoadVendor();
    this.vendorForm = new FormGroup({
      vendor_id: new FormControl(''),
      //vendor_code: new FormControl(''),
      vendor_name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z, ]+$')]),
      email: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(13), Validators.pattern('[0-9]+$')]),
      telephone: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(13), Validators.pattern('[0-9]+$')]),
      vendor_site: new FormControl('', [Validators.required]),
      //vendor_status: new FormControl('', [Validators.required]),
      vendor_startdate: new FormControl('', [Validators.required]),
      vendor_enddate: new FormControl('', [Validators.required]),
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.vendorForm.controls[controlName].hasError(errorName);

  }
  OnSubmit() {
    if (this.vendorForm.valid) {

      this.vendors = Object.assign({}, this.vendorForm.value);
      return this.vendorService.AddVendor(this.vendors).subscribe(
        result => {
          console.log(result);
          this.dialogRef.close(this.vendorForm.value);
          this.vendorForm.reset();
          this.notificationservice.success('Submitted Succesfully');
          this.Close();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  LoadVendor() {
    this.vendorService.GetAllVendor()
      .subscribe((data: Vendor[]) => {
        this.vendor = data;
      });
  }

  Close() {
    this.vendorForm.reset();
    this.dialogRef.close();
  }

  Clear() {
    this.vendorForm.reset();
    //this.customerService.IntializeForm();
    //this.notificationservice.success(':: Cleared successfully');
  }
  
 }
