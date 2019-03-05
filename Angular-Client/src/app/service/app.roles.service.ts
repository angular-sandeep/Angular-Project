import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  url: string;

  constructor(private http: Http) {
    this.url = 'http://localhost:8080';
  }

  // create role
  createRole(role): Observable<Response> {
    let resp: Observable<Response>;
    const header: Headers = new Headers({ 'Content-Type': 'application/json' });
    header.append('AUTHORIZATION', localStorage.getItem('token'));
    const options: RequestOptions = new RequestOptions();
    options.headers = header;
    resp = this.http.post(
      `${this.url}/api/roles/create`,
      JSON.stringify(role),
      options
    );

    return resp;
  }

  // getting all roles
  getRoles(): Observable<Response> {
    let resp: Observable<Response>;
    const header: Headers = new Headers({ 'Content-Type': 'application/json' });
    header.append('AUTHORIZATION', localStorage.getItem('token'));
    const options: RequestOptions = new RequestOptions();
    options.headers = header;
    resp = this.http.get(
      `${this.url}/api/roles`,
      options
    );
    return resp;
  }

  // create role
  checkRole(role): Observable<Response> {
    let resp: Observable<Response>;
    const header: Headers = new Headers({ 'Content-Type': 'application/json' });
    header.append('AUTHORIZATION', localStorage.getItem('token'));
    const options: RequestOptions = new RequestOptions();
    options.headers = header;
    resp = this.http.post(
      `${this.url}/api/roles`,
      JSON.stringify(role),
      options
    );

    return resp;
  }
}
