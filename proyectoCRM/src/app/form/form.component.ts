import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicioAPIService, Clientes } from '../servicio-api.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
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
      this.apiService.addClientes(this.clienteForm.value)
        .subscribe(newCliente => {
          // Actualizamos el signal añadiendo el nuevo cliente
          this.clientes$.update(currentCustomers => [...currentCustomers, newCliente]);
          this.clienteForm.reset();
          // this.snackBar.open('Cliente añadido con éxito', 'Cerrar', { duration: 3000 });
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
