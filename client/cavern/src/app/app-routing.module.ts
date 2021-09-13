import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule, CanActivate } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './landing/login/login.component';
import { SignupComponent } from './landing/signup/signup.component';
import { FeedComponent } from './main/feed/feed.component';
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
      { path: 'invest', component: FeedComponent, outlet: 'mainOutlet', canActivate: [RegisterGuardService] },
      { path: 'submit-home', component: FeedComponent, canActivate: [RegisterGuardService] },
      { path: 'manage', component: FeedComponent, canActivate: [RegisterGuardService] },
      fallbackRoute
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
