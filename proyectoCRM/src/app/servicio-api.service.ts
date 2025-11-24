import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

// Esto seria nuestro servicio que obtendria datos de nuestra base de datos usando la API REST
// Como aun no tenemos la API simplemente simula los datos, pero deberia funcionar sustituyendo las pruebas con llamadas a la api mediante http

// Interfaz de datos para la API
export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicioAPIService {

  // Esto es una URL de prueba, luego la cambiamos con nuestra API REST
  private apiUrl = 'https://api.example.com/customers';

  // Datos de prueba, esto luego lo quitamos
  private customersPrueba: Customer[] = [
    { id: 1, name: 'Toyota España', email: 'contacto@toyota.es', phone: '900 324 578' },
    { id: 2, name: 'Cliente Particular', email: 'cliente@example.com', phone: '600 123 456' },
  ];

  constructor(private http: HttpClient) { }

  // GET: Obtener todos los clientes
  getCustomers(): Observable<Customer[]> {
    // Luego cambiamos'of(this.customersPrueba)' con 'this.http.get<Customer[]>(this.apiUrl)' para que funcione con la API
    return of([...this.customersPrueba]).pipe(delay(500)); // Simula un retardo de red
  }

  // Añade Clientes
  addCustomer(customer: Omit<Customer, 'id'>): Observable<Customer> {
    // Luego cambiamos con this.http.post<Customer>(this.apiUrl, customer) para que funcione con la API
    const newCustomer = { ...customer, id: Date.now() };
    this.customersPrueba.push(newCustomer);
    return of(newCustomer).pipe(delay(500));
  }

  // Elimina clientes
  deleteCustomer(id: number): Observable<{}> {
    // Luego cambiamos con this.http.delete(`${this.apiUrl}/${id}`) para que funcione con la API
    this.customersPrueba = this.customersPrueba.filter(c => c.id !== id);
    return of({}).pipe(delay(500));
  }
}
