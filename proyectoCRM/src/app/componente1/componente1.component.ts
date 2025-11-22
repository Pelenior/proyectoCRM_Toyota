import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicioAPIService, Customer } from '../servicio-api.service';

// Imports de Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-componente1',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './componente1.component.html',
  styleUrl: './componente1.component.css'
})
export class Componente1Component {
  // Signal para gestionar el estado de los clientes
  private customers$: WritableSignal<Customer[]> = signal([]);

  // Signal para controlar el estado de carga inicial
  public isLoading = signal(true);

  // Signal de solo lectura para usarlo en la plantilla
  public customers = this.customers$.asReadonly();

  customerForm: FormGroup
  displayedColumns: string[] = ['name', 'email', 'phone', 'actions'];

  constructor(
    private apiService: ServicioAPIService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });

    // Carga inicial de datos
    this.loadCustomers();
  }

  // Carga clientes y finaliza el proceso al terminar
  loadCustomers(): void {
    this.apiService.getCustomers().subscribe(data => {
      this.customers$.set(data);
      this.isLoading.set(false);
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      this.apiService.addCustomer(this.customerForm.value)
        .subscribe(newCustomer => {
          // Actualizamos el signal añadiendo el nuevo cliente
          this.customers$.update(currentCustomers => [...currentCustomers, newCustomer]);
          this.snackBar.open('Cliente añadido con éxito', 'Cerrar', { duration: 3000 });
        });
      this.customerForm.reset();
    }
  }

  deleteCustomer(id: number): void {
    this.apiService.deleteCustomer(id).subscribe(() => {
      // Actualizamos el signal filtrando el cliente borrado
      this.customers$.update(customers => customers.filter(c => c.id !== id));
      this.snackBar.open('Cliente eliminado', 'Cerrar', { duration: 3000 });
    });
  }
}
