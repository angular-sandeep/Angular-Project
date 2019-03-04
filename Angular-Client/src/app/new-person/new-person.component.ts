import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {
  Gender,
  Person,
  MaritalStatus,
  Education
} from './../model/person.model';

import { ActivatedRoute, Router } from '@angular/router';

import { Response } from '@angular/http';
import { NewPersonService } from './../service/app.new-person.service';

@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.css']
})
export class NewPersonComponent implements OnInit {
  // selection data
  gender = Gender;
  Marital_Status = MaritalStatus;
  education = Education;

  // model
  person: Person;

  // define formgroup
  newPersonForm: FormGroup;

  //
  PersonId: string;

  // button control for Add and Update
  add: boolean;
  update: boolean;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _newPersonService: NewPersonService
  ) {
    this.add = true;
    this.update = false;

    this.person = new Person(
      '',
      '',
      '',
      '',
      '',
      '',
      0,
      '',
      '',
      '',
      '',
      '',
      0,
      0,
      0,
      '',
      '',
      '',
      '',
      0
    );

    this.newPersonForm = new FormGroup({
      PersonId: new FormControl(this.person.PersonId),
      FirstName: new FormControl(this.person.FirstName),
      MiddleName: new FormControl(this.person.MiddleName),
      LastName: new FormControl(this.person.LastName),
      Gender: new FormControl(this.person.Gender),
      DateOfBirth: new FormControl(this.person.DateOfBirth),
      Age: new FormControl(this.person.Age),
      FlatNumber: new FormControl(this.person.FlatNumber),
      SocietyName: new FormControl(this.person.SocietyName),
      AreaName: new FormControl(this.person.AreaName),
      City: new FormControl(this.person.City),
      State: new FormControl(this.person.State),
      Pincode: new FormControl(this.person.Pincode),
      PhoneNo: new FormControl(this.person.PhoneNo),
      MobileNo: new FormControl(this.person.MobileNo),
      PhysicalDisability: new FormControl(this.person.PhysicalDisability),
      MaritalStatus: new FormControl(this.person.MaritalStatus),
      Education: new FormControl(this.person.Education),
      BirthSign: new FormControl(this.person.BirthSign)
    });
  }

  ngOnInit() {
    this.PersonId = this._activatedRoute.snapshot.params.uid;
    if (this._activatedRoute.snapshot.params.act !== undefined) {
      this.add = false;
      this.update = true;

      this._newPersonService.getPersonsById(this.PersonId).subscribe(
        (resp: Response) => {
          if (resp.json().status == 200) {
            let person = resp.json().data[0];
            this.person = new Person(
              this.PersonId,
              person.FullName.FirstName,
              person.FullName.MiddleName,
              person.FullName.LastName,
              person.Gender,
              person.DateOfBirth,
              person.Age,
              person.Address.FlatNumber,
              person.Address.SocietyName,
              person.Address.AreaName,
              person.City,
              person.State,
              person.Pincode,
              person.PhoneNo,
              person.MobileNo,
              person.PhysicalDisability,
              person.MaritalStatus,
              person.Education,
              person.BirthSign,
              0
            );
          }
        },
        error => {
          console.log(`Error occurred :==>> ${error}`);
        }
      );
    }
  }

  cancel() {
    this._router.navigate(['/auth']);
  }

  save() {
    if (this.add) {
      this.person = this.newPersonForm.value;
      this.person.CreatedBy = parseInt(localStorage.getItem('_v_it'));
      this._newPersonService.createPerson(this.person).subscribe(
        (resp: Response) => {
          if (resp.json().status == 200) {
            this._router.navigate(['/auth']);
          }
        },
        error => {
          console.log(`Error occurred :==>> ${error}`);
        }
      );
    } else {
      this.person = this.newPersonForm.value;
      this.person.CreatedBy = parseInt(localStorage.getItem('_v_it'));
      this._newPersonService.updatePerson(this.person).subscribe(
        (resp: Response) => {
          if (resp.json().status == 200) {
            this._router.navigate(['/auth']);
          }
        },
        error => {
          console.log(`Error occurred :==>> ${error}`);
        }
      );
    }
  }
}
