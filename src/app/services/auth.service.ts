import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/authResponse';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signUpUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  private signInUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  private api_key = "AIzaSyAaMGan-iodTa_PGsQP34x0pI3rrA6_n10";

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponse>(this.signUpUrl + this.api_key, {
      email: email,
      password: password,
      returnSecureToken: true
    });
  }
  login(email: string, password: string) {
    return this.http.post<AuthResponse>(this.signInUrl + this.api_key, {
      email: email,
      password: password,
      returnSecureToken: true
    });
  }
}

