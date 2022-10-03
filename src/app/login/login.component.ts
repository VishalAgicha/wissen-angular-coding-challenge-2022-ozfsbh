import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
/**
 * Modify the login component and the login template to collect login details and add the validators as necessary
 */
import { AuthenticationService } from '../services/authentication.service';
@Component({
  styleUrls: ['./login.component.css'],
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  userDetails: any;
  token: any;
  fieldTextType = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(),
      password: new FormControl(),
      terms: new FormControl(),
    });
  }

  ngOnDestroy() {}

  onSubmit() {
    this.authenticationService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        (data) => {
          this.token = data;
          localStorage.setItem(
            'currentUser',
            JSON.stringify({
              token: this.token,
              username: this.loginForm.value.email,
            })
          );
          this.router.navigate(['welcome', this.loginForm.value.email]);
        },
        (err) => {
          alert('Invalid user');
        }
      );
  }
  // implement the username validator. Min 6 characters and no digits, special chars
  usernameValidator() {
    return false;
  }

  // implement the password validator
  // Min 1 uppercase, 1 lower case and a digit. Total length >= 8
  passwordValidator() {
    return false;
  }

  togglePass() {
    this.fieldTextType = !this.fieldTextType;
  }
}
