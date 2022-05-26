import { AccountService } from './../_services/account.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/entities/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() isCancelled = new EventEmitter<boolean>();

  model: any = {};

  constructor(readonly accountService: AccountService) { }

  ngOnInit(): void { }

  register() {
    this.accountService.register(this.model).subscribe()
  }
}
