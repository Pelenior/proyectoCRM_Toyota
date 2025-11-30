import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  token: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private apiUrl = 'http://localhost:8080/api/auth';
  private apiUrl = 'https://proyectocrm-toyota.onrender.com/api/auth';

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  resetPassword(email: string, telefono: number, newPassword: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/reset-password`, 
      { email, telefono, newPassword }, 
      { responseType: 'text' }
    );
  }

  getRoleFromToken(token: string): string | null {
    try {
      const payload = token.split('.')[1];
      const decodedJson = atob(payload);
      const decoded = JSON.parse(decodedJson);
      return decoded.role || null;
    } catch (e) {
      console.error('Error decoding token', e);
      return null;
    }
  }
}