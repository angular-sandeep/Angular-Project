import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  operator: boolean;
  user: boolean;

  constructor(private _router: Router) {
    this.operator = true;
    this.user = false;
  }

  ngOnInit() {
    if (localStorage.getItem("_v_it") === "2") {
      this.operator = false;
    }
    if (localStorage.getItem("_v_it") === "3") {
      this.user = true;
      this._router.navigate([
        `/auth/person/${localStorage.getItem("userid")}/1`
      ]);
    }
  }
}
