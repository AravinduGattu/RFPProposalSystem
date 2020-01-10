import { Injectable, ViewChild} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectAttribute } from '../Models/ProjectAttribute';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Injectable()
export class ProjectService {
  projectlist: ProjectAttribute[] = [];
  data_Source: MatTableDataSource<ProjectAttribute>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator; 
  myAppUrl: string = "";
  constructor(private http: HttpClient) { }
  projectForm: FormGroup = new FormGroup({

    project_Name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    project_Code: new FormControl(''),
    project_Description: new FormControl('', [ Validators.maxLength(500)]),
    project_StartDate: new FormControl(''),
    project_EndDate: new FormControl(''),
    project_Status: new FormControl(''),
    project_LocationId: new FormControl(''),
    project_Location: new FormControl(''),
    project_Billable: new FormControl(''),
    customer_Details: new FormControl('', [Validators.required]),
    last_Updated_By: new FormControl(sessionStorage.getItem('empId')),
  });
  intiliazeFormGroup() {
    this.projectForm.setValue({
      project_Name: '',
      project_Code: '',
      project_Description: '',
      project_StartDate: '',
      project_EndDate: '',
      project_Status: '',
      project_LocationId: '',
      project_Location: '',
      project_Billable: '',
      customer_Details: '',
      last_Updated_By:'',
    });
  }
  getProjects() {
    return this.http.get('api/Projects/GetAllProjects')
  }

  searchQuery(query: string) {
 
    const params = new HttpParams()
      //  .set('Project_Name', project.project_Name)
      //.set('Project_Description', project.project_Description)
      //.set('Project_StartDate', project.project_StartDate)
      //.set('Project_EndDate', project.project_EndDate)
      //  .set('Project_Status', project.project_Status)
      //    .set('City', project.project_LocationId)
      //  .set('Project_Billable', project.project_Billable);

      .set('query', query);

    return this.http.get<ProjectAttribute[]>('api/Projects/searchQuery', {params});

  }

  GetAllProjectCodeAndName() {
    return this.http.get('api/Projects/GetAllProjectCodeAndName');
  }

  AddProjects(project: ProjectAttribute[]): Observable<ProjectAttribute[]> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<ProjectAttribute[]>('api/Projects/AddProjects', JSON.stringify(project), options);

  }
UpdateProject(project) {
    return this.http.put('api/Projects/UpdateProject', project);
  }
DisableProject(Project_ID) {
    const params = new HttpParams()
      .set('Project_ID', Project_ID);
    return this.http.get('api/Projects/DisableProject', { params });

  }
  GetAllCity() {
    return this.http.get('api/Projects/GetAllCity')
  }
  GetAllCustomerDetails() {
    return this.http.get('api/Projects/GetAllCustomerDetails')
  }
  populateForm(project) {
    this.projectForm.controls['project_Name'].setValue(project.project_Name);
    this.projectForm.controls['project_Code'].setValue(project.project_Code);
    this.projectForm.controls['project_Description'].setValue(project.project_Description);
    this.projectForm.controls['project_StartDate'].setValue(project.project_StartDate);
    this.projectForm.controls['project_EndDate'].setValue(project.project_EndDate);
    this.projectForm.controls['project_Status'].setValue(project.project_Status);
    this.projectForm.controls['project_Location'].setValue(project.project_Location);
    this.projectForm.controls['project_Billable'].setValue(project.project_Billable);
    this.projectForm.controls['customer_Details'].setValue(project.customer_Details);
  }
  ImportProjects(project: ProjectAttribute[]): Observable<ProjectAttribute[]> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<ProjectAttribute[]>('api/Projects/ImportProjects', JSON.stringify(project), options);

  }
}
