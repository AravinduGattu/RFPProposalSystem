import { Injectable } from '@angular/core';
import { CanActivate, Route, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../login/login.service';
import { SessionService } from '../global/session.service';
import { childRoutes } from '../routes/routes';
import { Session } from '../global/enum';

@Injectable()

export class RouteGuardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router,
    private sessionService: SessionService) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let isUserLoggedin = this.loginService.isUserLoggedIn();
    
    if (isUserLoggedin) {

      let role = this.sessionService.getSession(Session.userRole);
      var activatedRouteUsers = next.routeConfig.data.users;


      if (activatedRouteUsers.includes(0) || activatedRouteUsers.includes(+role)) {
        return true;
      } else {
        this.router.navigate(['/app/unauthorized']);
      }

      //return true;


    } else {
      this.router.navigate(['/login']);
    }
    return false;
  }
}
