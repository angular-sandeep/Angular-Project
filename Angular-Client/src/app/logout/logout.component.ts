import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
    localStorage.removeItem('token');
    localStorage.removeItem('_v_it');
    localStorage.removeItem('userid');
    this._router.navigate(['']);
  }

}
