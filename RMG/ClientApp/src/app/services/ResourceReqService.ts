import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ResourceReqAttribute } from '../Models/ResourceReqAttribute';


@Injectable()

export class ResourceReqService {
  myAppUrl: string = "";
  constructor(private _http: HttpClient) {

  }

  GetProjectDropdown() {
    return this._http.get('api/ResourceReq/GetProjectDropdown')

  }

  //GetCustomerDropdown() {
  //  return this._http.get('api/ResourceReq/GetCustomerDropdown')
  //}

  saveResreq(Resreq: ResourceReqAttribute[]): Observable<ResourceReqAttribute[]> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let options = { headers: httpHeaders };
    return this._http.post<ResourceReqAttribute[]>('api/ResourceReq/Create', JSON.stringify(Resreq), options);
  }

  //ResReqid() {
  //  return this._http.get('api/ResourceReq/ResReqid')
  //}

  getPResreq() {

    return this._http.get('api/ResourceReq/getPResreq')
  }

  RRFPSearchQuery(query: string) {
    const params = new HttpParams()
      .set('query', query);
    return this._http.get('api/ResourceReq/RRFPSearcgQuery', { params });
  }

  getRRFPDetails(pid: string) {

    const params = new HttpParams()
      .set('pid', pid);
    return this._http.get('api/ResourceReq/getRRFPDetails', { params });
  }

  getChildResReqDetails(pid: string) {
    const params = new HttpParams()
      .set('pid', pid);
    return this._http.get('api/ResourceReq/getChildResReqDetails', { params });
  }

  getChildResReq(cid: string) {
    const params = new HttpParams()
      .set('cid', cid);
    return this._http.get('api/ResourceReq/getChildResReq', { params });
  }

  cancelAssignRequest(childId: string) {
    const params = new HttpParams()
      .set('childId', childId);
    return this._http.get('api/ResourceReq/cancelAssignRequest', { params });
  }


  updatePrtStatus(pid: string) {

    const params = new HttpParams()
      .set('pid', pid);
    return this._http.get('api/ResourceReq/updatePrtStatus', { params });
  }

  //update accepted status
  acceptAssignRequest(childId: string) {
    const params = new HttpParams()
      .set('childId', childId);
    return this._http.get('api/ResourceReq/acceptAssignRequest', { params });
  }

  rejectAssignProject(childId: string) {
    const params = new HttpParams()
      .set('childId', childId);
    return this._http.get('api/ResourceReq/rejectAssignProject', { params });
  }


}


