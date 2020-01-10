import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { AssignPanel } from '../models/AssignPanel';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable()
export class AssignPanelService {
  constructor(private http: HttpClient) { }

  assignpanelForm = new FormGroup({
   
    assigning_panel_code: new FormControl(''),
    assign_panel_name: new FormControl('', [Validators.pattern('[a-zA-Z, ]+$')]),
    applicant_name: new FormControl('', [Validators.pattern('[a-zA-Z, ]+$')]),
    type_of_assessment: new FormControl(''),
    time_slot: new FormControl(''),
    assign_panel_status: new FormControl(''),
    assignpanel_start_date: new FormControl(''),
    assignpanel_end_date: new FormControl(''),
  });

  IntializeForm() {
    this.assignpanelForm.setValue({
     
      assigning_panel_code:'',
      assign_panel_name: '',
      applicant_name: '',
      type_of_assessment: '',
      time_slot: '',
      assign_panel_status: '',
      assignpanel_start_date: '',
      assignpanel_end_date: '',
    })
  }


  GetAllPanel() {
    return this.http.get<AssignPanel[]>(`api/AssignPanel/GetAllPanel`)
  }


  AddAssignPanel(assignpanel: AssignPanel[]): Observable<AssignPanel[]> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<AssignPanel[]>('api/AssignPanel/AddAssignPanel', JSON.stringify(assignpanel), options);

  }
  assignpanelSearchQuery(pquery: string) {
    const params = new HttpParams()
      .set('query', pquery);

    return this.http.get<AssignPanel[]>(`api/AssignPanel/assignpanelSearchQuery`, { params })
  }

  UpdateAssignPanel(assignpanel) {

    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.put('api/AssignPanel/UpdateAssignPanel', assignpanel);

  }
  //DeletePanel(panel_code: string) {

  //  const params = new HttpParams()
  //    .set('panel_code', panel_code);
  //  return this.http.get('api/Panel/DeletePanel', { params });
  //}
  PanelDropdown() {
    return this.http.get('api/AssignPanel/PanelDropdown')
  }
  populateassignpanelForm(assignpanel) {
    return this.assignpanelForm.setValue(assignpanel);
  }
  ImportAssignPanel(assignpanel: AssignPanel[]): Observable<AssignPanel[]> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<AssignPanel[]>('api/AssignPanel/ImportAssignPanel', JSON.stringify(assignpanel), options);
  }
}
