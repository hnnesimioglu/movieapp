import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/authResponse';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signUpUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
  private signInUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
  private api_key = "AIzaSyAaMGan-iodTa_PGsQP34x0pI3rrA6_n10";
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponse>(this.signUpUrl + this.api_key, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(response => {
        const expirationDate = new Date(new Date().getTime() + (+response.expiresIn * 1000));

        const user = new User(
          response.email,
          response.localId,
          response.idToken,
          expirationDate
        );

        this.user.next(user);

      }),
    );
  }
  login(email: string, password: string) {
    return this.http.post<AuthResponse>(this.signInUrl + this.api_key, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(response => {
        const expirationDate = new Date(new Date().getTime() + (+response.expiresIn * 1000));

        const user = new User(
          response.email,
          response.localId,
          response.idToken,
          expirationDate
        );

        this.user.next(user);

      }),
    );;
  }
  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }
}

