import { AccountService } from './../_services/account.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/entities/User';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Output() isCancelled = new EventEmitter<boolean>();

  model: any = {};

  constructor(
    readonly accountService: AccountService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  register() {
    this.accountService.register(this.model).subscribe(
      user => {
        this.toastr.success(`Hi, ${user?.name}!`)
        this.router.navigateByUrl('/members')
      },
      ({error}) => {
        this.toastr.error(error.errors ? error.errors[Object.keys(error.errors)[0]][0] : error)
      })

  }
}
