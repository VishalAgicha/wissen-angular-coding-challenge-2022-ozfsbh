import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
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

  get getEmail() {
    return this.loginForm.get('email');
  }

  get getPassword() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^[A-z.@]*$/), //allowing . and @ as we need to test with emailid
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.{8,})/),
        Validators.minLength(8),
      ]),
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

  togglePass() {
    this.fieldTextType = !this.fieldTextType;
  }
}
