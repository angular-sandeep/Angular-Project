import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './../service/app.logic.service';
import { Login } from './../model/login.model';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: Login;
  errorLogin: boolean;

  // define formgroup
  loginForm: FormGroup;

  constructor(private _loginService: LoginService, private _router: Router) {
    this.login = new Login('', '');
    this.errorLogin = false;

    this.loginForm = new FormGroup({
      UserName: new FormControl(this.login.UserName, Validators.required),
      Password: new FormControl(this.login.Password, Validators.required)
    });
  }

  ngOnInit(): void {}

  save(): void {
    this.login = this.loginForm.value;

    this._loginService.login(this.login).subscribe(
      (resp: Response) => {
        if (resp.json().status == 200) {
          this.errorLogin = false;
          localStorage.setItem('token', resp.json().token);
          localStorage.setItem('userid', resp.json().UserId);

          if (resp.json().role === 'Admin') {
            localStorage.setItem('_v_it', '1');
          } else if (resp.json().role === 'Operator') {
            localStorage.setItem('_v_it', '2');
          } else {
            localStorage.setItem('_v_it', '3');
          }
          this._router.navigate(['auth']);
        } else {
          this.errorLogin = true;
        }
      },
      error => {
        this.errorLogin = true;
        console.log(`Error occurred :==>> ${error}`);
      }
    );
  }
}
