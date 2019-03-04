import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  // error message
  uniqueRole: boolean = false;

  // define formgroup
  roleForm: FormGroup;

  Role: string;

  constructor(private _router: Router) {
    this.roleForm = new FormGroup({
      Role: new FormControl(this.Role, Validators.required)
    });
  }

  ngOnInit() {}

  cancel() {}

  save() {
    this.Role = this.roleForm.value;
    alert(JSON.stringify(this.Role));
    //this._router.navigate(['/auth/person']);
  }
}
