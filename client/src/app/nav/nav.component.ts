import { Component, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class NavComponent implements OnInit {
  loginForm: any = {}

  constructor(readonly accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(user => {
      console.log(user);
      
    })
  }
}
