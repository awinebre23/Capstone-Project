import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { House } from '../../../models/house';

@Component({
  selector: 'cs-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.css']
})
export class FeedItemComponent implements OnInit {


  @Input()
  house: House;
  fundsNeeded: number;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.fundsNeeded = this.house.RequiredFunds - this.house.CurrentFunds;
  }

  details(): void {
    this.router.navigateByUrl(`details/${this.house.HouseId}`);
  }
}
