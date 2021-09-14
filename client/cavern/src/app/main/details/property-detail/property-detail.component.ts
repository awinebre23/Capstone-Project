import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'cs-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  constructor(private houseService: HouseService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => console.log(params));
  }

  ngOnInit(): void {
  }

}
