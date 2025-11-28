import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { NosotrosComponent } from './nosotros/nosotros.component'

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'form', component: FormComponent },
    { path: 'servicios', component: ServiciosComponent},
    { path: 'nosotros', component: NosotrosComponent}
];