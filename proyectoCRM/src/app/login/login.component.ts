import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  loginForm: FormGroup;
  
  isLoading = signal(false);
  errorMessage = signal<string>('');

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
  if (this.loginForm.valid) {
    this.isLoading.set(true);
    this.errorMessage.set('');

    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (response) => {
        // 1. IMPORTANT: Save the token! 
        // If you don't do this, the /form page won't have the "Key" to get data.
        localStorage.setItem('token', response.token);

        // 2. Decode the role
        const role = this.authService.getRoleFromToken(response.token);
        
        if (role === 'ADMIN') {
            console.log('Admin authorized. Redirecting...');
            this.router.navigate(['/admin']);
        }
        else if(role === 'CHOFER')
        {
            console.log('Chofer authorized. Redirecting...');
            this.router.navigate(['/chofer']);
        }
        else if(role === 'CLIENTE')
        {
            console.log('Client authorized. Redirecting...');
            this.router.navigate(['/']);
        }
        else {
            // If credentials are correct but user is NOT an admin (e.g., a Client)
            this.errorMessage.set('Acceso denegado. No tienes permisos de Administrador.');
            this.isLoading.set(false);
        }
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
        if (err.status === 403 || err.status === 401) {
           this.errorMessage.set('Credenciales incorrectas.');
        } else {
           this.errorMessage.set('Error de conexión con el servidor.');
        }
      }
    });
  }
}
}