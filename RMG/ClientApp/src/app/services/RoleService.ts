import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoleAttribute } from '../Models/RoleAttribute';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class RoleService {

  empid: string = sessionStorage.getItem('Employee_Id');

  myAppUrl: string = "";
  constructor(private _http: HttpClient) {

  }
  getRole() { return this._http.get('api/Role/GetAllRoles') }

  getempdrop() { return this._http.get('api/Role/GetEmployeeDropdown') }

  getempdes() { return this._http.get('api/Role/GetEmployeeDesignation') }

  getprjdrop() { return this._http.get('api/Role/GetProjectdropdown') }

  getprjroledrop() { return this._http.get('api/Role/GetProjectroledropdown') }


  roleForm: FormGroup = new FormGroup({
    employee_Id: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    employee_Name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    role_Projects: new FormControl('', [Validators.required]),
    project_Name: new FormControl('', [Validators.required]),
    role_Status: new FormControl('', [Validators.required]),
    role_Designation: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    role_Description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    role_StartDate: new FormControl('', [Validators.required]),
    role_EndDate: new FormControl('', [Validators.required]),
    lastUpdatedBy: new FormControl('')
  });

  intiliazeFormGroup() {
    this.roleForm.setValue({
      employee_Id: '',
      employee_Name: '',
      role_Projects: '',
      project_Name: '',
      role_Status:'',
      role_Designation: '',
      role_Description: '',
      role_StartDate: '',
      role_EndDate: '',
      lastUpdatedBy: '',
    });
  }

  rolesSearchQuery(pquery: string) {
    const params = new HttpParams()
      .set('query', pquery);
    return this._http.get<RoleAttribute[]>(`api/Role/rolesSearchQuery`, { params })
  }

  saveRole(Role: RoleAttribute[]): Observable<RoleAttribute[]> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this._http.post<RoleAttribute[]>('api/Role/Create', JSON.stringify(Role), options);
  }

  updateRole(role) { return this._http.put('api/Role/UpdateRole', role);
  }

  LoadRoleDetails() { return this._http.get<RoleAttribute[]>('api/Role/GetAllRoles') }


  DisableRole(Employee_Id) {
    const params = new HttpParams()
      .set('Employee_Id', Employee_Id);
    return this._http.get('api/Role/DisableRole', { params });

  }

  populateForm(role) {
    this.roleForm.controls['employee_Id'].setValue(role.employee_Id);
    this.roleForm.controls['employee_Name'].setValue(role.employee_Name);
    this.roleForm.controls['role_Projects'].setValue(role.role_Projects);
    this.roleForm.controls['project_Name'].setValue(role.project_Name);
    this.roleForm.controls['role_Designation'].setValue(role.role_Designation);
    this.roleForm.controls['role_Description'].setValue(role.role_Description);
    this.roleForm.controls['role_StartDate'].setValue(role.role_StartDate);
    this.roleForm.controls['role_EndDate'].setValue(role.role_EndDate);
    this.roleForm.controls['role_Status'].setValue(role.role_Status);
    this.roleForm.controls['lastUpdatedBy'].setValue(sessionStorage.getItem("Employee_Id"));
  }

  UploadFile(filetoupload: File): Observable<Object> {
    const endpoint = 'api/Role/ExcelFileUpload';
    let formdata: FormData = new FormData();
    formdata.append('excelFileName', filetoupload, filetoupload.name);
    return this._http.post(endpoint, formdata).map((response: Response) => {
      console.log(response);
      return response;
    });
  }
  ImportRole(Role: RoleAttribute[]): Observable<RoleAttribute[]> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this._http.post<RoleAttribute[]>('api/Role/ImportRole', JSON.stringify(Role), options);
  }

  
}






