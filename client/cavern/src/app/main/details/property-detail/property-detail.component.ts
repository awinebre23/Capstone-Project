import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { House } from 'src/app/models/house';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'cs-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  house: House;
  houseId: number;
  fundsNeeded: number;

  constructor(private houseService: HouseService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.houseId = params.id);
  }

  ngOnInit(): void {
    this.houseService.getHouseById(this.houseId).subscribe(house => {
      this.house = house;
      this.fundsNeeded = this.house.RequiredFunds - this.house.CurrentFunds;
    }, err => {
      alert('Unable to load details - ' + err);
    });
  }

}
