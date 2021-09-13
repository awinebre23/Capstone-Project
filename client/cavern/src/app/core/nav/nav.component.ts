import { Component, OnChanges, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'cs-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnChanges {

  currentUser: User;
  isAdmin: boolean = false;
  isRegistered: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log(this.currentUser);
      if (this.currentUser.role === "Member") {
        this.isAdmin = true;
        this.isRegistered = true;
      } else if (this.currentUser.role === "Investor") {
        this.isAdmin = false;
        this.isRegistered = true;
      }
    });
  }

  ngOnChanges() {

  }

}
