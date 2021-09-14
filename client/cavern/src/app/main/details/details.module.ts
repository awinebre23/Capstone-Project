import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationDetailComponent } from './organization-detail/organization-detail.component';
import { EditInvestmentComponent } from './property-detail/edit-investment/edit-investment.component';
import { EditPropertyComponent } from './property-detail/edit-property/edit-property.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';

@NgModule({
  declarations: [
    PropertyDetailComponent,
    OrganizationDetailComponent,
    EditInvestmentComponent,
    EditPropertyComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DetailsModule { }
