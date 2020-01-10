import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Panel } from '../models/Panel';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Designation } from '../models/Designation';

@Injectable()
export class PanelService {
  constructor(private http: HttpClient) { }

  panelForm = new FormGroup({
  panel_id: new FormControl(''),
  panel_code: new FormControl('', [Validators.maxLength(15), Validators.minLength(4)]),
    panel_name: new FormControl('', [Validators.pattern('[a-zA-Z, ]+$')]),
    email_id: new FormControl('', [Validators.pattern('^[a-zA-Z0-9_.+-]+@[pactera.com]+$')]),
    phone: new FormControl('',[ Validators.minLength(10), Validators.maxLength(13), Validators.pattern('[0-9]+$')]),
  panel_role: new FormControl(''),
  panel_status: new FormControl(''),
  panel_startdate: new FormControl(''),
  panel_enddate: new FormControl(''),
});

  IntializeForm() {
    this.panelForm.setValue({
      panel_id:'',
      panel_code: '',
      panel_name: '',
      email_id: '',
      phone: '',
      panel_role: '',
      panel_status:'',
      panel_startdate: '',
      panel_enddate: '',
    })
  }


  GetAllPanel() {
    return this.http.get<Panel[]>(`api/Panel/GetAllPanel`)
  }

  
  AddPanel(panel: Panel[]): Observable<Panel[]> {

    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<Panel[]>('api/panel/AddPanel', JSON.stringify(panel), options);

  }
  panelSearchQuery(pquery: string) {
    const params = new HttpParams()
      .set('query', pquery);

    return this.http.get<Panel[]>(`api/Panel/panelSearchQuery`, { params })
  }

  GetAllDesignation() {

    return this.http.get<Designation[]>('api/Employee/getalldesignation')
  }

  UpdatePanel(panel) {

    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.put('api/Panel/UpdatePanel', panel);

  }
  DeletePanel(panel_code: string) {

    const params = new HttpParams()
      .set('panel_code', panel_code);
    return this.http.get('api/Panel/DeletePanel', { params });
  }
  EmployeeNameDropdown() {
    return this.http.get('api/Panel/EmployeeNameDropdown')
  }
  populatepanelForm(panel) {
    return this.panelForm.setValue(panel);
  }
  ImportPanel(panel: Panel[]): Observable<Panel[]> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<Panel[]>('api/panel/ImportPanel', JSON.stringify(panel), options);
  }
}
