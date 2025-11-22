import { Component } from '@angular/core';
import { Componente1Component } from './componente1/componente1.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Componente1Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyectoCRM';
}
