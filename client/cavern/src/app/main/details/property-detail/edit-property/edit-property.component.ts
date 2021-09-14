import { Component, Input, OnInit } from '@angular/core';
import { Investor } from 'src/app/models/investor';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'cs-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent implements OnInit {


  @Input()
  investors: Investor[];
  @Input()
  houseId: number;

  constructor(private houseService: HouseService) { }

  ngOnInit(): void {

  }

  removeInvestor(investorId: number) {
    this.houseService.deleteInvestor(this.houseId, investorId).subscribe(() => {
      window.location.reload();
    }, err => {
      alert('Unable to remove investor')
    });
  }

}
