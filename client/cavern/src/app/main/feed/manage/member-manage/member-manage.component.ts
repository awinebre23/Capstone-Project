import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { House } from 'src/app/models/house';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'cs-member-manage',
  templateUrl: './member-manage.component.html',
  styleUrls: ['./member-manage.component.css']
})
export class MemberManageComponent implements OnInit {

  @Input()
  house: House;

  constructor(private houseService: HouseService, private router: Router) { }

  ngOnInit(): void {
  }

  removeProperty(): void {
    this.houseService.deleteHouse(this.house.HouseId).subscribe(res => {
      window.location.reload();
    }, err => {
      alert('Unable to remove property.');
    });

  }

  editProperty(): void {
    this.router.navigateByUrl(`edit/${this.house.HouseId}`);
  }

}
