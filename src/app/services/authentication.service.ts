import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiBaseUri}auth/login`, { email: username, password: password })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            const u = new User({
              username: username,
              password: password,
              token: user.auth_token});
            localStorage.setItem('currentUser', JSON.stringify(u));
            this.currentUserSubject.next(u);
            return u;
        }));
  }

  logout() {
    this.http.post<any>(`${environment.apiBaseUri}auth/logout`, {});
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
