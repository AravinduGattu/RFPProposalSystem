import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JobDescription } from '../models/JobDescription';
import { Applicant } from '../models/Applicant';

@Injectable()
export class ApplicantService {
  constructor(private http: HttpClient) { }


  GetAllApplicantprofile() {
    return this.http.get<Applicant[]>(`api/Applicant/GetAllApplicantprofile`)
  }

  ApplicantsearchQuery(query: string) {

    const params = new HttpParams()
      .set('query', query);

    return this.http.get<Applicant[]>('api/Applicant/ApplicantsearchQuery', { params });

  }
}
