import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { EdgePracAtt } from '../models/EdgePracAtt';
import { DesignAtt } from '../models/DesingAtt';
import { DepartAtt } from '../models/DepartAtt';
import { CoeAtt } from '../models/CoeAtt';
import { MatTableDataSource } from '@angular/material';
import { BusinessgroupAtt } from '../models/businessgroupAtt';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FindEmpAtt } from '../Models/FindEmpAtt';
import { environment } from '../../environments/environment';

@Injectable()
export class AdminService {

  private bgServiceUrl = `${environment.urlAddress}BusinessGroups`;
  constructor(private http: HttpClient) { }
 
//latest bg service method
  public getAllBusinessGroups(bgCode:string,bgStartDate:string,bgEndDate:string){
    const headers = new HttpHeaders().set('AuthToken', sessionStorage.getItem('token'));
    
    // let headers = new HttpHeaders();
    // headers = headers.set('Content-Type', 'application/json');
    // headers = headers.set('AuthToken', sessionStorage.getItem('token'));
     return this.http.get(`${this.bgServiceUrl}/GetList?code=${bgCode}&startDate=${bgStartDate}&endDate=${bgEndDate}`,{ headers: headers })
  }
  








  coe: CoeAtt[] = [];
  data_Source: MatTableDataSource<EdgePracAtt>;
  coeform = new FormGroup({
    coe: new FormControl('', [Validators.required]),
    coeStatus: new FormControl('', [Validators.required]),
    coeStartDate: new FormControl('', ),
    coeEndDate: new FormControl('', ),
    last_Updated_By: new FormControl(sessionStorage.getItem("Employee_Id"))
  });
  edgeform = new FormGroup({
    edgePractice: new FormControl('', [Validators.required]),
    epStatus: new FormControl('', [Validators.required]),
    epStartDate: new FormControl('', ),
    epEndDate: new FormControl('', ),
    last_Updated_By: new FormControl(sessionStorage.getItem("Employee_Id"))
  });
  deptform = new FormGroup({
    department: new FormControl('', [Validators.required]),
    deptStatus: new FormControl('', [Validators.required]),
    departmentCode: new FormControl('', [Validators.required]),
    depStartDate: new FormControl('', ),
    depEndDate: new FormControl('', ),
    last_Updated_By: new FormControl(sessionStorage.getItem("Employee_Id"))
  });
  desgform = new FormGroup({
    //Project_ID: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    designation: new FormControl('', [Validators.required]),
    designCode: new FormControl('', [Validators.required]),
    designStatus: new FormControl('', [Validators.required]),
    designStartDate: new FormControl('',),
    designEndDate: new FormControl('',),
    last_Updated_By: new FormControl(sessionStorage.getItem("Employee_Id"))
  });
  BGform = new FormGroup({
    bg_description: new FormControl('', [Validators.required]),
    bg_status: new FormControl('', [Validators.required]),
    bg_startdate: new FormControl('', ),
    bg_enddate: new FormControl('', ),
    last_Updated_By: new FormControl(sessionStorage.getItem("Employee_Id"))
});

  InitializeForm() {
    this.coeform.setValue({
      coe: '',
      coeStatus: '',
      coeStartDate: '',
      coeEndDate: '',
      last_Updated_By: '',
    })
  }
  InitializeFormedge() {
    this.edgeform.setValue({
      edgePractice: '',
      epStatus: '',
      epStartDate: '',
      epEndDate: '',
      last_Updated_By: '',
    })
  }
  InitializeFormdept() {
    this.deptform.setValue({
      department: '',
      departmentCode: '',
      deptStatus: '',
      depStartDate: '',
      depEndDate: '',
      last_Updated_By: '',
    })
  }
  InitializeFormdesg() {
    this.desgform.setValue({
      designation: '',
      designCode:'',
      designStatus: '',
      designStartDate: '',
      designEndDate: '',
      last_Updated_By: '',
    })
  }
  InitializeFormbg() {
    this.BGform.setValue({
      bg_description: '',
      bg_status: '',
      bg_startdate: '',
      bg_enddate: '',
     last_Updated_By: '',
    })
  }
  
  
  AddCoe(coe: CoeAtt[]): Observable<CoeAtt[]> {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<CoeAtt[]>('api/AdminConfig/AddCoe', JSON.stringify(coe), options);
  }
  AddEdgePractice(edge: EdgePracAtt[]): Observable<EdgePracAtt[]> {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<EdgePracAtt[]>('api/AdminConfig/AddEdgePractice', JSON.stringify(edge), options);
  }
  AddDepartment(dept: DepartAtt[]): Observable<DepartAtt[]> {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<DepartAtt[]>('api/AdminConfig/AddDepartment', JSON.stringify(dept), options);
  }
  AddDesignation(designation: DesignAtt[]): Observable<DesignAtt[]> {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<DesignAtt[]>('api/AdminConfig/AddDesignation', JSON.stringify(designation), options);
  }
  AddBusinessGroup(business: BusinessgroupAtt[]): Observable<BusinessgroupAtt[]> {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<BusinessgroupAtt[]>('api/AdminConfig/AddBusinessGroup', JSON.stringify(business), options);
  }
  updateCoe(coe) {
    return this.http.put('api/AdminConfig/UpdateCoe', coe);

  }
  updateEdgePractice(edge) {
    return this.http.put('api/AdminConfig/updateEdgePractice', edge);

  }
  updateDepartment(dept) {
    return this.http.put('api/AdminConfig/updateDepartment', dept);

  }
  updateDesignation(desg) {
    return this.http.put('api/AdminConfig/updateDesignation', desg);

  }
  updateBusiness(business) {
    return this.http.put('api/AdminConfig/updateBusinessGroup', business);

  }
  GetAllEdgePractice() { return this.http.get<EdgePracAtt[]>(`api/AdminConfig/GetAllEdgePractice`) }

  GetAllDesignation() { return this.http.get<DesignAtt[]>(`api/AdminConfig/GetAllDesignation`) }

  GetAllDepartment() { return this.http.get<DepartAtt[]>(`api/AdminConfig/GetAllDepartments`) }

  GetAllCOE() { return this.http.get<CoeAtt[]>(`api/AdminConfig/GetAllCOE`) }

  GetAllBusinessgroup() { return this.http.get<BusinessgroupAtt[]>(`api/AdminConfig/GetAllBusinessgroup`) }

  GetAllEmpList() { return this.http.get<FindEmpAtt[]>(`api/AdminConfig/GetEmpDropList`)}

  searchQuery(query: string) {

    const params = new HttpParams()
     .set('query', query);

    return this.http.get<EdgePracAtt[]>('api/AdminConfig/EdgePracticeSearchQuery', { params });
  }
  searchQuerydept(query: string) {

    const params = new HttpParams()
      .set('query', query);

    return this.http.get<DepartAtt[]>('api/AdminConfig/DepartmentSearchQuery', { params });
  }
  searchQuerydesignation(query: string) {

    const params = new HttpParams()
      .set('query', query);

    return this.http.get<DesignAtt[]>('api/AdminConfig/DesignationSearchQuery', { params });
  }

  searchQuerycoe(query: string) {

    const params = new HttpParams()
      .set('query', query);

    return this.http.get<CoeAtt[]>('api/AdminConfig/CoeSearchQuery', { params });
  }
  searchQueryBusinessgroup(query: string) {

    const params = new HttpParams()
      .set('query', query);

    return this.http.get<BusinessgroupAtt[]>('api/AdminConfig/BussinessgroupSearchQuery', { params });
  }
  populateForm(coe) {

    //return this.coeform.setValue(coe);
    this.coeform.controls['coe'].setValue(coe.coe);
    this.coeform.controls['coeStatus'].setValue(coe.coeStatus);
    this.coeform.controls['coeStartDate'].setValue(coe.coeStartDate);
    this.coeform.controls['coeEndDate'].setValue(coe.coeEndDate);
  
  }
  populateFormedge(edge) {

   // return this.edgeform.setValue(edge);
  this.edgeform.controls['edgePractice'].setValue(edge.edgePractice);
  this.edgeform.controls['epStatus'].setValue(edge.epStatus);
  this.edgeform.controls['epStartDate'].setValue(edge.epStartDate);
  this.edgeform.controls['epEndDate'].setValue(edge.epEndDate);
  }
  populateFormdept(dept) {
    
   // return this.deptform.setValue(dept);
    this.deptform.controls['department'].setValue(dept.department);
    this.deptform.controls['departmentCode'].setValue(dept.departmentCode);
    this.deptform.controls['deptStatus'].setValue(dept.deptStatus);
    this.deptform.controls['depStartDate'].setValue(dept.depStartDate);
    this.deptform.controls['depEndDate'].setValue(dept.depEndDate);
  }
  populateFormdesg(desg) {

    //return this.desgform.setValue(desg);
    this.desgform.controls['designation'].setValue(desg.designation);
    this.desgform.controls['designCode'].setValue(desg.designCode);
    this.desgform.controls['designStatus'].setValue(desg.designStatus);
    this.desgform.controls['designStartDate'].setValue(desg.designStartDate);
    this.desgform.controls['designEndDate'].setValue(desg.designEndDate);
  }
  populateFormbusiness(business) {

    //return this.BGform.setValue(business);
    this.BGform.controls['bg_description'].setValue(business.bg_description);
    this.BGform.controls['bg_status'].setValue(business.bg_status);
    this.BGform.controls['bg_startdate'].setValue(business.bg_startdate);
    this.BGform.controls['bg_enddate'].setValue(business.bg_enddate);
  }

  ImportCoe(coe: CoeAtt[]): Observable<CoeAtt[]> {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<CoeAtt[]>('api/AdminConfig/ImportCoe', JSON.stringify(coe), options);
  }
  ImportEdgePractice(edge: EdgePracAtt[]): Observable<EdgePracAtt[]> {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<EdgePracAtt[]>('api/AdminConfig/ImportEdgePractice', JSON.stringify(edge), options);
  }
  ImportDepartment(dept: DepartAtt[]): Observable<DepartAtt[]> {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<DepartAtt[]>('api/AdminConfig/ImportDepartment', JSON.stringify(dept), options);
  }
  ImportDesignation(designation: DesignAtt[]): Observable<DesignAtt[]> {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<DesignAtt[]>('api/AdminConfig/ImportDesignation', JSON.stringify(designation), options);
  }
  ImportBusinessGroup(business: BusinessgroupAtt[]): Observable<BusinessgroupAtt[]> {
    let httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<BusinessgroupAtt[]>('api/AdminConfig/ImportBusinessGroup', JSON.stringify(business), options);
  }
}
