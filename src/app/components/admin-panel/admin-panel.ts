import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../service/auth.sevice';
import { Dashboard } from '../dashboard/dashboard';
@Component({
  selector: 'app-admin-panel',
  imports: [FormsModule, CommonModule, Dashboard],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css'
})
export class AdminPanel {
  view = 'account';
  user: any;
  users: any[] = [];
  message = '';
  error = '';
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    this.http.get(`${this.apiUrl}/user`, { headers }).subscribe({
      next: (res: any) => (this.user = res),
      error: (err) => (this.error = err.error.message)
    });
    this.loadUsers();
  }

  loadUsers() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    this.http.get(`${this.apiUrl}/admin/users`, { headers }).subscribe({
      next: (res: any) => (this.users = res),
      error: (err) => (this.error = err.error.message)
    });
  }

  updateRole(id: number, role: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    this.http.put(`${this.apiUrl}/admin/users/${id}`, { role }, { headers }).subscribe({
      next: () => (this.message = 'Role updated successfully'),
      error: (err) => (this.error = err.error.message)
    });
  }
  deleteUser(id: number) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    this.http.delete(`${this.apiUrl}/admin/users/${id}`, { headers }).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== id);
        this.message = 'User deleted successfully';
      },
      error: (err) => (this.error = err.error.message)
    });
  }

}
