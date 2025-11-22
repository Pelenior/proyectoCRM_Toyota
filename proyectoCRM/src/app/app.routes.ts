import { Routes } from '@angular/router';
import { Componente1Component } from './componente1/componente1.component';

// Esto probablemente haya que cambiarlo para que redirija a la app y luego esta ya muestre el componente1
export const routes: Routes = [
    { path: '', component: Componente1Component },

];