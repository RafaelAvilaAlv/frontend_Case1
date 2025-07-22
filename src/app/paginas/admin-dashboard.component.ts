import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { RouterModule } from '@angular/router';  // ✅ IMPORTANTE

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
 imports: [CommonModule, FormsModule, RouterModule], // ✅ Agrega esto
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  nombreAdmin: string | null = '';

   constructor(private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.nombreAdmin = payload.sub; // o payload.nombreUsuario si así lo generaste
    }
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('correo');
    this.router.navigate(['/login']);
  }
}
