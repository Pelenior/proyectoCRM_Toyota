import { Component, WritableSignal, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioAPIService, Clientes, Chofer } from '../servicio-api.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {

  private apiService = inject(ServicioAPIService);
  private authService = inject(AuthService);

  public me = signal<Clientes | null>(null);
  public myChofer = signal<Chofer | null>(null);
  
  public isLoading = signal(true);

  constructor() {
    this.loadMyData();
  }

  loadMyData(): void {
    // 1. Get all clients (The backend filters to return ONLY me because I am a CLIENTE role)
    this.apiService.getClientes().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          const myProfile = data[0]; // The list only has 1 item (me)
          this.me.set(myProfile);

          // 2. If I have a chofer assigned, fetch their details
          if (myProfile.id_chofer) {
            this.loadMyChofer(myProfile.id_chofer);
          } else {
            this.isLoading.set(false);
          }
        }
      },
      error: () => this.isLoading.set(false)
    });
  }

  loadMyChofer(choferId: number): void {
    // We fetch all chofers and find ours (simple solution)
    this.apiService.getChoferes().subscribe(chofers => {
      const found = chofers.find(c => c.id === choferId);
      this.myChofer.set(found || null);
      this.isLoading.set(false);
    });
  }

  contratarService(): void {
    this.isLoading.set(true);
    // Call the "Smart Assign" logic
    this.apiService.assignChoferAutomatico().subscribe({
      next: (updatedClient) => {
        this.me.set(updatedClient);
        // Reload chofer details
        if (updatedClient.id_chofer) {
          this.loadMyChofer(updatedClient.id_chofer);
        }
      },
      error: (err) => {
        console.error(err);
        alert('Error al contratar servicio.');
        this.isLoading.set(false);
      }
    });
  }

  cancelarService(): void {
    if (confirm('¿Estás seguro de que deseas cancelar el servicio de chofer?')) {
      this.isLoading.set(true);
      
      this.apiService.cancelarChofer().subscribe({
        next: (updatedClient) => {
          // 1. Update my profile data
          this.me.set(updatedClient);
          
          // 2. Clear the chofer data since I no longer have one
          this.myChofer.set(null);
          
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error(err);
          this.isLoading.set(false);
          alert('Error al cancelar el servicio.');
        }
      });
    }
  }
}