import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Route, Router } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(): boolean {
    
    if (sessionStorage.getItem("mailId") == null) {
      return true;
    }
    else if (sessionStorage.getItem("mailId")) {
      //this.router.navigate(['/home']);
     
      return true;
    }
    else {
      return true;
    } 
  }

}
