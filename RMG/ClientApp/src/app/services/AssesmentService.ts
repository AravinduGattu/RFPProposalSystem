import { Injectable, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Assesment } from '../models/Assesment';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Response } from 'selenium-webdriver/http';

@Injectable()
export class AssesmentService {
  asmtslist: Assesment[] = [];
  data_Source: MatTableDataSource<Assesment>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  myAppUrl: string = "";
  constructor(private _http: HttpClient) {

  }
  

  AssessmentForm = new FormGroup({
    assessment_type: new FormControl('', [Validators.required]),
    mode_of_interview: new FormControl('', [Validators.required]),
    rating: new FormControl('', [Validators.required]),
    interviwed_by: new FormControl('', [Validators.required]),
    remarks: new FormControl('', [Validators.required]),
    assessment_date: new FormControl('', [Validators.required]),
    promoted: new FormControl('', [Validators.required]),
    applicant_code: new FormControl('', [Validators.required]),
    applicant_name: new FormControl('', [Validators.required]),
    educational_details: new FormControl('', [Validators.required]),
    experience: new FormControl('', [Validators.required]),
    previous_company: new FormControl('', [Validators.required]),
    employment_type: new FormControl('', [Validators.required]),
    skills: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email_id: new FormControl('', [Validators.required]),
    
  });
  
  InitializeForm() {
    this.AssessmentForm.setValue({
      assessment_type: '',
      mode_of_interview: '',
      rating: '',
      interviwed_by: '',
      remarks: '',
      assessment_date: '',
      promoted: '',
      applicant_code: '',
      applicant_name: '',
      educational_details: '',
      experience: '',
      previous_company: '',
      employment_type: '',
      skills: '',
      phone: '',
      email_id: '',
    })
  }
 

  //populateForm(assesment) {

  //  return this.AssessmentForm.setValue(assesment);
  //}
  
  GetAsesmntEmployeeDrpDwn() { return this._http.get('api/Assesment/GetAsesmntEmployeeDrpDwn') }
  GetAllAssesments() {
    return this._http.get<Assesment[]>('api/Assesment/GetAllAssesments')
  }

  assesmentSearchQuery(query: string) {
    const params = new HttpParams()
      .set('query', query);

    return this._http.get<Assesment[]>(`api/Assesment/assesmentSearchQuery`, { params })
  }
  AddAssesments(assesment: Assesment[]): Observable<Assesment[]> {

    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this._http.post<Assesment[]>('api/Assesment/AddAssesments', JSON.stringify(assesment), options);

  }

  UpdateAssesment(assesment) {
    return this._http.put('api/Assesment/UpdateAssesment', assesment);
  }
  LoadAssesmentDetails() {
    this.GetAllAssesments()
      .subscribe((data: Assesment[]) => {
        this.asmtslist = data;
        //this.data_Source = new MatTableDataSource(this.projectlist);
      });

  }
  populateValues(row) {
    this.AssessmentForm.controls['applicant_code'].setValue(row.applicant_code);
    this.AssessmentForm.controls['applicant_name'].setValue(row.applicant_name);
    this.AssessmentForm.controls['educational_details'].setValue(row.educational_details);
    this.AssessmentForm.controls['experience'].setValue(row.experience);
    this.AssessmentForm.controls['previous_company'].setValue(row.previous_company);
    this.AssessmentForm.controls['skills'].setValue(row.skills);
    this.AssessmentForm.controls['phone'].setValue(row.phone);
    this.AssessmentForm.controls['email_id'].setValue(row.email_id);
    this.AssessmentForm.controls['employment_type'].setValue(row.employment_type);
  }
 
}
