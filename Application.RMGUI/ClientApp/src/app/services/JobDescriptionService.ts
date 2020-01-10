import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JobDescription } from '../models/JobDescription';


@Injectable()
export class JobDescriptionService {
  constructor(private http: HttpClient) { }


  GetAllJobDescrption() {
    return this.http.get<JobDescription[]>(`api/JobDescription/GetAllJobDescrption`)
  }


  jobdescriptionSearchQuery(pquery: string) {
    const params = new HttpParams()
      .set('query', pquery);
    return this.http.get<JobDescription[]>(`api/JobDescription/jobdescriptionSearchQuery`, { params })
  }

  jobdescriptionForm = new FormGroup({
    job_Posting_code: new FormControl(''),
    job_title: new FormControl(''),
    experience: new FormControl(''),
    worklocation: new FormControl(''),
    job_type: new FormControl(''),  
    skills: new FormControl(''),
    jobdescription_status: new FormControl(''),
    salary: new FormControl(''),
    job_description: new FormControl(''),
  });
  IntializeForm() {
    this.jobdescriptionForm.setValue({
      job_Posting_code: '',
      job_title: '',
      experience: '',
      worklocation: '',
      job_type: '',
     
      skills : '',
      jobdescription_status: '',
      salary: '',
      job_description: '',
    })

  }
  populatejobdescriptionForm(jobdescription) {
    return this.jobdescriptionForm.setValue(jobdescription);
  }


  //AddJobDescription(createobj : models class name)
  AddJobDescription(jobdescription: JobDescription[]): Observable<JobDescription[]> {

    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<JobDescription[]>('api/JobDescription/AddJobDescription', JSON.stringify(jobdescription), options);

  }
  UpdateJobDescription(jobdescription) {  //JobDescription --- We create a object

    return this.http.put('api/JobDescription/UpdateJobDescription', jobdescription);
  }


  GetJobtitleDropdown() {
    return this.http.get('api/JobDescription/GetJobtitleDropdown')
  }

 
  GetSkillDropdown()  // For SkillDropdown
  {
    return this.http.get('api/JobDescription/GetSkillDropdown')

  }
  ImportJobDescription(jobdescription: JobDescription[]): Observable<JobDescription[]> {

    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<JobDescription[]>('api/JobDescription/ImportJobDescription', JSON.stringify(jobdescription), options);

  }
}
