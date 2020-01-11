import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Form, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { SessionService } from '../global/session.service';
import { Session } from '../global/enum';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public time: number;
  public period: string;
  public loginForm: FormGroup;
  public isValidCredentials = true;
  public userData: any; //Comment: User Model

  constructor(private formBuilder: FormBuilder, private router: Router,
    private loginService: LoginService, private sessionService: SessionService) { }

  ngOnInit() {
    this.loginForm = this.createLoginForm();
    this.getStatus();
  }

  public getStatus() {
    const currentTime = new Date();
    this.time = currentTime.getHours();
    if (this.time < 12) {
      this.period = 'MORNING';
    } else if (this.time >= 12 && this.time < 16) {
      this.period = 'AFTERNOON';
    } else if (this.time >= 16 && this.time <= 24) {
      this.period = 'EVENING';
    }
  }

  public createLoginForm() {
    return this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    this.isValidCredentials = true;
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    const loginData = new FormData();
    loginData.append('userName', username);
    loginData.append('accessKey', password);

    this.loginService.login(loginData).subscribe((response: any) => {
      if (response) {
        this.userData = response;
        this.sessionService.setSession(Session.token, this.userData.accessKey);
        this.sessionService.setSession(Session.userId, this.userData.id);
        this.sessionService.setSession(Session.userName, this.userData.employeeName);
        this.sessionService.setSession(Session.userEmail, this.userData.emailID);
        this.sessionService.setSession(Session.userRole, this.userData.role);
        this.validateStorage();
      } else {
        this.isValidCredentials = false;
      }
    },
    error => {
      this.isValidCredentials = false;
    });
  }

  validateStorage() {
    const userName = this.sessionService.getSession(Session.userName);
    const role = this.sessionService.getSession(Session.userRole);
    if (userName && role) {
      this.router.navigate(['/app/proposals/list']);
    } else {
      this.isValidCredentials = false;
    }
  }

  forgotCredentials() {
    alert('This feature is not implemented yet !!');
  }

}
