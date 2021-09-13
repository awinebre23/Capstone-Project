import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'cs-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  regForm: FormGroup;


  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.regForm = fb.group({
      'name': [null, [Validators.required]],
      'username': [null, Validators.required],
      'password': [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(formValues: any) {
    this.userService.signup(formValues).subscribe(res => {
      this.userService.storeUserLocal(res);
      this.router.navigateByUrl('invest');
    }, err => {
      alert('Unable to signup');
    });
  }

}
