import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from './../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class NewUserService {
  user: User;
  url: string;

  constructor(private http: Http) {
    this.url = 'http://localhost:8080';
  }

  // get all users information
  getUsers(): Observable<Response> {
    let resp: Observable<Response>;
    const header: Headers = new Headers({ 'Content-Type': 'application/json' });
    header.append('AUTHORIZATION', localStorage.getItem('token'));
    const options: RequestOptions = new RequestOptions();
    options.headers = header;
    resp = this.http.get(`${this.url}/api/users`,options);
    return resp;
  }

  // get all users information based on status like 'approved', 'pending', 'rejected'
  getUsersByStatus(user): Observable<Response> {
    let resp: Observable<Response>;
    const header: Headers = new Headers({ 'Content-Type': 'application/json' });
    header.append('AUTHORIZATION', localStorage.getItem('token'));
    const options: RequestOptions = new RequestOptions();
    options.headers = header;
    resp = this.http.post(`${this.url}/api/users`,JSON.stringify(user),options);
    return resp;
  }

  // unique user name checking
  usernameCheck(uname): Observable<Response> {
    let resp: Observable<Response>;
    const header: Headers = new Headers({ 'Content-Type': 'application/json' });
    header.append('AUTHORIZATION', localStorage.getItem('token'));
    const options: RequestOptions = new RequestOptions();
    options.headers = header;
    resp = this.http.post(
      `${this.url}/api/users/checkUserName`,
      JSON.stringify(uname),
      options
    );

    return resp;
  }

  // unique email checking
  emailCheck(email): Observable<Response> {
    let resp: Observable<Response>;
    const header: Headers = new Headers({ 'Content-Type': 'application/json' });
    header.append('AUTHORIZATION', localStorage.getItem('token'));
    const options: RequestOptions = new RequestOptions();
    options.headers = header;
    resp = this.http.post(
      `${this.url}/api/users/checkEmail`,
      JSON.stringify(email),
      options
    );

    return resp;
  }

  // unique mobile number checking
  mobileCheck(mobile): Observable<Response> {
    let resp: Observable<Response>;
    const header: Headers = new Headers({ 'Content-Type': 'application/json' });
    header.append('AUTHORIZATION', localStorage.getItem('token'));
    const options: RequestOptions = new RequestOptions();
    options.headers = header;
    resp = this.http.post(
      `${this.url}/api/users/checkMobileNo`,
      JSON.stringify(mobile),
      options
    );

    return resp;
  }


  // create new user
  createUser(user): Observable<Response> {
    let resp: Observable<Response>;
    const header: Headers = new Headers({ 'Content-Type': 'application/json' });
    header.append('AUTHORIZATION', localStorage.getItem('token'));
    const options: RequestOptions = new RequestOptions();
    options.headers = header;
    resp = this.http.post(
      `${this.url}/api/users/create`,
      JSON.stringify(user),
      options
    );

    return resp;
  }


  // approve or reject the user
  userApproval(user): Observable<Response> {
    let resp: Observable<Response>;
    const header: Headers = new Headers({ 'Content-Type': 'application/json' });
    header.append('AUTHORIZATION', localStorage.getItem('token'));
    const options: RequestOptions = new RequestOptions();
    options.headers = header;
    resp = this.http.post(
      `${this.url}/api/users/authorized`,
      JSON.stringify(user),
      options
    );

    return resp;
  }
}
