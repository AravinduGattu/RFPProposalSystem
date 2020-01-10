import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Route, Router } from '@angular/router';

@Injectable()
export class RoleGuardTA implements CanActivate {

  constructor(private router: Router) { }



  canActivate(): boolean {
    if (sessionStorage.getItem("mailId") && (sessionStorage.getItem("userType") == 'ADMIN' || sessionStorage.getItem("userType") == 'COE' || 

      sessionStorage.getItem("userType") == 'HR_ADMIN' || sessionStorage.getItem("userType") == 'PH' || sessionStorage.getItem("userType") == 'TA' || sessionStorage.getItem("userType") == 'TA_ADMIN')) {



      return true;
    }
    else if (sessionStorage.getItem("mailId") == null) {
      this.router.navigate(['']);
      return true;
    }
    else {
      this.router.navigate(['']);
      return false;
    }

  }

}
