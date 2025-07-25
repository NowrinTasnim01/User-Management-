import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../service/auth.sevice';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  user: any;
  newName = '';
  message = '';
  error = '';
  private apiUrl = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient, private authService: AuthService) { }



  ngOnInit() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    this.http.get(this.apiUrl, { headers }).subscribe({
      next: (res: any) => (this.user = res),
      error: (err) => (this.error = err.error.message)
    });
  }

  updateUserData() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    this.http.put(this.apiUrl, { name: this.newName }, { headers }).subscribe({
      next: (res: any) => {
        this.user.name = res.name;
        this.message = 'Name updated successfully';
        this.newName = '';
        this.authService.setUser({ ...this.authService.getUser(), name: res.name });
      },
      error: (err) => (this.error = err.error.message)
    });
  }
}

