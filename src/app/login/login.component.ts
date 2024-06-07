import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginNgForm') loginNgForm!: NgForm;

  alert: { type: string; message: string } = {
    type: 'success',
    message: '',
  };
  showAlert: boolean = false;

  constructor(private apiService: ApiService, private router: Router, private toast: ToastrService) { }

  ngOnInit(): void {
    this.apiService.jwtUserToken.subscribe(token => {
      if (token) {
        this.router.navigateByUrl('/home').then();
      }
    });
  }

  login(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
    const { username, password } = loginForm.value;
    this.apiService.login(username, password).subscribe(
      (res) => {
        const token = res.token;
        if (token) {
          this.toast.success('Login successful, redirecting now...', '', {
            timeOut: 700,
            positionClass: 'toast-top-center'
          }).onHidden.toPromise().then(() => {
            this.apiService.jwtToken$.next(token);
            localStorage.setItem('act', btoa(token));
            this.router.navigateByUrl('/').then();
          });
        }
      },
      (error: HttpErrorResponse) => {
        this.toast.error('Login failed', 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
        this.alert = {
          type: 'error',
          message: 'Wrong username or password'
        };
        this.showAlert = true;
        loginForm.reset();
      }
    );
  }
}
