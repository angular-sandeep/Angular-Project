import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Login } from './../model/login.model';

@Injectable()
export class LoginService {
  url: string;

  constructor(private http: Http) {
    this.url = 'http://localhost:8080';
  }

  login(login: Login): Observable<Response> {
    let resp: Observable<Response>;
    const header: Headers = new Headers({ 'Content-Type': 'application/json' });
    const options: RequestOptions = new RequestOptions();
    options.headers = header;
    resp = this.http.post(
      `${this.url}/api/user/auth`,
      JSON.stringify(login),
      options
    );

    return resp;
  }
}
