import { Routes } from '@angular/router';

import { LoginComponent } from './paginas/login/login.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import { PanelUniversidadesComponent } from './paginas/panel-universidades/panel-universidades.component';
import { PrediccionComponent } from './paginas/prediccion/prediccion.component';
import { CargarCsvComponent } from './paginas/cargar-csv/cargar-csv.component';
import { UsuarioDashboardComponent } from './paginas/usuario-dashboard/usuario-dashboard.component';
import { AdminDashboardComponent } from './paginas/admin-dashboard.component';
import { UsuariosListaComponent } from './admin/usuarios-lista/usuarios-lista.component';

//import { authGuard } from './guardias/auth.guard';

import { AuthGuard } from './guardias/auth.guard'; // ✅ clase con mayúscula


import { adminGuard } from './guardias/admin.guard';

export const routes: Routes = [
  // 🔓 Rutas públicas
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  // 🔐 Rutas protegidas por sesión (usuarios autenticados)
  { path: 'panel', component: PanelUniversidadesComponent, canActivate: [AuthGuard] },
  { path: 'prediccion', component: PrediccionComponent, canActivate: [AuthGuard] },
  { path: 'cargar-csv', component: CargarCsvComponent, canActivate: [AuthGuard] },
  { path: 'usuario/dashboard', component: UsuarioDashboardComponent, canActivate: [AuthGuard] },

  // 🔐 Rutas protegidas por sesión (admin con componentes standalone)
  {
    path: 'admin/dashboard',
    loadComponent: () =>
      import('./paginas/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/csv-universidades',
    loadComponent: () =>
      import('./paginas/gestion-csv-universidades/gestion-csv-universidades.component')
        .then(m => m.GestionCsvUniversidadesComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/usuarios',
    loadComponent: () =>
      import('./admin/usuarios-lista/usuarios-lista.component').then(m => m.UsuariosListaComponent),
    canActivate: [adminGuard] // ✅ Solo ADMIN puede ver esta ruta
  },

  // 🔁 Ruta comodín al final
  { path: '**', redirectTo: 'login' }
];
