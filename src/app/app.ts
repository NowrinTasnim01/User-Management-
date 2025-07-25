import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './service/auth.sevice';
import { CommonModule } from '@angular/common';     // ✅ Add this
import { RouterLink, RouterLinkWithHref } from '@angular/router'; // ✅ Import these

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkWithHref], // ✅ Include both
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('twenty-seven-july');
    constructor(public authService: AuthService) {}

}
