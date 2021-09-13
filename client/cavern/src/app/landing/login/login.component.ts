import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'cs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  regForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.regForm = fb.group({
      'username': [null, Validators.required],
      'password': [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(formValues: any) {
    this.userService.login(formValues).subscribe(res => {
      this.userService.storeUserLocal(res);
      this.router.navigateByUrl('invest');
    }, err => {
      alert('Unable to login');
    });
  }
}
