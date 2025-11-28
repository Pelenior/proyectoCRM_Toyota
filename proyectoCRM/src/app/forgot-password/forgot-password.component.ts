import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  
  form: FormGroup;
  isLoading = signal(false);
  message = signal('');
  isError = signal(false);

  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  constructor() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading.set(true);
      this.message.set('');
      this.isError.set(false);

      const val = this.form.value;

      this.authService.resetPassword(val.email, parseInt(val.telefono), val.newPassword)
        .subscribe({
          next: (res) => {
            this.isLoading.set(false);
            this.isError.set(false);
            this.message.set('¡Contraseña cambiada con éxito! Redirigiendo...');
            setTimeout(() => this.router.navigate(['/login']), 2000);
          },
          error: (err) => {
            this.isLoading.set(false);
            this.isError.set(true);
            if (err.status === 404) this.message.set('Email no encontrado.');
            else if (err.status === 403) this.message.set('El teléfono no coincide con el email.');
            else this.message.set('Error en el servidor.');
          }
        });
    }
  }
}