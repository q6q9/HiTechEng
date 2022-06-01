import { User } from './../../entities/User';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, ReplaySubject } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:7155/api/'

  private currentUserSource = new ReplaySubject<User | null>(1)
  currentUser$ = this.currentUserSource.asObservable()
  
  constructor(private http: HttpClient) {
    this.currentUserSource.next(null)
  }

  register(registerForm: any): Observable<User | undefined> {
    return this.http.post<User | null>(this.baseUrl + 'account/register', registerForm).pipe(
      map((response) => {
        const user = response

        if (!user) return;

        this.currentUserSource.next(user)
        localStorage.setItem('user', JSON.stringify(user))

        return user;
      })
    )
  }

  login(loginForm: any): Observable<User | undefined> {

    return this.http.post<User | null>(this.baseUrl + 'account/login', loginForm).pipe(
      map((response) => {
        const user = response

        if (!user) return;

        this.currentUserSource.next(user)
        localStorage.setItem('user', JSON.stringify(user))

        return user;
      })
    )
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  logout() {
    this.currentUserSource.next(null)
    localStorage.removeItem('user')
  }
}
