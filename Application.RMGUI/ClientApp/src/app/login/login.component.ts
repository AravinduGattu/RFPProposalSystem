import { Component } from '@angular/core';
import { UserService } from '../services/UserService';
import 'rxjs/Rx';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '../services/dialog.service';
import { DatePipe } from '@angular/common';
import { UserRole } from '../models/UserRole';
import { LoginResponse } from '../models/LoginResponse';
import { loginResponse } from '../models/login.model';
import 'rxjs/add/operator/catch';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

//active variable
userData:any;
public isValidCredentials = true;
//end


  isExpanded = false;
  isExists: boolean;
  res: any;
  userIsExists: boolean;
  today: string;
  myDate = new Date();
  utype: UserRole;
  v_type: string;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder, private dialogService: DialogService, private datePipe: DatePipe) {
    this.today = this.datePipe.transform(this.myDate, 'yyyy-MM-dd hh:mm:ss');
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  //code to test reactiveform
  registerForm: FormGroup;
  submitted = false;
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userId: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get f() { return this.registerForm.controls; }

  onSubmit(name, password) {
    this.submitted = true;

    // stop here if form is invalid
    //if (this.registerForm.invalid) {
    //  return;
    //}
    if (name == "") {
      this.dialogService.openAlertDialog('Please Enter Username');
    }
    else if (password == "") {
      this.dialogService.openAlertDialog('Please Enter Your Password');
    }
    else {
      // this.userService.ValidateUser(name, password, this.today)
      //   .subscribe((data: object) => {
      //     this.res = data;
      //      if (!this.res.status) {
      //       this.dialogService.openAlertDialog(this.res.exception.Message);
      //       //console.log(this.res.exception);
      //     }
      //     else if (!this.res.data.validUser && this.res.status) {
      //       this.dialogService.openAlertDialog('Invalid User Name');
      //     }
      //     else if (!this.res.data.validPwd && this.res.status) {
      //       this.dialogService.openAlertDialog('Invalid Password');
      //     }
      //     else if (this.res.data.validUser && this.res.data.validPwd) {
      //       this.router.navigate(['/home']);
      //       sessionStorage.setItem("userType", this.res.data.userType);
      //        sessionStorage.setItem("empId", this.res.data.empId);
      //        console.log(sessionStorage.getItem('empId'));
      //       sessionStorage.setItem("lastLoginDate", this.res.data.lastLoginDate);
      //       this.setSession(name, password, this.v_type);
      //     }
      //   });
      const loginData = new FormData();
      loginData.append('userName', name);
      loginData.append('accessKey', password);
      
        this.userService.authenticate(loginData).subscribe((response: any) => {
          if (response) {
            this.userData = response;

            sessionStorage.setItem('token',this.userData.accessKey);
            sessionStorage.setItem('userId',this.userData.id);
            sessionStorage.setItem('userName',this.userData.employeeName);
            sessionStorage.setItem('userEmail',this.userData.employeeName);
            sessionStorage.setItem('userRole',this.userData.emailID);
            this.router.navigate(['/home']);

          } else {
            this.isValidCredentials = false;
            this.dialogService.openAlertDialog('Invalid credentials');
            
          }
        },
        error => {
          this.isValidCredentials = false;
          this.dialogService.openAlertDialog('Invalid credentials');
        });
      
     
    }
  }
      
  //adding data to localstorage
  private setSession(name, password,utype) {
    sessionStorage.setItem('mailId', name);
    sessionStorage.setItem("pwd", password);

  //  console.log(sessionStorage.getItem("User_Type")+'c');

  }

  }
