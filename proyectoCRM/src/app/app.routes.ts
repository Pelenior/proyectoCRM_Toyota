import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { FlotaComponent } from './flota/flota.component';
import { PreciosComponent } from './precios/precios.component';
import { AvisoLegalComponent } from './avisoLegal/aviso-legal.component';
import { PrivacidadComponent } from './privacidad/privacidad.component';
import { CookiesComponent } from './cookies/cookies.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ChoferComponent } from './chofer/chofer.component';
import { roleGuard } from './guards/role.guard';
import { TarifasComponent } from './tarifas/tarifas.component';
import { SignupComponent } from './signup/signup.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component:LoginComponent},
    { path: 'signup', component:SignupComponent},
    {
        path: 'admin',
        component:AdminComponent,
        canActivate: [roleGuard],
        data: { expectedRole: ['ADMIN']}
    },
    {
        path: 'chofer',
        component:ChoferComponent,
        canActivate: [roleGuard],
        data: { expectedRole: ['ADMIN', 'CHOFER']}
    },
    {
        path: 'cliente',
        component:ClienteComponent,
        canActivate: [roleGuard],
        data: { expectedRole: ['CLIENTE', 'ADMIN']}
    },
    { path: 'forgot-password', component: ForgotPasswordComponent},
    { path: 'servicios', component: ServiciosComponent},
    { path: 'nosotros', component: NosotrosComponent},
    { path: 'flota', component: FlotaComponent},
    { path: 'precios', component: PreciosComponent},
    { path: 'aviso-legal', component: AvisoLegalComponent},
    { path: 'privacidad', component: PrivacidadComponent},
    { path: 'cookies', component: CookiesComponent},
    { path: 'tarifas', component: TarifasComponent}
];