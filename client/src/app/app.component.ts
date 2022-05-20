import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Main';
  users: any

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(): void {
    this.http.get('https://localhost:7155/api/users').subscribe(
      response => users = response
    )
  }
}
