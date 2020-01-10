import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApplicantProfileReview } from '../models/ApplicantProfileReview';

@Injectable()
export class ApplicantProfileReviewService {
  constructor(private http: HttpClient) { }

  applicantprofilereviewForm = new FormGroup({
    applicant_profile_review_id: new FormControl(''),
    panel_name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z, ]+$')]),
    applicant_name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z, ]+$')]),
    applicant_profile_status: new FormControl(''),
    panel_profile_review: new FormControl(''),
    
  });
  

  IntializeForm() {
    this.applicantprofilereviewForm.setValue({
      applicant_profile_review_id: '',
      panel_name: '',
      applicant_name: '',
      applicant_profile_status: '',
      panel_profile_review: '',
     
    })
  }
  
  GetAllApplicantProfileShortlisted() {
    return this.http.get<ApplicantProfileReview[]>(`api/ApplicantProfileReview/GetAllApplicantProfileShortlisted`)
  }


  AddApplicantProfileReview(applicantProfileReview: ApplicantProfileReview[]): Observable<ApplicantProfileReview[]> {

    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<ApplicantProfileReview[]>('api/ApplicantProfileReview/AddApplicantProfileReview', JSON.stringify(applicantProfileReview), options);

  }
  applicantprofileshortlistSearchQuery(pquery: string) {
    const params = new HttpParams()
      .set('query', pquery);

    return this.http.get<ApplicantProfileReview[]>(`api/ApplicantProfileReview/applicantprofileshortlistSearchQuery`, { params })
  }

  UpdateApplicantProfileReview(applicantProfileReview) {

    return this.http.put('api/ApplicantProfileReview/UpdateApplicantProfileReview',applicantProfileReview);

  }
  DeleteApplicantProfileReview(applicant_profile_review_id:string) {

    const params = new HttpParams()
      .set('applicant_profile_review_id',applicant_profile_review_id);
    return this.http.get('api/ApplicantProfileReview/DeleteApplicantProfileReview', { params });
  }
  EmployeeNameDropdown() {
    return this.http.get('api/ApplicantProfileReview/EmployeeNameDropdown')
  }
  ApplicantDropdown() {
    return this.http.get('api/ApplicantProfileReview/ApplicantDropdown')
  }
  populateapplicantprofilereviewForm(applicantProfileReview) {
    return this.applicantprofilereviewForm.setValue(applicantProfileReview);
  }
  ImportApplicantProfileReview(applicantProfileReview: ApplicantProfileReview[]): Observable<ApplicantProfileReview[]> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<ApplicantProfileReview[]>('api/ApplicantProfileReview/ImportApplicantProfileReview', JSON.stringify(applicantProfileReview), options);

  }
}
