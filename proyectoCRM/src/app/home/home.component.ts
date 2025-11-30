import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServicioAPIService } from '../servicio-api.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  private router = inject(Router);
  private apiService = inject(ServicioAPIService);
  private authService = inject(AuthService);

  public hasDriver = signal(false);
  public userRole = signal<string | null>(null);

  constructor() {
    this.checkUserStatus();
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  checkUserStatus(): void {
    const token = localStorage.getItem('token');
    
    if (token) {
      const role = this.authService.getRoleFromToken(token);
      this.userRole.set(role);

      if (role === 'CLIENTE' || role === 'ROLE_CLIENTE') {
        this.apiService.getClientes().subscribe({
          next: (data) => {
            if (data && data.length > 0 && data[0].id_chofer) {
              this.hasDriver.set(true);
            }
          },
          error: () => this.hasDriver.set(false)
        });
      }
    }
  }

  startHiring(): void {
    if (this.isLoggedIn) {
      this.router.navigate(['/cliente']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}