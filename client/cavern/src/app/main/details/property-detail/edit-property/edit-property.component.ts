import { Component, Input, OnInit } from '@angular/core';
import { House } from 'src/app/models/house';
import { User } from 'src/app/models/User';

@Component({
  selector: 'cs-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent implements OnInit {


  @Input()
  house: House;
  @Input()
  fundsNeeded: number;
  hasInvested: boolean = false;
  currentInvestment: number;
  currentUser: User;

  constructor() { }

  ngOnInit(): void {
  }

}
