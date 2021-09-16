import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { User } from '../models/User';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterGuardService implements CanActivate {

  currentUser: User;

  constructor(private userService: UserService, public router: Router) { }

  canActivate(): boolean {
    this.currentUser = this.userService.getUser();
    if (this.currentUser.id > 0) {
      return true;
    }
    this.router.navigate(['']);
    alert(`You must be logged in to access this page`);
    return false;
  }
}
