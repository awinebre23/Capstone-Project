import { Component, Input, OnInit } from '@angular/core';
import { House } from 'src/app/models/house';

@Component({
  selector: 'cs-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {


  @Input()
  houses: House[];
  filteredHouses: House[] = [];
  states: Set<string> = new Set();
  cities: Set<string> = new Set();
  zipCodes: Set<string> = new Set();
  organizations: Set<string> = new Set();
  progress: Set<string> = new Set();

  constructor() { }

  ngOnInit(): void {
    this.checkValues();
    this.setEmitters();
  }

  setEmitters() {
    document.getElementById('state').addEventListener('change', this.filterByState);
  }

  checkValues() {
    console.log(this);
    console.log(this.houses);
    this.houses.forEach(house => {
      if (!this.states.has(house.State)) {
        this.states.add(house.State);
      }
      if (!this.cities.has(house.City)) {
        this.cities.add(house.City);
      }
      if (!this.zipCodes.has(house.ZipCode)) {
        this.zipCodes.add(house.ZipCode);
      }
      if (!this.organizations.has(house.OrganizationName)) {
        this.organizations.add(house.OrganizationName);
      }
      if (!this.progress.has(house.Progress)) {
        this.progress.add(house.Progress);
      }
    });
  }

  filterByState(event) {
    console.log(this);
    console.log(this.houses);
    console.log(this.filteredHouses);
    const state = event.target.value;
    this.houses.forEach(house => {
      if (house.State !== state) {
        this.filteredHouses.push(house);
      }
    });
    this.houses = { ...this.filteredHouses };
    this.filteredHouses = [];
  }

  onClear() {
    window.location.reload();
  }
}