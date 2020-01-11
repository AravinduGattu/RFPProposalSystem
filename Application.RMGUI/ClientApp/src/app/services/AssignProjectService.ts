import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssignProject } from '../models/AssignProject';
import { Observable } from 'rxjs';
import { AcceptAssignProjReq } from '../models/AcceptAssignProjReq';

@Injectable()
export class AssignProjectService {
  p_childId: string;
  maxNum = 100;

  constructor(private http: HttpClient) { }



  addFormValues = new FormGroup({
    res_req_cid: new FormControl(''),
    Emp_Name: new FormControl(''),
    res_req_project_name: new FormControl(''),
    
    Emp_Id: new FormControl(''),
    Email_ID: new FormControl(''),
    Billing_Percentage: new FormControl(''),
    
   
  });


  assignProjectForm = new FormGroup({
    res_req_created_by: new FormControl(''),
    res_req_cid: new FormControl(''),
    res_req_project_name: new FormControl(''),
    project_Name: new FormControl(''),
    emp_Id: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    assign_Project_StartDate: new FormControl('', Validators.required),
    assign_Project_EndDate: new FormControl('', Validators.required),
    billing_Percentage: new FormControl('', [Validators.required, Validators.max(this.maxNum)]),
  });

  getempdrop() {
    return this.http.get('api/AssignProject/GetEmployeeDropdown')
  }
  GetAllCity() {
    return this.http.get('api/AssignProject/GetAllCity')
  }
 

  AddAssignProject(assignProject: AssignProject[]): Observable<AssignProject[]> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<AssignProject[]>('api/AssignProject/AddAssignProject', JSON.stringify(assignProject), options);
  }

  populateValues(row) {
    this.assignProjectForm.controls['res_req_created_by'].setValue(row.res_req_created_by);
    this.assignProjectForm.controls['res_req_cid'].setValue(row.res_req_cid);
    this.assignProjectForm.controls['res_req_project_name'].setValue(row.res_req_project_name);
  }


  addAcceptFormValues(obj: AcceptAssignProjReq) {
    this.addFormValues.controls['res_req_cid'].setValue(obj.res_req_cid);
    this.addFormValues.controls['Emp_Id'].setValue(obj.emp_Id);
    this.addFormValues.controls['Email_ID'].setValue(obj.email_ID);
    this.addFormValues.controls['Emp_Name'].setValue(obj.emp_Name);
    this.addFormValues.controls['res_req_project_name'].setValue(obj.project_Name);
    this.addFormValues.controls['Billing_Percentage'].setValue(obj.billing_Percentage);

    this.p_childId = obj.res_req_cid;

  }


  getAssignedProjDetails(childID: string) {
    const params = new HttpParams()
      .set('childID', childID);

    return this.http.get(`api/AssignProject/getAssignedProjDetails`, { params })
  }



}
