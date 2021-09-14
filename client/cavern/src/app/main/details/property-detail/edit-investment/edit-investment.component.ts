import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { House } from 'src/app/models/house';
import { Investor } from 'src/app/models/investor';
import { User } from 'src/app/models/User';
import { HouseService } from 'src/app/services/house.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'cs-edit-investment',
  templateUrl: './edit-investment.component.html',
  styleUrls: ['./edit-investment.component.css']
})
export class EditInvestmentComponent implements OnInit {

  @Input()
  house: House;
  @Input()
  fundsNeeded: number;
  hasInvested: boolean = false;
  currentInvestment: number;
  currentUser: User;
  regForm: FormGroup;

  constructor(private userService: UserService, private houseService: HouseService, private formBuilder: FormBuilder) {
    this.regForm = formBuilder.group({
      'investment': [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.currentUser = this.userService.getUser();
    this.house.Investors.forEach(investor => {
      if (investor.InvestorId === this.currentUser.id) {
        this.currentInvestment = investor.Investment;
        this.hasInvested = true;
      }
    });
  }

  onSubmit(formValues: any) {
    this.houseService.addInvestor(this.house.HouseId, new Investor(this.currentUser.id, this.currentUser.name, formValues.investment)).subscribe(res => {
      window.location.reload();
    }, err => {
      alert('Unable to save investment')
    });
  }

  onUpdate(formValues: any) {
    this.houseService.editInvestor(this.house.HouseId, new Investor(this.currentUser.id, this.currentUser.name, formValues.investment)).subscribe(res => {
      window.location.reload();
    }, err => {
      alert('Unable to update investment')
    });
  }

  onRetract() {
    this.houseService.deleteInvestor(this.house.HouseId, this.currentUser.id).subscribe(res => {
      window.location.reload();
    }, err => {
      alert('Unable to update investment')
    });
  }
}
