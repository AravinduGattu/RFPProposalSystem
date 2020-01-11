
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Newjobrequirement } from '../models/NewjobrequirementAttribute';
import { Observable } from 'rxjs';

@Injectable()
export class NewjobrequirementService {

  constructor(private http: HttpClient) { }


  getNewJobRequirment() {
    return this.http.get('api/Newjobrequirement/GetAllNewJobRequirement')
  }

  searchQuery(query: string) {
    const params = new HttpParams()
      .set('query', query);
    return this.http.get<Newjobrequirement[]>('api/Newjobrequirement/NewjobrequirementsearchQuery', { params });
  }

  Addnewjob(createnewjob: Newjobrequirement[]):Observable<Newjobrequirement[]> {

    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<Newjobrequirement[]>('api/Newjobrequirement/Addnewjob', JSON.stringify(createnewjob), options);

  }
  Importnewjob(createnewjob: Newjobrequirement[]): Observable<Newjobrequirement[]> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this.http.post<Newjobrequirement[]>('api/Newjobrequirement/Importnewjob', JSON.stringify(createnewjob), options);
  }


}




















