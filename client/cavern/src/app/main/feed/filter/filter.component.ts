import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { House } from 'src/app/models/house';

@Component({
  selector: 'cs-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {


  @Input()
  houses: House[];
  @Output()
  filterChange = new EventEmitter<House[]>();
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
    document.getElementById('state').addEventListener('change', this.filterByState.bind(this));
    document.getElementById('city').addEventListener('change', this.filterByCity.bind(this));
    document.getElementById('zip').addEventListener('change', this.filterByZip.bind(this));
    document.getElementById('organization').addEventListener('change', this.filterByOrganization.bind(this));
    document.getElementById('progress').addEventListener('change', this.filterByProgress.bind(this));
  }

  checkValues() {
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
    this.houses.forEach(house => {
      if (house.State === event.target.value) {
        this.filteredHouses.push(house);
      }
    });
    this.filterChange.emit(this.filteredHouses);
    this.filteredHouses = [];
  }

  filterByCity(event) {
    this.houses.forEach(house => {
      if (house.City === event.target.value) {
        this.filteredHouses.push(house);
      }
    });
    this.filterChange.emit(this.filteredHouses);
    this.filteredHouses = [];
  }

  filterByZip(event) {
    this.houses.forEach(house => {
      if (house.ZipCode === event.target.value) {
        this.filteredHouses.push(house);
      }
    });
    this.filterChange.emit(this.filteredHouses);
    this.filteredHouses = [];
  }

  filterByOrganization(event) {
    this.houses.forEach(house => {
      if (house.OrganizationName === event.target.value) {
        this.filteredHouses.push(house);
      }
    });
    this.filterChange.emit(this.filteredHouses);
    this.filteredHouses = [];
  }

  filterByProgress(event) {
    this.houses.forEach(house => {
      if (house.Progress === event.target.value) {
        this.filteredHouses.push(house);
      }
    });
    this.filterChange.emit(this.filteredHouses);
    this.filteredHouses = [];
  }

  onClear() {
    window.location.reload();
  }
}