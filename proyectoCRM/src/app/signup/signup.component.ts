import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServicioAPIService, Clientes } from '../servicio-api.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], // Added RouterLink for "Back to Login"
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  
  signupForm: FormGroup;
  isLoading = signal(false);
  errorMessage = signal('');

  constructor(
    private fb: FormBuilder,
    private apiService: ServicioAPIService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isLoading.set(true);
      const formVal = this.signupForm.value;

      const telefonoLimpio = formVal.telefono.toString().replace(/\D/g, '');

      const payload: Omit<Clientes, 'id'> = {
        nombre: formVal.nombre,
        email: formVal.email,
        telefono: parseInt(telefonoLimpio, 10),
        password: formVal.password,
        rol: 'CLIENTE', 
        id_chofer: undefined
      };

      this.apiService.addClientes(payload).subscribe({
        next: () => {
          alert('Cuenta creada con éxito. Por favor inicia sesión.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error(err);
          this.isLoading.set(false);
          this.errorMessage.set('Error al registrarse. El email podría estar en uso.');
        }
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}