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
    }).pipe(
      catchError(this.handleError)
    );
  }
  login(email: string, password: string) {
    return this.http.post<AuthResponse>(this.signInUrl + this.api_key, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(response: HttpErrorResponse) {
    let message = "Hata Oluştu";

    if (!navigator.onLine) {
      message = "check your internet connection";
      return throwError(message);
    }

    if (response.error) {
      switch (response.error.error.message) {
        case "EMAIL_EXISTS":
          message = "mail is already registered";
          break;
        case "EMAIL_NOT_FOUND":
          message = "email not found";
          break;
        case "INVALID_PASSWORD":
          message = "invalid password";
          break;
      }
    }
    return throwError(message);
  }

}

