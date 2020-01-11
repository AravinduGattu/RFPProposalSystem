import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Customer } from '../models/Customer';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';


@Injectable()
export class CustomerService {
  constructor(private http: HttpClient) { }
  cust = [];
  data_Source: MatTableDataSource<Customer>;
  customerForm = new FormGroup({
    business_group: new FormControl('', [Validators.required]),
    cust_code: new FormControl('', [Validators.maxLength(30), Validators.required]),
    cust_name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z_, ]+$')]),
    //project_Name: new FormControl('', [Validators.required]),
    country: new FormControl('', ),
    location_id: new FormControl(''),
    location: new FormControl(''),
    cust_status: new FormControl('', [Validators.required]),
    last_updated_by: new FormControl(sessionStorage.getItem('empId')),
  });
  IntializeForm() {
    this.customerForm.setValue({
      business_group:'',
      cust_code:'',
      cust_name: '',
      //project_Name: '',
      country: '',
      location_id: '',
      cust_status: '',
      last_updated_by:'',
    })
  }

  GetAllCustomer() {
    return this.http.get<Customer[]>(`api/Customer/getallcustomer`)
  }
    custSearchQuery(pquery: string) {
    const params = new HttpParams()
      .set('query', pquery);
     return this.http.get<Customer[]>(`api/Customer/custSearchQuery`, { params })
  }
     
  LoadCustomer() {
    this.GetAllCustomer()
      .subscribe((data: Customer[]) => {
        this.cust = data;
        this.data_Source = new MatTableDataSource<Customer>(this.cust);
      });
  }



  AddCustomer(customer: Customer): Observable<Customer[]> {

    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<Customer[]>('api/Customer/AddCustomer', JSON.stringify(customer), options);

  }
  UpdateCustomer(customer) {
       
    return this.http.put('api/Customer/UpdateCustomer', customer);
      }
  DeleteCustomer(cust_id: string) {

    const params = new HttpParams()
      .set('cust_id', cust_id);
    return this.http.get('api/Customer/DeleteCustomer', { params });
  }
  GetAllCity() {
    return this.http.get('api/Customer/GetAllCity')
  }

  GetAllCountry() {
    return this.http.get('api/Customer/GetAllCountry')
  }

  GetAllBusinessGroups() {
    return this.http.get('api/Customer/GetAllBusinessGroups')
  }

    populatecustomerForm(customer) {
      //return this.customerForm.setValue(customer);
      this.customerForm.controls['business_group'].setValue(customer.business_group);
      this.customerForm.controls['cust_code'].setValue(customer.cust_code);
      this.customerForm.controls['cust_name'].setValue(customer.cust_name);
      this.customerForm.controls['country'].setValue(customer.country);
      //this.customerForm.controls['location'].setValue({
      //  city: customer.city,
      //  region: customer.region,
      //  country: customer.country
      //});
      this.customerForm.controls['location'].setValue(customer.city);
      this.customerForm.controls['location_id'].setValue(customer.city);
      this.customerForm.controls['cust_status'].setValue(customer.cust_status);
    }
  ImportCustomer(customer: Customer[]): Observable<Customer[]> {

    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<Customer[]>('api/Customer/ImportCustomer', JSON.stringify(customer), options);

  }
}
