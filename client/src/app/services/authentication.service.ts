import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentToken: string;
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(username: string, password: string) {
    return this.http.post<any>('v1/api/authenticate', { username: username, password: password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.currentToken = user.token;
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  getAccessToken() {
    if (this.isUserLoggedIn()) {
      return (this.currentToken ? this.currentToken : this.getLoggedInUser().token);
    }
    else
      return null;
  }

  getRefreshToken()  {
    return "";
  }

  getLoggedInUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
  isUserLoggedIn() {
    return !(this.getLoggedInUser() === undefined || this.getLoggedInUser() === null);
  }

  checkLoggedIn() {
    if (JSON.parse(localStorage.getItem('currentUser')) === undefined || JSON.parse(localStorage.getItem('currentUser')) === null) {
      this.router.navigate([''])
    }
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
