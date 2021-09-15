import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Organization } from '../models/organization';
import { OrganizationService } from '../services/organization.service';

@Component({
  selector: 'cs-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  organizations: Organization[] = [];

  constructor(private router: Router, private organizationService: OrganizationService) { }

  ngOnInit(): void {
    this.organizationService.getAllOrganizations().subscribe((res: any) => {
      res.forEach(org => {
        this.organizations.push(org);
      });
    }, err => {
      alert('Unable to load organization');
    });
  }

  clickedLogin(): void {
    this.router.navigateByUrl('/login');
  }

  clickedSignup(): void {
    this.router.navigateByUrl('/signup');
  }

  clickedSubmit(): void {
    this.router.navigateByUrl('/submit-home');
  }
}
