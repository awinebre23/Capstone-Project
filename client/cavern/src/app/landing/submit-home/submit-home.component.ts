import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { House } from 'src/app/models/house';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'cs-submit-home',
  templateUrl: './submit-home.component.html',
  styleUrls: ['./submit-home.component.css']
})
export class SubmitHomeComponent implements OnInit {

  homeForm: FormGroup;

  constructor(private houseService: HouseService, private formBuilder: FormBuilder, private router: Router) {
    this.homeForm = formBuilder.group({
      'address': [null, [Validators.required]],
      'state': [null, [Validators.required]],
      'city': [null, [Validators.required]],
      'zipCode': [null, [Validators.required]],
      'organization': [null, [Validators.required]],
      'description': [null, [Validators.required]],
      'requiredFunds': [null, [Validators.required]],
      'images': [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(formValues: any) {
    let house: House = new House(null, formValues.address, formValues.state, formValues.city,
      formValues.zipCode, formValues.organization, formValues.description,
      formValues.requiredFunds, 0, 'In Progress', [formValues.images], null);
    this.houseService.createHouse(house).subscribe(res => {
      this.router.navigateByUrl(`details/${res.HouseId}`).then(() => window.location.reload());
    }, err => {
      alert('Unable to submit home.');
    })
  }

}
