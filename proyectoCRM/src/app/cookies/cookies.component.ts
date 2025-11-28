import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cookies.component.html',
  styleUrl: './cookies.component.css'
})
export class CookiesComponent {
  showBanner = true; // controla visibilidad

  aceptarTodas() {
    localStorage.setItem('cookiesAccepted', 'true');
    this.showBanner = false;
  }

  configurar() {
    // aquí abrirías un modal o redirigirías a la página de configuración
    console.log('Abrir configuración de cookies');
  }

  ngOnInit() {
    // al iniciar, comprobamos si ya aceptó
    if (localStorage.getItem('cookiesAccepted') === 'true') {
      this.showBanner = false;
    }
  }


}

