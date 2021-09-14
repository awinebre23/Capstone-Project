import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { House } from 'src/app/models/house';
import { Investor } from 'src/app/models/investor';
import { HouseService } from 'src/app/services/house.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'cs-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  house: House;
  houseId: number;
  investors: Investor[] = [];
  fundsNeeded: number;
  isAdmin: boolean = false;

  constructor(private houseService: HouseService, private userService: UserService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.houseId = params.id);
  }

  ngOnInit(): void {
    if (this.userService.getUser().role === 'Member') {
      this.isAdmin = true;
    }
    this.houseService.getHouseById(this.houseId).subscribe(house => {
      this.house = house;
      this.investors = house.Investors;
      this.fundsNeeded = this.house.RequiredFunds - this.house.CurrentFunds;
    }, err => {
      alert('Unable to load details - ' + err);
    });
  }

}
