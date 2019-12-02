import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../services/http.service';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { SessionService } from '../global/session.service';
import { environment } from '../../environments/environment';
import { Session } from '../global/enum';

@Injectable()

export class LoginService {

  constructor(private httpService: HttpService,
    private httpClient: HttpClient,
    private sessionService: SessionService) { }

  public userData: any;
  public API_URL = environment.API_URL;

  public login(data: FormData): Observable<any> {
    return this.httpService.makePostRequestforFormData('Authenticate', data);
  }

  public logout() {
    this.sessionService.clear();
  }

  public isUserLoggedIn() {
    let token = this.sessionService.getSession(Session.token);
    if (token && token !== '') {
      return true;
    } else {
      return false;
    }
  }
}
