import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Jobtitle } from '../models/Jobtitle';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Injectable()
export class JobtitleService {
    LoadJobtitleDetails(): any {
        throw new Error("Method not implemented.");
    }
  myAppUrl: string = "";
  constructor(private http: HttpClient) {

  }
  
  JobtitleForm = new FormGroup({
    
    job_title_id: new FormControl('', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
    job_title_code: new FormControl('', [Validators.required]),
    job_title_name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]+$')]),
    job_title_desc: new FormControl('', [Validators.required]),
    job_title_status: new FormControl('', [Validators.required]),
    job_title_start_date: new FormControl('', [Validators.required]),
    job_title_end_date: new FormControl('', [Validators.required]),
    
  });

  InitializeForm() {
    this.JobtitleForm.setValue({
     
      job_title_id: '',
      job_title_code: '',
      job_title_name: '',
      job_title_desc: '',
      job_title_status: '',
      job_title_start_date: '',
      job_title_end_date: '',
     
    })
  }
  getJobs() {
    return this.http.get<Jobtitle[]>('api/Jobtitle/GetAllJobs')
  }
  jobSearchQuery(query: string) {
    const params = new HttpParams()
      .set('query', query);

    return this.http.get<Jobtitle[]>(`api/Jobtitle/jobSearchQuery`, { params })
  }
   //Addmethod  is fromcontext (createobj : models class name)
  AddJobs(job:Jobtitle[]): Observable<Jobtitle[]> {

    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<Jobtitle[]>('api/Jobtitle/AddJobs', JSON.stringify(job), options);

  }


  UpdateJob(Jobtitle) {

    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.put('api/Jobtitle/UpdateJob', Jobtitle);

  }

  DisableJob(job_title_code) {
    const params = new HttpParams()
      .set('job_title_code', job_title_code);
    return this.http.get('api/Jobtitle/DisableJob', { params });

  }
  populateForm(jobtitle) {
    
    return this.JobtitleForm.setValue(jobtitle);
  }

  ImportJobs(job: Jobtitle[]): Observable<Jobtitle[]> {

    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<Jobtitle[]>('api/Jobtitle/ImportJobs', JSON.stringify(job), options);

  }
}

