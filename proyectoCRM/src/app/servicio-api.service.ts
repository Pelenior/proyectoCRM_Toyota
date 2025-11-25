import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz de datos para la API
export interface Clientes {
  id: number;
  nombre: string;
  email: string;
  telefono: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServicioAPIService {

  // URL de la API que se ejecuta en localhost:8080 y la ruta base es /api/clientes
  private apiUrl = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) { }

  // Get Clientes devuelve un observable con los clientes
  getClientes(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(this.apiUrl);
  }

  // Añadir clientes 
  addClientes(cliente: Omit<Clientes, 'id'>): Observable<Clientes> {
    return this.http.post<Clientes>(this.apiUrl, cliente);
  }

  // Elimina un cliente segun la id
  deleteClientes(id: number): Observable<any> {
    // La url del cliente a eliminar, ej: http://localhost:8080/api/clientes/id
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}