import { Component, OnInit } from '@angular/core';
import { User, Roles } from './../model/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { NewUserService } from './../service/app.new-user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  // error message
  uniqueUserName: boolean = false;
  uniqueEmail: boolean = false;
  uniqueMobile: boolean = false;

  // user model
  user: User;

  // roles for select list
  roles = Roles;

  // define formgroup
  newUserForm: FormGroup;

  constructor(
    private _router: Router,
    private _newUserService: NewUserService
  ) {
    this.user = new User('', '', 0, '', '');

    this.newUserForm = new FormGroup({
      UserName: new FormControl(this.user.UserName, Validators.required),
      Email: new FormControl(this.user.Email, Validators.required),
      Mobile: new FormControl(this.user.Mobile, Validators.required),
      Password: new FormControl(this.user.Password, Validators.required),
      Role: new FormControl(this.user.Role)
    });
  }

  ngOnInit() {}

  checkUniqueUserName() {
    let username = this.newUserForm.value.UserName;

    this._newUserService.usernameCheck({ UserName: username }).subscribe(
      (resp: Response) => {
        if (resp.json().status == 200) {
          this.uniqueUserName = true;
        } else {
          this.uniqueUserName = false;
        }
      },
      error => {
        this.uniqueUserName = false;
        console.log(`Error occurred :==>> ${error}`);
      }
    );
  }

  checkUniqueEmail() {
    let email = this.newUserForm.value.Email;
    this._newUserService.emailCheck({ Email: email }).subscribe(
      (resp: Response) => {
        if (resp.json().status == 200) {
          this.uniqueEmail = true;
        } else {
          this.uniqueEmail = false;
        }
      },
      error => {
        this.uniqueEmail = false;
        console.log(`Error occurred :==>> ${error}`);
      }
    );
  }

  checkUniqueMobile() {
    let mobile = this.newUserForm.value.Mobile;
    this._newUserService.mobileCheck({ Mobile: mobile }).subscribe(
      (resp: Response) => {
        if (resp.json().status == 200) {
          this.uniqueMobile = true;
        } else {
          this.uniqueMobile = false;
        }
      },
      error => {
        this.uniqueMobile = false;
        console.log(`Error occurred :==>> ${error}`);
      }
    );
  }

  cancel() {}

  save() {
    let user = {
      UserName : this.newUserForm.value.UserName,
      Email: this.newUserForm.value.Email,
      Mobile: this.newUserForm.value.Mobile,
      Password: this.newUserForm.value.Password,
      Role: this.newUserForm.value.Role,
      CreatedBy: localStorage.getItem("_v_it")
    };
    this._newUserService.createUser(user).subscribe(
      (resp: Response) => {
        if (resp.json().status == 200) {
          this._router.navigate([`/auth/person/${resp.json().uid}`]);
        }
      },
      error => {
        console.log(`Error occurred :==>> ${error}`);
      }
    );
  }
}
