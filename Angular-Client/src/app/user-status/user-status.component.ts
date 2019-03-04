import { Component, OnInit } from '@angular/core';
import { NewUserService } from './../service/app.new-user.service';
import { User } from './../model/user.model';
import { Router } from '@angular/router';
import { Response } from '@angular/http';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent implements OnInit {
  // data set
  user: User;
  users: Array<User>;

  // filter type
  type: string;
  status: Array<string>;

  // to set table header
  tableHeaders: Array<string>;

  // action attribute
  action: boolean;

  constructor(
    private _router: Router,
    private _newUserService: NewUserService
  ) {
    this.users = new Array<User>();
    this.tableHeaders = ['UserId', 'UserName', 'Email', 'Mobile'];
    this.status = ['Pending', 'Approved', 'Rejected'];
    this.type = 'Pending';
  }

  filter(s) {
    if (s === 'Pending' && localStorage.getItem('_v_it') === '1') {
      this.action = true;
    } else {
      this.action = false;
    }
    const user = { isAuthorized: s };
    this._newUserService.getUsersByStatus(user).subscribe(
      (resp: Response) => {
        if (resp.json().status == 200) {
          this.users = resp.json().user;
        }
      },
      error => {
        console.log(`Error occurred :==>> ${error}`);
      }
    );
  }
  ngOnInit(): void {
    if (this.type === 'Pending' && localStorage.getItem('_v_it') === '1') {
      this.action = true;
    } else {
      this.action = false;
    }
    this._newUserService
      .getUsersByStatus({ isAuthorized: 'Pending' })
      .subscribe(
        (resp: Response) => {
          this.users = resp.json().user;
        },
        error => {
          console.log(`Error occurred :==>> ${error}`);
        }
      );
  }

  getSelectedUser(user): void {
    this._router.navigate([`/auth/person/${user.UserId}/1`]);
  }

  approved(u): void {
    const user = { UserId: u.UserId, isAuthorized: 'Approve' };
    this._newUserService.userApproval(user).subscribe(
      (resp: Response) => {
        if (resp.json().status == 200) {
          this.users = resp.json().user;
        }
      },
      error => {
        console.log(`Error occurred :==>> ${error}`);
      }
    );
  }

  rejected(u): void {
    const user = { UserId: u.UserId, isAuthorized: 'Rejected' };
    this._newUserService.userApproval(user).subscribe(
      (resp: Response) => {
        if (resp.json().status == 200) {
          this.users = resp.json().user;
        }
      },
      error => {
        console.log(`Error occurred :==>> ${error}`);
      }
    );
  }
}
