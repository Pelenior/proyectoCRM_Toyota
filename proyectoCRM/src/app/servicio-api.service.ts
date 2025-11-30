import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz de datos para la API
export interface Clientes {
  id: number;
  nombre: string;
  email: string;
  telefono: number;
  password?: string;
  rol?: string;
  id_chofer?: number;
}

export interface Chofer {
  id: number;
  nombre: string;
  email?: string;
  telefono?: number;
  password?: string;
  rol?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicioAPIService {

  // URL de la API que se ejecuta en localhost:8080 y la ruta base es /api/clientes
  // private apiClientesUrl = 'http://localhost:8080/api/clientes';

  // private apiChoferesUrl = 'http://localhost:8080/api/choferes';

  private apiClientesUrl = 'https://proyectocrm-toyota.onrender.com/api/clientes';
  
  private apiChoferesUrl = 'https://proyectocrm-toyota.onrender.com/api/choferes';

  constructor(private http: HttpClient) { }

  // --- CLIENTES ---

  // Get Clientes devuelve un observable con los clientes
  getClientes(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(this.apiClientesUrl);
  }

  // Añadir clientes 
  addClientes(cliente: Omit<Clientes, 'id'>): Observable<Clientes> {
    return this.http.post<Clientes>(this.apiClientesUrl, cliente);
  }

  // Elimina un cliente segun la id
  deleteClientes(id: number): Observable<any> {
    // La url del cliente a eliminar, ej: http://localhost:8080/api/clientes/id
    const url = `${this.apiClientesUrl}/${id}`;
    return this.http.delete(url);
  }

  // --- CHOFERES ---

  getChoferes(): Observable<Chofer[]> {
    return this.http.get<Chofer[]>(this.apiChoferesUrl);
  }

  addChofer(chofer: Omit<Chofer, 'id'>): Observable<Chofer> {
    return this.http.post<Chofer>(this.apiChoferesUrl, chofer);
  }

  deleteChofer(id: number): Observable<any> {
    return this.http.delete(`${this.apiChoferesUrl}/${id}`);
  }

  assignChoferAutomatico(): Observable<Clientes> {
    // We send an empty body {} because the backend uses the Token to identify the user
    return this.http.post<Clientes>(`${this.apiClientesUrl}/contratar`, {});
  }

  cancelarChofer(): Observable<Clientes> {
    return this.http.post<Clientes>(`${this.apiClientesUrl}/despedir`, {});
  }
}