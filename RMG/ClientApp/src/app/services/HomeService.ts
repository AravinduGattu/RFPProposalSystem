 import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HomeService {

  constructor(private _http: HttpClient) {  }

  


  getChartData() {

    return this._http.get('api/Home/getChartData')
  }

}
