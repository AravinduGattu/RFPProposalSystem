import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {


  private loginServiceUrl = `${environment.urlAddress}`;


  constructor(private httpClient: HttpClient,
    private router: Router) { 
  }
  
 public authenticate(data: FormData){
  let headers = new HttpHeaders();
  headers = headers.append('Access-Control-Allow-Origin', '*');
  headers = headers.append('noToken', 'noToken');
   return this.httpClient.post(`${this.loginServiceUrl}Authenticate`,data,{ headers: headers })
}






  //to validate userId, pwd and to get status, data
  ValidateUser(mailId: any, password: any,p_today : string) {
    const params = new HttpParams()
      .set('mailId', mailId)
      .set('password', password)
      .set('p_today', p_today);
    return this.httpClient.get(`api/Login/ValidateUser`, { params })

  }

 
  getLoginData(userId: any) {
    const params = new HttpParams()
      .set('Emp_Id', userId)

    return this.httpClient.get(`api/Login/getLoginData`, { params })

  }

 


  //logout service method
  logout() {
    sessionStorage.removeItem("mailId");
    sessionStorage.removeItem("userType");
    sessionStorage.removeItem("pwd");
    


  }


}
