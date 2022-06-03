import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  providers: [
    {
      provide: BsDropdownConfig,
      useValue: { isAnimated: true, autoClose: true },
    },
  ],
  animations: [
    trigger('slide', [
      state('up', style({ 'max-height': 0 })),
      state('down', style({ 'max-height': '320px' })),
      transition('up <=> down', [animate('300ms ease')]),
    ]),
  ],
})
export class NavComponent implements OnInit {
  loginForm: any = {};
  openMobileNav = false;

  constructor(
    readonly accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  login() {
    this.accountService.login(this.loginForm).subscribe(
      (user) => {
        this.toastr.success(`Hi, ${user?.name}!`);
        this.router.navigateByUrl('/members');
      },
      ({ error }) => {
        console.error(error);

        this.toastr.error(
          error.errors ? error.errors[Object.keys(error.errors)[0]][0] : error
        );
      }
    );
  }

  toggleMobileMenu() {
    this.openMobileNav = !this.openMobileNav;
  }

  logout() {
    this.accountService.logout()
    this.openMobileNav = false
  }
}
