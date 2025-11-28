import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { FlotaComponent } from './flota/flota.component';
import { PreciosComponent } from './precios/precios.component';
import { ContactoComponent } from './contacto/contacto.component';
import { AvisoLegalComponent } from './avisoLegal/aviso-legal.component';
import { PrivacidadComponent } from './privacidad/privacidad.component';
import { CookiesComponent } from './cookies/cookies.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'form', component: FormComponent },
    { path: 'servicios', component: ServiciosComponent},
    { path: 'nosotros', component: NosotrosComponent},
    { path: 'flota', component: FlotaComponent},
    { path: 'precios', component: PreciosComponent},
    { path: 'contacto', component: ContactoComponent},
    { path: 'aviso-legal', component: AvisoLegalComponent},
    { path: 'privacidad', component: PrivacidadComponent},
    { path: 'cookies', component: CookiesComponent}
];