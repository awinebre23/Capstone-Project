import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { House } from 'src/app/models/house';
import { User } from 'src/app/models/User';
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

  constructor(private userService: UserService, private router: Router) { }

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
    this.router.navigateByUrl(`organizations/${this.house.OrganizationName}`);
  }

}
