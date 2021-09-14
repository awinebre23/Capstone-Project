import { Component, OnInit } from '@angular/core';
import { HouseService } from 'src/app/services/house.service';
import { House } from '../../models/house';


@Component({
  selector: 'cs-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  houses: House[] = [];

  constructor(private houseService: HouseService) { }

  ngOnInit(): void {
    this.houseService.getAllHouses().subscribe((res: any) => {
      this.houses = res;
    });
  }
}
