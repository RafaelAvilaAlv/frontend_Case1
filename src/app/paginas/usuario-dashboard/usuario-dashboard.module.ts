import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts'; // ahora sí funciona

import { UsuarioDashboardComponent } from './usuario-dashboard.component';

@NgModule({
  declarations: [], // ningún standalone aquí
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule,
    UsuarioDashboardComponent // ✅ correcto porque es standalone
  ],
  exports: [UsuarioDashboardComponent] // ✅ exportado para poder usar en otros módulos
})
export class UsuarioDashboardModule {}
