import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { SessionService } from '../global/session.service';
import { childRoutes } from '../routes/routes';
import { Roles } from '../global/constants'
import { Session } from '../global/enum';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  public sideMenu = true;
  public appRoutes: Routes = [];
  public MenuList: any = [];
  public userNmae: string;
  public role: string;

  constructor(private router: Router, private loginService: LoginService,
    private sessionService: SessionService) { }


  ngOnInit() {
    const name = this.sessionService.getSession(Session.userName);
    const role = this.sessionService.getSession(Session.userRole);
    //this.userNmae = (user.split('@', 1)).toString();
    this.userNmae = name;
    //this.role = role.replace(/([A-Z])/g, ' $1').trim();
    this.role = Roles[role];
    this.MenuList = this.getMenuList(+role);
  }

  getMenuList(role: any) {
    var routes = childRoutes.filter(list => list.data.menu === true && list.data.users.filter((user) => {
      return (user === 0 || user === role)
    }).length > 0);

    return routes;
  }

  toggleFunction() {
    this.sideMenu = !this.sideMenu;
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
