import { Injectable, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User = new User(0, '', '', '', '');
  currentUser = new BehaviorSubject<User>(this.user);

  constructor() { }

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

  static storeUserLocal(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
}
