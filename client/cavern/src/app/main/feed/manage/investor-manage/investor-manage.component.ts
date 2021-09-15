import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { House } from 'src/app/models/house';
import { Organization } from 'src/app/models/organization';
import { User } from 'src/app/models/User';
import { OrganizationService } from 'src/app/services/organization.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'cs-investor-manage',
  templateUrl: './investor-manage.component.html',
  styleUrls: ['./investor-manage.component.css']
})
export class InvestorManageComponent implements OnInit {

  @Input()
  house: House;
  isCompleted: boolean = false;
  yourInvestment: number;
  currentUser: User;

  constructor(private userService: UserService, private organizationService: OrganizationService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getUser();
    console.log(this.currentUser);
    console.log(this.house);
    this.house.Investors.forEach(investor => {
      if (investor.InvestorId === this.currentUser.id) {
        this.yourInvestment = investor.Investment;
      }
    })
    if (this.house.Progress === 'Investment Total Reached') {
      this.isCompleted = true;
    }
  }

  editInvestment() {
    this.router.navigateByUrl(`edit/${this.house.HouseId}`);
  }

  contactOrganization() {
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
