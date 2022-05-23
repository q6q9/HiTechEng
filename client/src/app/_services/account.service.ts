import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:7155/api/'

  constructor(private http: HttpClient) { }

  login(LoginForm: any) {
    return this.http.post(this.baseUrl + 'account/login', LoginForm)
  }
}
