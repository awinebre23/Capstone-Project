import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Organization } from 'src/app/models/organization';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'cs-organization-detail',
  templateUrl: './organization-detail.component.html',
  styleUrls: ['./organization-detail.component.css']
})
export class OrganizationDetailComponent implements OnInit {

  organizationId: string;
  organization: Organization;

  constructor(private route: ActivatedRoute, private organizationService: OrganizationService) {
    this.route.params.subscribe(params => this.organizationId = params.id);
  }

  ngOnInit(): void {
    this.organizationService.getAllOrganizations().subscribe((res: any) => {
      res.forEach((org: Organization) => {
        if (org.OrganizationId === this.organizationId) {
          this.organization = org;
        }
      });
    }, err => {
      alert('Unable to load organization');
    });
  }

}
