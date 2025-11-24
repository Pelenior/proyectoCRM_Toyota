import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { AppComponent } from './app.component';

// Esto probablemente haya que cambiarlo para que redirija a la app y luego esta ya muestre el componente1
export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'form', component: FormComponent }
];