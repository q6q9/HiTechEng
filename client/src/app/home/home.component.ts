import { AccountService } from './../_services/account.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/entities/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  registerMode = false;

  constructor(private http: HttpClient, readonly accountServise: AccountService) { }

  ngOnInit(): void { }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }
}
