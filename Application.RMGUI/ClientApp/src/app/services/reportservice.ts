import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ReportsEPMAttribute } from '../models/ReportsEPMAttribute';
import { Timesheet } from '../models/Timesheet';
import { Observable } from 'rxjs';

@Injectable()
export class ReportService {
  assignId: number;
  constructor(private http: HttpClient) { }

  EmpProjForm = new FormGroup({
    emp_Id: new FormControl('', [Validators.maxLength(10)]),
    emp_Name: new FormControl('', [Validators.maxLength(100)]),
    project_Code: new FormControl('', [Validators.maxLength(30)]),
    project_Name: new FormControl('', [Validators.maxLength(100)]),
    assign_Project_StartDate: new FormControl(''),
    assign_Project_EndDate: new FormControl(''),
    billable: new FormControl(''),
    billing_Percentage: new FormControl('', [Validators.maxLength(100)]),
    location: new FormControl('', [Validators.maxLength(10)]),
    onsite: new FormControl(''),
    project_Assign_ID: new FormControl(''),
  });




  //to get filtered records from emp-proj table by applying filters from frontend
  getAllEPMDetails(pquery: string) {
      const params = new HttpParams()
      .set('query', pquery);
    return this.http.get('api/Reports/getAllEPMDetails', { params });
  }
  //to get all records from emp-proj tables without passing any parameter
  getAllEPM() {
    return this.http.get('api/Reports/getAllEPM')
  }

  loadPMNames() {
    return this.http.get('api/Reports/loadPMNames')
  }

  //to update the edited values in the emp-proj-info edit popup
  updateEmpProjInfo(pobj: ReportsEPMAttribute) {
    return this.http.put('api/Reports/updateEmpProjInfo', pobj);
  }
  loadLocation() {
    return this.http.get('api/Reports/loadLocation')
  }


  //method to populate the particular record values into edit popup dialog
  populateForm(empobj) {
    
    this.EmpProjForm.controls['emp_Id'].setValue(empobj.emp_Id);
    this.EmpProjForm.controls['emp_Name'].setValue(empobj.emp_Name);
    this.EmpProjForm.controls['project_Code'].setValue(empobj.project_Code);
    this.EmpProjForm.controls['project_Name'].setValue(empobj.project_Name);
    this.EmpProjForm.controls['assign_Project_StartDate'].setValue(empobj.assign_Project_StartDate);
    this.EmpProjForm.controls['assign_Project_EndDate'].setValue(empobj.assign_Project_EndDate);
    this.EmpProjForm.controls['billable'].setValue(empobj.billable);
    this.EmpProjForm.controls['billing_Percentage'].setValue(empobj.billing_Percentage);
    this.EmpProjForm.controls['location'].setValue(empobj.location);
    this.EmpProjForm.controls['onsite'].setValue(empobj.onsite);
    this.EmpProjForm.controls['project_Assign_ID'].setValue(empobj.project_Assign_ID);

   
  }

  ImportTimesheets(timesheet: Timesheet): Observable<Timesheet[]> {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<Timesheet[]>('api/Reports/ImportTimeSheet', JSON.stringify(timesheet), options)
  }

}
