import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Employee } from '../models/Employee';
import { Observable } from 'rxjs';
import { Designation } from '../models/Designation';
import { Department } from '../models/Department';
import { EdgePractice } from '../models/EdgePractice';
import { CoeDescription } from '../models/CoeDescription';
import { BaseLocation } from '../models/BaseLocation';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { MatTableDataSource } from '@angular/material';
import { BusinessGroup } from '../models/BusinessGroup';
import { Timesheet } from '../models/Timesheet';
import { JobFamily } from '../models/JobFamily';

@Injectable()
export class EmployeeService {
  employee: Employee[] = [];//var
  data_Source: MatTableDataSource<Employee>;
  constructor(private http: HttpClient) { }
  //EmployeeForm: FormGroup;
  EmployeeForm = new FormGroup({
    //   $key: new FormControl(null),
    bg_id: new FormControl('', [Validators.required]),
    emp_Id: new FormControl('', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
    emp_Name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z, ]+$')]),
    designation_Id: new FormControl('', ),
    department_Id: new FormControl('', ),
    edge_Practice_Id: new FormControl('', ),
    coe_Id: new FormControl('', ),
    location_Id: new FormControl(''),
    location: new FormControl(''),
    joining_Date: new FormControl('', [Validators.required]),
    contact_Number: new FormControl('', [Validators.minLength(10), Validators.maxLength(13), Validators.pattern('[0-9]+$')]),
    address: new FormControl('', [Validators.maxLength(200)]),
    email_Id: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@pactera.com+$')]),
    reporting_To: new FormControl('',),
    reporting_To_Email: new FormControl('', [Validators.pattern('^[a-zA-Z0-9_.+-]+@pactera.com+$')]),
    flag_Status: new FormControl('', []),
    last_Updated_By: new FormControl(sessionStorage.getItem('empId')),
    job_Description: new FormControl(''),
    cat_Description: new FormControl(''),
    sub_Cat_Description: new FormControl(''),
  });

  InitializeForm() {
    this.EmployeeForm.setValue({
     // $key: null
      bg_id:'',
      emp_Id: '',
      emp_Name: '',
      designation_Id: '',
      department_Id:'',
      edge_Practice_Id: '',
      coe_Id: '',
      location_Id: '',
      location: '',
      joining_Date: '',
      contact_Number: '',
      address:'',
      email_Id: '',
      reporting_To: '',
      reporting_To_Email: '',
      flag_Status: '',
      last_Updated_By: '',
      job_Description:'' ,
      cat_Description:'' ,
      sub_Cat_Description:'',
    })
  }
  GetAllEmployee() {
    return this.http.get<Employee[]>(`api/Employee/getallemployee`)
  }

  empSearchQuery(query: string) {
    const params = new HttpParams()
      .set('query', query);

    return this.http.get<Employee[]>(`api/Employee/empSearchQuery`, { params })
  }

  AddEmployee(employee: Employee[]): Observable<Employee[]> {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<Employee[]>('api/Employee/AddEmployee', JSON.stringify(employee), options);
  }
  updateEmployee(employee) {
    return this.http.put('api/Employee/UpdateEmployee', employee);

  }
  DeleteEmployee(Emp_Id: string) {
    const params = new HttpParams()
      .set('Emp_Id', Emp_Id);
    return this.http.get('api/Employee/DeleteEmployee', { params });
  }
  GetAllDesignation() {

    return this.http.get<Designation[]>('api/Employee/getalldesignation')
  }
  GetAllDepartment() {

    return this.http.get<Department[]>('api/Employee/getalldepartment')
  }

  GetAllEdgePractice() {

    return this.http.get<EdgePractice[]>('api/Employee/getallEdgePractice')
  }

  GetAllCoeDescription() {
    return this.http.get<CoeDescription[]>('api/Employee/getallcoedescription')
  }

  GetAllCity() {
    return this.http.get<BaseLocation[]>('api/Employee/getallcity')
  }
  GetAllBusinessGroup() {
    return this.http.get<BusinessGroup[]>('api/Employee/getallbusinessgroup')
  }
 GetAllReportingToAndEmail() {
    return this.http.get<Employee[]>('api/Employee/getallreportingtoandemail')
  }
  GetAllJobFamilyDropdown() {
    return this.http.get<JobFamily[]>('api/Employee/GetAllJobFamilyDropdown')
  }
  GetAllCategoryDropdown(jobFam: string) {
    const params = new HttpParams()
      .set('jobFam', jobFam);
    return this.http.get<JobFamily[]>('api/Employee/GetAllCategoryDropdown', { params })
  }
  GetAllSubCategoryDropdown(category: string) {
    const params = new HttpParams()
      .set('category', category);
    return this.http.get<JobFamily[]>('api/Employee/GetAllSubCategoryDropdown', { params })
  }
  getDDAllJobs() {
    return this.http.get('api/Employee/getDDAllJobs')
  }
  getDDAllCategories() {
    return this.http.get('api/Employee/getDDAllCategories')
  }

  getDDAllsubCategories() {
    return this.http.get('api/Employee/getDDAllsubCategories')
  }

  populateForm(employee) {
    //return this.EmployeeForm.setValue(employee);
     this.EmployeeForm.controls['bg_id'].setValue(employee.bg_id);
    this.EmployeeForm.controls['emp_Id'].setValue(employee.emp_Id);
    this.EmployeeForm.controls['emp_Name'].setValue(employee.emp_Name);
    this.EmployeeForm.controls['designation_Id'].setValue(employee.designation_Id);
    this.EmployeeForm.controls['department_Id'].setValue(employee.department_Id);
    this.EmployeeForm.controls['edge_Practice_Id'].setValue(employee.edge_Practice_Id);
    this.EmployeeForm.controls['coe_Id'].setValue(employee.coe_Id);
    //this.EmployeeForm.controls['location_Id'].setValue(employee.location_Id);
    this.EmployeeForm.controls['job_Description'].setValue(employee.job_Description);
    this.EmployeeForm.controls['cat_Description'].setValue(employee.cat_Description);
    this.EmployeeForm.controls['sub_Cat_Description'].setValue(employee.sub_Cat_Description);
    this.EmployeeForm.controls['location'].setValue(employee.location);
    this.EmployeeForm.controls['joining_Date'].setValue(employee.joining_Date);
    this.EmployeeForm.controls['contact_Number'].setValue(employee.contact_Number);
    this.EmployeeForm.controls['address'].setValue(employee.address);
    this.EmployeeForm.controls['email_Id'].setValue(employee.email_Id);
    this.EmployeeForm.controls['reporting_To'].setValue(employee.reporting_To);
    this.EmployeeForm.controls['reporting_To_Email'].setValue(employee.reporting_To_Email);
    this.EmployeeForm.controls['flag_Status'].setValue(employee.flag_Status);
  }
  LoadEmployeeDetails() {
    this.GetAllEmployee()
      .subscribe((data: Employee[]) => {
        this.employee = data;
        this.data_Source = new MatTableDataSource<Employee>(this.employee);

      });
  }
  ImportEmployee(employee: Employee[]): Observable<Employee[]> {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<Employee[]>('api/Employee/ImportEmployee', JSON.stringify(employee), options);
  }

}




