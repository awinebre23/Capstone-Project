import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User = new User(0, '', '', '', '');
  currentUser = new BehaviorSubject<User>(this.user);
  private loginUrl: string = 'http://localhost:8082/api/login';
  private signupUrl: string = 'http://localhost:8082/api/users';

  constructor(private http: HttpClient) { }

  getUser(): User {
    if (localStorage.getItem('currentUser')) {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      this.currentUser = new BehaviorSubject(user);
      return user;
    } else {
      return this.user;
    }
  }

  updateUser(user: User) {
    this.currentUser.next(user);
  }

  login(formValues: any): Observable<User> {
    return this.http.post<User>(this.loginUrl, formValues);
  }

  signup(formValues: any): Observable<User> {
    return this.http.post<User>(this.signupUrl, formValues);
  }

  storeUserLocal(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logOut() {
    new User(0, '', '', '', '');
    localStorage.clear();
    window.location.reload();
  }
}
