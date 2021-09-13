import { Component, OnInit } from '@angular/core';
import { House } from 'src/app/models/house';
import { User } from 'src/app/models/User';
import { HouseService } from 'src/app/services/house.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'cs-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  currentUser: User;
  myHouses: House[] = [];
  isAdmin: boolean = false;

  constructor(private houseService: HouseService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (this.currentUser.role === "Member") {
        this.isAdmin = true;
      }
    });

    this.houseService.getAllHouses().subscribe(
      (res: any) => {
        if (this.isAdmin) {
          this.myHouses = res;
        } else {
          res.forEach(house => {
            house.Investors.forEach(investor => {
              if (investor.InvestorId === this.currentUser.id) {
                this.myHouses.push(house);
              }
            });
          });
        }
      }
    );
  }

}
