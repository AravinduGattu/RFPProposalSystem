import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Route, Router } from '@angular/router';

@Injectable()
export class RoleGuardAdmin implements CanActivate {

  constructor(private router: Router) { }



  canActivate(): boolean {
    if (sessionStorage.getItem("mailId") && sessionStorage.getItem("userType") == 'ADMIN') {
     

    
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
