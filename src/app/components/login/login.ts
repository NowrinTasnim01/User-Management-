import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.sevice';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {NgForm} from '@angular/forms';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';     // ✅ Add this


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  isSignup = true;
  name = '';
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) { }
  toggleSignup() {
    this.isSignup = !this.isSignup;
    this.error = '';
  }

  onSubmit(f: NgForm) {
    if (this.isSignup) {
      this.authService.signup(this.name, this.email, this.password).subscribe({
        next: (res) => {
          this.authService.setToken(res.token);
          this.authService.setUser(res.user);
          this.router.navigate([res.user.role === 'admin' ? '/admin' : '/dashboard'])
        },
        error: (err) => (this.error = err.error.message)
      });
    } else {
      this.authService.login(this.email, this.password).subscribe({
        next: (res) => {
          this.authService.setToken(res.token);
          this.authService.setUser(res.user);
          this.router.navigate([res.user.role === 'admin' ? '/admin' : 'dashboard']);
        },
        error: (err) => (this.error = err.error.message)
      });
    }
  }
}