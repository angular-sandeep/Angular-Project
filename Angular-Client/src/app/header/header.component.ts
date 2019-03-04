import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  operator: boolean;
  user: boolean;

  constructor() {
    this.operator = true;
    this.user = false;
  }

  ngOnInit() {
    if (localStorage.getItem("_v_it") === "2") {
      this.operator = false;
    }
    if (localStorage.getItem("_v_it") === "3") {
      this.user = true;
    }
  }
}
