import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private httpService: HttpService) { }

  public getLocationList(): Observable<any> {
    return this.httpService.makeGetRequest('Locations/GetList');
  }
}
