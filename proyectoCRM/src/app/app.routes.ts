import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';

// Esto probablemente haya que cambiarlo para que redirija a la app y luego esta ya muestre el componente1
export const routes: Routes = [
    { path: 'form', component: FormComponent }
];