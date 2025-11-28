import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicioAPIService, Clientes } from '../servicio-api.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  // Signal para gestionar el estado de los clientes
  private clientes$: WritableSignal<Clientes[]> = signal([]);

  // Signal para controlar el estado de carga inicial
  public isLoading = signal(true);

  // Signal de solo lectura para usarlo en la plantilla
  public clientes = this.clientes$.asReadonly();

  clienteForm: FormGroup
  displayedColumns: string[] = ['name', 'email', 'phone', 'actions'];

  constructor(
    private apiService: ServicioAPIService,
    private fb: FormBuilder,
  ) {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
    });

    // Carga inicial de datos
    this.loadClientes();
  }

  // Carga clientes y finaliza el proceso al terminar
  loadClientes(): void {
    this.apiService.getClientes().subscribe(data => {
      this.clientes$.set(data);
      this.isLoading.set(false);
    });
  }

  onSubmit(): void {
    if (this.clienteForm.valid) {
      const clienteData = this.clienteForm.value;

      // Elimina cualquier carácter que no sea un dígito
      const telefonoLimpio = clienteData.telefono.toString().replace(/\D/g, '');

      //Crea el payload para el POST:
      const payload = {
        nombre: clienteData.nombre,
        email: clienteData.email,
        // Pasa la cadena a número
        telefono: parseInt(telefonoLimpio, 10)
      };

      this.apiService.addClientes(payload as Omit<Clientes, 'id'>)
        .subscribe(newCliente => {
          // Actualizamos el signal añadiendo el nuevo cliente
          this.clientes$.update(currentCustomers => [...currentCustomers, newCliente]);
          this.clienteForm.reset();
        });
    }
  }

  deleteCliente(id: number): void {
    this.apiService.deleteClientes(id).subscribe(() => {
      // Actualizamos el signal filtrando el cliente borrado
      this.clientes$.update(clientes => clientes.filter(c => c.id !== id));
      // this.snackBar.open('Cliente eliminado', 'Cerrar', { duration: 3000 });
    });
  }
}