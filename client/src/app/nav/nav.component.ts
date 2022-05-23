import { Component, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class NavComponent {
  loginForm: any = {}
  isLogged: boolean = false;

  constructor(private accountService: AccountService) { }

  login() {
    this.accountService.login(this.loginForm).subscribe(userDto => {
      this.isLogged = true;
    })
  }

  logout() {
    this.isLogged = false;
  }
}
