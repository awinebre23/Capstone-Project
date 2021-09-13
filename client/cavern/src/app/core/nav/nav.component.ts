import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/main/models/User';
import { UserService } from 'src/app/main/services/user.service';

@Component({
  selector: 'cs-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  currentUser: User;
  isAdmin: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      this.currentUser = user
      if (this.currentUser.role === "Member") {
        this.isAdmin = true;
      }
    });
  }

}
