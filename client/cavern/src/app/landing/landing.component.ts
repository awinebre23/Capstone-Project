import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cs-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
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
