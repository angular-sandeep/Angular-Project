import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Person } from './../model/person.model';

@Injectable({
  providedIn: 'root'
})
export class NewPersonService {
  person: Person;

  url: string;

  constructor(private http: Http) {
    this.url = 'http://localhost:8080';
  }

  // create new person
  createPerson(person): Observable<Response> {
    let resp: Observable<Response>;
    const header: Headers = new Headers({ 'Content-Type': 'application/json' });
    header.append('AUTHORIZATION', localStorage.getItem('token'));
    const options: RequestOptions = new RequestOptions();
    options.headers = header;
    resp = this.http.post(
      `${this.url}/api/person/create`,
      JSON.stringify(person),
      options
    );

    return resp;
  }

  // get all persons information based on status like 'approved', 'pending'
  getPersonsByStatus(person): Observable<Response> {
    let resp: Observable<Response>;
    const header: Headers = new Headers({ 'Content-Type': 'application/json' });
    header.append('AUTHORIZATION', localStorage.getItem('token'));
    const options: RequestOptions = new RequestOptions();
    options.headers = header;
    resp = this.http.post(
      `${this.url}/api/person`,
      JSON.stringify(person),
      options
    );
    return resp;
  }

  // approve or reject the user
  personApproval(person): Observable<Response> {
    let resp: Observable<Response>;
    const header: Headers = new Headers({ 'Content-Type': 'application/json' });
    header.append('AUTHORIZATION', localStorage.getItem('token'));
    const options: RequestOptions = new RequestOptions();
    options.headers = header;
    resp = this.http.post(
      `${this.url}/api/person/approve`,
      JSON.stringify(person),
      options
    );

    return resp;
  }


  // get person by person id
  getPersonsById(pid): Observable<Response> {
    let resp: Observable<Response>;
    const header: Headers = new Headers({ 'Content-Type': 'application/json' });
    header.append('AUTHORIZATION', localStorage.getItem('token'));
    const options: RequestOptions = new RequestOptions();
    options.headers = header;
    resp = this.http.get(
      `${this.url}/api/person/${pid}`,
      options
    );
    return resp;
  }

  // create new person
  updatePerson(person): Observable<Response> {

    console.log("update called");
    console.log(person);

    let resp: Observable<Response>;
    const header: Headers = new Headers({ 'Content-Type': 'application/json' });
    header.append('AUTHORIZATION', localStorage.getItem('token'));
    const options: RequestOptions = new RequestOptions();
    options.headers = header;
    resp = this.http.put(
      `${this.url}/api/person/update`,
      JSON.stringify(person),
      options
    );

    return resp;
  }
}
