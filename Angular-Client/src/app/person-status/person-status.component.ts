import { Component, OnInit } from "@angular/core";
import { NewPersonService } from "./../service/app.new-person.service";
import { Person } from "./../model/person.model";
import { Router } from "@angular/router";
import { Response } from "@angular/http";

@Component({
  selector: "app-person-status",
  templateUrl: "./person-status.component.html",
  styleUrls: ["./person-status.component.css"]
})
export class PersonStatusComponent implements OnInit {
  // data set
  person: Person;
  persons: Array<Person>;

  // filter type
  type: string;
  status: Array<string>;

  // to set table header
  tableHeaders: Array<string>;

  // action attribute
  action: boolean;

  constructor(
    private _router: Router,
    private _newPersonService: NewPersonService
  ) {
    this.persons = new Array<Person>();
    this.tableHeaders = ["PersonId", "FullName", "Gender", "City", "State"];
    this.status = ["Pending", "Approved"];
    this.type = "Pending";
  }

  filter(s) {
    if (s === "Pending" && localStorage.getItem("_v_it") === "1") {
      this.action = true;
    } else {
      this.action = false;
    }
    const per = { isAuthorized: s };
    this._newPersonService.getPersonsByStatus(per).subscribe(
      (resp: Response) => {
        if (resp.json().status == 200) {
          console.log(resp.json().person);
          this.persons = resp.json().person;
        }
      },
      error => {
        console.log(`Error occurred :==>> ${error}`);
      }
    );
  }

  ngOnInit(): void {
    if (this.type === "Pending" && localStorage.getItem("_v_it") === "1") {
      this.action = true;
    } else {
      this.action = false;
    }
    this._newPersonService
      .getPersonsByStatus({ isAuthorized: "Pending" })
      .subscribe(
        (resp: Response) => {
          this.persons = resp.json().person;
        },
        error => {
          console.log(`Error occurred :==>> ${error}`);
        }
      );
  }

  getSelectedPerson(person: Person): void {

  }

  approved(p: Person): void {
    const person = { PersonId: p.PersonId, isAuthorized: "Approved" };
    this._newPersonService.personApproval(person).subscribe(
      (resp: Response) => {
        if (resp.json().status == 200) {
          alert("approved called");
          this.persons = resp.json().person;
        }
      },
      error => {
        console.log(`Error occurred :==>> ${error}`);
      }
    );
  }

  rejected(p: Person): void {
    const person = { PersonId: p.PersonId, isAuthorized: "Rejected" };
    this._newPersonService.personApproval(person).subscribe(
      (resp: Response) => {
        alert("rejected called");

        if (resp.json().status == 200) {
          this.persons = resp.json().person;
        }
      },
      error => {
        console.log(`Error occurred :==>> ${error}`);
      }
    );
  }
}
