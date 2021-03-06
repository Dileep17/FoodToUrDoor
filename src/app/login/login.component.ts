import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import {Router} from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { getRandomInt } from '../_helpers/random';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private formBuilder: FormBuilder,
              private dataService: DataserviceService,
              private router: Router,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, getRandomInt());

    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) {
        return;
    }
    this.dataService.signIn(
        this.loginForm.controls.userName.value,
        this.loginForm.controls.password.value)
          .then(res => {
            sessionStorage.setItem('authToken', res['token']);
            sessionStorage.setItem('username', res['username']);
            sessionStorage.setItem('email', res['email']);
            this.router.navigate(['/']);
            this.success = true;
            this.submitted = true;
          })
          .catch( error =>  {
            this.success = false;
            this.submitted = true;
          })
          .finally(() => {
            this.success = false;
            this.submitted = true;
          });
    }
}
