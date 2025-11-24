import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicioAPIService, Customer } from '../servicio-api.service';

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
          this.customerForm.reset();
          // this.snackBar.open('Cliente añadido con éxito', 'Cerrar', { duration: 3000 });
        });
    }
  }

  deleteCustomer(id: number): void {
    this.apiService.deleteCustomer(id).subscribe(() => {
      // Actualizamos el signal filtrando el cliente borrado
      this.customers$.update(customers => customers.filter(c => c.id !== id));
      // this.snackBar.open('Cliente eliminado', 'Cerrar', { duration: 3000 });
    });
  }
}
