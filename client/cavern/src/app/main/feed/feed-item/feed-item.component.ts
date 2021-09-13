import { Component, Input, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
    this.fundsNeeded = this.house.RequiredFunds - this.house.CurrentFunds;
  }

}
