import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RolesService } from './../service/app.roles.service';
import { Response } from '@angular/http';
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  // error message
  uniqueRole: boolean;

  // define formgroup
  roleForm: FormGroup;

  Role: string;
  roles;

  constructor(private _router: Router, private _roleService: RolesService) {
    this.roleForm = new FormGroup({
      Role: new FormControl(this.Role, Validators.required)
    });
    this.uniqueRole = false;
  }

  ngOnInit() {
    this._roleService.getRoles().subscribe(
      (resp: Response) => {
        if (resp.json().status == 200) {
          this.roles = resp.json().roles;
        }
      },
      error => {
        console.log(`Error occurred :==>> ${error}`);
      }
    );
  }

  cancel() {
    this._router.navigate(['/auth']);
  }

  // creating new role
  save() {
    this.Role = this.roleForm.value;
    this._roleService.createRole(this.Role).subscribe(
      (resp: Response) => {
        if (resp.json().status == 200) {
          this.roles = resp.json().roles;
        }
      },
      error => {
        console.log(`Error occurred :==>> ${error}`);
      }
    );
  }

  // checking existing role
  checkUniqueRole() {
    this.Role = this.roleForm.value;
    this._roleService.checkRole(this.Role).subscribe(
      (resp: Response) => {
        if (resp.json().status == 200) {
          this.uniqueRole = true;
        }
      },
      error => {
        if (error.status === 404) {
          this.uniqueRole = false;
        }
        console.log(`Error occurred :==>> ${error}`);
      }
    );
  }
}
