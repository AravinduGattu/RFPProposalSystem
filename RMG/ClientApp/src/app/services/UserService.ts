import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient, private router: Router) { }
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
