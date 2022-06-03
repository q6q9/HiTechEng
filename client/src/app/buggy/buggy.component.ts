import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buggy',
  templateUrl: './buggy.component.html',
  styleUrls: ['./buggy.component.scss'],
})
export class BuggyComponent implements OnInit {
  baseUrl = 'https://localhost:7155/api/';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  request400() {
    this.http.get(this.baseUrl + 'buggy/400').subscribe((response) => {
      console.log(response);
    });
  }

  request401() {
    this.http.get(this.baseUrl + 'buggy/401').subscribe((response) => {
      console.log(response);
    });
  }

  request404() {
    this.http.get(this.baseUrl + 'buggy/404').subscribe((response) => {
      console.log(response);
    });
  }

  request500() {
    this.http.get(this.baseUrl + 'buggy/500').subscribe((response) => {
      console.log(response);
    });
  }
}
