import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule, CanActivate } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './landing/login/login.component';
import { SignupComponent } from './landing/signup/signup.component';
import { SubmitHomeComponent } from './landing/submit-home/submit-home.component';
import { OrganizationDetailComponent } from './main/details/organization-detail/organization-detail.component';
import { PropertyDetailComponent } from './main/details/property-detail/property-detail.component';
import { FeedComponent } from './main/feed/feed.component';
import { ManageComponent } from './main/feed/manage/manage.component';
import { RegisterGuardService } from './services/register-guard-service';


const fallbackRoute: Route = {
  path: '**', component: FeedComponent
};

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: LandingComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'invest', component: FeedComponent, canActivate: [RegisterGuardService] },
      { path: 'submit-home', component: SubmitHomeComponent },
      { path: 'manage', component: ManageComponent, canActivate: [RegisterGuardService] },
      { path: 'details/:id', component: PropertyDetailComponent, canActivate: [RegisterGuardService] },
      { path: 'edit/:id', component: PropertyDetailComponent, canActivate: [RegisterGuardService] },
      { path: 'organization/:id', component: OrganizationDetailComponent, canActivate: [RegisterGuardService] },
      fallbackRoute
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
