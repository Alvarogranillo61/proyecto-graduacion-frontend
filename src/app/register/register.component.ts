import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  registerUser(registerForm: NgForm) {
    if (registerForm.invalid) {
      return;
    }

    const { username, email, password } = registerForm.value;
    this.apiService.register(username, email, password).subscribe(
      res => {
        console.log('Registration successful', res);
        registerForm.reset();
      },
      err => {
        console.error('Registration error', err);
      }
    );
  }
}
