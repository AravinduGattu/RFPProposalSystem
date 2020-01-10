import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/UserService';
import { LoginData } from '../models/LoginData';
import { UserRole } from '../models/UserRole';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit
{
  employeeid: string;
  loginfo: string;
  isHandset$: any;
  gv_admin = false;
  text = 'ADMIN';
  utype: UserRole;
  v_type: string;
  userRole: string;
  constructor(private userService: UserService, private router: Router) {
  }

  log_info: LoginData;


  logout() {
    this.userService.logout();
    this.router.navigate(['']);
  }

  ngOnInit() {

    

    //getting usertype,employeeId and emp last login date from sessionStorage
    this.userRole = sessionStorage.getItem("userType");
    this.employeeid = sessionStorage.getItem("empId");
    this.loginfo = sessionStorage.getItem("lastLoginDate");
   
  
   
  }

  //private setSession(mailId) {
  //  sessionStorage.setItem('Employee_Id', mailId);
    

  //}

}
