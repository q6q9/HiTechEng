import { User } from './../entities/User';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { animate, query, state, style, transition, trigger } from '@angular/animations';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  animations: [
    // trigger('showHide', [

    //   state('show', style({
    //     // display: 'block',
    //     opacity: 1
    //   })),
    //   state('hide', style({
    //     // display: 'none',
    //     opacity: 0
    //   })),
    //   transition('show => hide', [
    //     animate('1s'),
    //     query('#asdzxc', style({ opacity: 0 }))
    //   ]),
    //   transition('hide => show', [
    //     animate('0.3s'),
    //     query('#asdzxc', style({ opacity: 0 }))
    //   ]),]
    // ),
    trigger('openClose', [
      state('open', style({
        // backgroundColor: 'rgb(136, 96, 208)',
        // 'padding-right': '0px',
      })),
      state('closed', style({
        // backgroundColor: 'rgb(193, 200, 228)',
        // 'padding-right': '1px'
      })),
      transition('open => closed', [
        // animate('1s ease-out'),
        query('#asdzxc', style({ opacity: 0 })),
        // query('#asdzxc', animate(3000, style({ opacity: 0, display: 'none' })), style({ opacity: 0, display: 'none' }))

      ]),
      transition('closed => open', [
        // animate('0.3s ease-in'),
        // query('#asdzxc', animate(333, style({ opacity: 1, display: 'block' })))

      ]),

    ])
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Main';

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.loadCurrentUser()
  }

  loadCurrentUser(): void {
    const unparsedUser = localStorage.getItem('user');

    if (!unparsedUser) return

    const user: User = JSON.parse(unparsedUser)
    this.accountService.setCurrentUser(user)

    this.accountService.currentUser$.subscribe()
  }
}
