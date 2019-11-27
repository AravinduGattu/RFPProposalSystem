import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Form, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { UserData } from '../global/constants';

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
              private loginService: LoginService) { }

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

    // Temporary process
    //if (username === 'Thomson@pactera.com' && password === 'password') {
    //  this.router.navigate(['']);
    //} else {
    //  this.isValidCredentials = false;
    //}

    // Main Login Process

    const loginData = new FormData();
    loginData.append('userName', username);
    loginData.append('accessKey', password);

    this.loginService.login(loginData).subscribe((response: any) => {
      if (response) {
        this.userData = response;
        this.loginService.setSessionStorage('token', 'TOKEN');
        this.loginService.setSessionStorage('userid', this.userData.id);
        this.loginService.setSessionStorage('name', this.userData.name);
        this.loginService.setSessionStorage('email', this.userData.email);
        this.loginService.setSessionStorage('role', this.userData.role);
        this.validateStorage();
      } else {
        this.isValidCredentials = false;
      }
     });
  }

  validateStorage() {
    const userName = this.loginService.getSessionStorage('name');
    const role = this.loginService.getSessionStorage('role');
    if (userName && role) {
      this.router.navigate(['']);
    } else {
      this.isValidCredentials = false;
    }
  }

}
