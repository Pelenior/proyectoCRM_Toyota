import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyectoCRM';

  private authService = inject(AuthService);
  private router = inject(Router);

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  irAPaginaPrincipal(): void {
    const token = localStorage.getItem('token');

    // 1. If not logged in, go to Landing Page
    if (!token) {
      this.router.navigate(['/']);
      return;
    }

    // 2. Logged in? Check Role
    const role = this.authService.getRoleFromToken(token);

    if (role === 'ADMIN') {
      this.router.navigate(['/admin']);
    } else if (role === 'CHOFER') {
      this.router.navigate(['/chofer']);
    } else if (role === 'CLIENTE') {
      this.router.navigate(['/cliente']); 
    } else {
      this.router.navigate(['/']);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
