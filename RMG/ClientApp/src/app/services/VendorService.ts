import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Vendor } from '../models/Vendor';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
@Injectable()
export class VendorService {
  constructor(private http: HttpClient) { }

  vendorForm = new FormGroup({
    vendor_id: new FormControl(''),
    vendor_code: new FormControl(''),
    vendor_name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z, ]+$')]),
    email: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(13), Validators.pattern('[0-9]+$')]),
    telephone: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(13), Validators.pattern('[0-9]+$')]),
    vendor_site: new FormControl(''),
      vendor_status: new FormControl(''),
   vendor_startdate: new FormControl(''),
  vendor_enddate: new FormControl(''),
  });

  IntializeForm() {
    this.vendorForm.setValue({
      vendor_id: '',
      vendor_code: '',
      vendor_name: '',
      email: '',
      mobile: '',
      telephone:'',
      vendor_site: '',
    vendor_status: '',
      vendor_startdate: '',
      vendor_enddate: '',
    })
  }


  GetAllVendor() {
    return this.http.get<Vendor[]>(`api/Vendor/GetAllVendor`)
  }


  AddVendor(vendor: Vendor[]): Observable<Vendor[]> {

    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<Vendor[]>('api/Vendor/AddVendor', JSON.stringify(vendor), options);

  }
  vendorSearchQuery(pquery: string) {
    const params = new HttpParams()
      .set('query', pquery);

    return this.http.get<Vendor[]>(`api/Vendor/vendorSearchQuery`, { params })
  }

  UpdateVendor(vendor) {

    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.put('api/Vendor/UpdateVendor', vendor);

  }
  //DeleteVendor(vendor_code: string) {

  //  const params = new HttpParams()
  //    .set('vendor_code', vendor_code);
  //  return this.http.get('api/Vendor/DeleteVendor', { params });
  //}
  //EmployeeNameDropdown() {
  //  return this.http.get('api/Vendor/EmployeeNameDropdown')
  //}
  populatevendorForm(vendor) {
    return this.vendorForm.setValue(vendor);
  }
  ImportVendor(vendor: Vendor[]): Observable<Vendor[]> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<Vendor[]>('api/Vendor/ImportVendor', JSON.stringify(vendor), options);
  }
}
