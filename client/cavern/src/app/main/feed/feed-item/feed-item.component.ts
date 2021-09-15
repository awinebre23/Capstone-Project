import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Organization } from 'src/app/models/organization';
import { OrganizationService } from 'src/app/services/organization.service';
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

  constructor(private router: Router, private organizationService: OrganizationService) { }

  ngOnInit(): void {
    this.fundsNeeded = this.house.RequiredFunds - this.house.CurrentFunds;
  }

  details(): void {
    this.router.navigateByUrl(`details/${this.house.HouseId}`);
  }

  onOrgClick() {
    this.organizationService.getAllOrganizations().subscribe((res: any) => {
      res.forEach((org: Organization) => {
        if (org.OrganizationName === this.house.OrganizationName) {
          this.router.navigateByUrl(`organizations/${org.OrganizationId}`);
        }
      });
    }, err => {
      alert('Unable to load organization');
    });
  }
}
