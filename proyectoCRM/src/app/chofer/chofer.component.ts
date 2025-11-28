import { Component, WritableSignal, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioAPIService, Clientes, Chofer } from '../servicio-api.service';
import { AuthService } from '../auth.service'; // Import Auth Service

@Component({
  selector: 'app-chofer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chofer.component.html',
  styleUrl: './chofer.component.css'
})
export class ChoferComponent {
  
  // Dependencies
  private apiService = inject(ServicioAPIService);
  private authService = inject(AuthService);

  // Signals for Data
  public misClientes = signal<Clientes[]>([]); // For Chofers
  public listaChoferes = signal<Chofer[]>([]); // For Admins

  public listaTodosClientes = signal<Clientes[]>([]);
  
  public isLoading = signal(true);
  public userRole = signal<string>('');

  constructor() {
    this.detectRoleAndLoadData();
  }

  detectRoleAndLoadData(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const role = this.authService.getRoleFromToken(token);
      this.userRole.set(role || '');

      if (role === 'ADMIN' || role === 'ROLE_ADMIN') {
        // ADMIN: Load both Chofers AND All Clients to map them
        this.loadAllChoferes();
        this.loadAllClients(); 
      } else {
        // CHOFER: Load only assigned clients
        this.loadMyClients();
      }
    } else {
      this.isLoading.set(false);
    }
  }

  loadMyClients(): void {
    // The backend automatically filters clients for Chofers
    this.apiService.getClientes().subscribe({
      next: (data) => {
        this.misClientes.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  loadAllChoferes(): void {
    this.apiService.getChoferes().subscribe({
      next: (data) => {
        this.listaChoferes.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  loadAllClients(): void {
    this.apiService.getClientes().subscribe({
      next: (data) => {
        this.listaTodosClientes.set(data);
        this.isLoading.set(false);
      }
    });
  }

  getClientesDeChofer(choferId: number): Clientes[] {
    return this.listaTodosClientes().filter(c => c.id_chofer === choferId);
  }
}