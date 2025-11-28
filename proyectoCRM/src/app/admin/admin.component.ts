import { Component, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ServicioAPIService, Clientes, Chofer } from '../servicio-api.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  // Signal para gestionar el estado de los clientes
  private clientes$: WritableSignal<Clientes[]> = signal([]);
  public clientes = this.clientes$.asReadonly();

  public listaChoferes = signal<Chofer[]>([]);

  // Signal para controlar el estado de carga inicial
  public isLoading = signal(true);

  clienteForm: FormGroup
  choferForm: FormGroup;

  displayedColumns: string[] = ['name', 'email', 'phone', 'actions'];

  constructor(
    private apiService: ServicioAPIService,
    private fb: FormBuilder,
  ) {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      id_chofer: [null]
    });

    this.choferForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

    // Carga inicial de datos
    this.loadClientes();
    this.loadChoferes();
  }

  // Carga clientes y finaliza el proceso al terminar
  loadClientes(): void {
    this.apiService.getClientes().subscribe(data => {
      this.clientes$.set(data);
      this.isLoading.set(false);
    });
  }

  loadChoferes(): void {
    this.apiService.getChoferes().subscribe(data => {
      this.listaChoferes.set(data);
    });
  }

  onSubmitClient(): void {
    if (this.clienteForm.valid) {
      const clienteData = this.clienteForm.value;

      // Elimina cualquier carácter que no sea un dígito
      const telefonoLimpio = clienteData.telefono.toString().replace(/\D/g, '');

      //Crea el payload para el POST:
      const payload: Omit<Clientes, 'id'> = {
        nombre: clienteData.nombre,
        email: clienteData.email,
        telefono: parseInt(telefonoLimpio, 10),
        // Send the plain password (Backend will encrypt it)
        password: clienteData.password, 
        rol: 'CLIENTE', 
        id_chofer: clienteData.id_chofer ? parseInt(clienteData.id_chofer) : undefined
      };

      this.apiService.addClientes(payload)
        .subscribe(newCliente => {
          this.clientes$.update(currentCustomers => [...currentCustomers, newCliente]);
          this.clienteForm.reset();
          this.clienteForm.patchValue({ id_chofer: null });
        });
    }
  }

  deleteCliente(id: number): void {
    if(confirm('¿Seguro que quieres eliminar este chofer?')) {
      this.apiService.deleteClientes(id).subscribe(() => {
        // Actualizamos el signal filtrando el cliente borrado
        this.clientes$.update(clientes => clientes.filter(c => c.id !== id));
        // this.snackBar.open('Cliente eliminado', 'Cerrar', { duration: 3000 });
      });
    }
  }


  onSubmitChofer(): void {
    if (this.choferForm.valid) {
      const formVal = this.choferForm.value;
      const telefonoLimpio = formVal.telefono.toString().replace(/\D/g, '');

      const payload: Omit<Chofer, 'id'> = {
        nombre: formVal.nombre,
        email: formVal.email,
        telefono: parseInt(telefonoLimpio, 10),
        password: formVal.password,
        // Force the role here (though Backend does it too)
        rol: 'CHOFER' 
      };

      this.apiService.addChofer(payload).subscribe(newChofer => {
        // Update the signal so the table AND the dropdown update instantly
        this.listaChoferes.update(curr => [...curr, newChofer]);
        this.choferForm.reset();
      });
    }
  }

  deleteChofer(id: number): void {
    if(confirm('¿Seguro que quieres eliminar este chofer?')) {
      this.apiService.deleteChofer(id).subscribe(() => {
        this.listaChoferes.update(c => c.filter(x => x.id !== id));
      });
    }
  }

  getNombreChofer(id?: number): string {
    if (!id) return 'Ninguno';
    
    const found = this.listaChoferes().find(c => c.id === id);
    
    return found ? found.nombre : 'Desconocido';
  }
}