import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'cs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'cavern';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser();
  }
}
