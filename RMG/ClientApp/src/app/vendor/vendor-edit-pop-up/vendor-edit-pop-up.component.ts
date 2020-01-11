import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { VendorService } from '../../services/VendorService';
import { NotificationService } from '../../services/NotificationService';
import { Vendor } from '../../models/Vendor';

@Component({
  selector: 'app-vendor-edit-pop-up',
  templateUrl: './vendor-edit-pop-up.component.html',
  styleUrls: ['./vendor-edit-pop-up.component.css']
})
export class VendorEditPopUpComponent implements OnInit {

  vendorStatus = '';
  vendors: Vendor[] = [];
  vendor: Vendor[];
  //EditRowId: any = '';
  public vendorForm: FormGroup;
  title = 'EDIT VENDOR'

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<VendorEditPopUpComponent>, public vendorService: VendorService, private notificationservice: NotificationService) { }

  ngOnInit() {
    this.LoadVendor();
    this.vendorForm = new FormGroup({
      vendor_id: new FormControl(''),
      vendor_code: new FormControl(''),
      vendor_name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z, ]+$')]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[.com]+$')]),
      mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(13), Validators.pattern('[0-9]+$')]),
      telephone: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(13), Validators.pattern('[0-9]+$')]),
      vendor_site: new FormControl('', [Validators.required]),
      vendor_status: new FormControl('', [Validators.required]),
      vendor_startdate: new FormControl('', [Validators.required]),
      vendor_enddate: new FormControl('', [Validators.required]),
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.vendorForm.controls[controlName].hasError(errorName);

  }
  Submit() {
    if (this.vendorService.vendorForm.valid) {
            this.vendors = Object.assign({}, this.vendorService.vendorForm.value);
      return this.vendorService.UpdateVendor(this.vendors).subscribe(
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
