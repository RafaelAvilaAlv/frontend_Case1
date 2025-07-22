import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { jwtDecode } from 'jwt-decode'; // ✅ CORREGIDO: import nombrado
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formularioLogin: FormGroup;
  mensajeError: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.formularioLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });
  }

  iniciarSesion() {
  if (this.formularioLogin.invalid) return;

  const credenciales = this.formularioLogin.value;

  this.authService.login(credenciales).subscribe({
    next: (respuesta) => {
      // ✅ Guarda el token
      this.authService.guardarToken(respuesta.token);

      // ✅ Decodifica el token para extraer el rol
      const decoded: any = jwtDecode(respuesta.token);
      const rol = decoded.rol;

      // ✅ Redirección según el rol
      if (rol === 'ADMIN' || rol === 'ROLE_ADMIN') {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/usuario/dashboard']); // 🔴 CORREGIDO
      }
    },
    error: () => {
      this.mensajeError = 'Credenciales incorrectas. Intenta nuevamente.';
      Swal.fire({
        icon: 'error',
        title: 'Error de inicio de sesión',
        text: 'Credenciales inválidas. Intenta nuevamente.',
        confirmButtonText: 'Ok'
      });
    }
  });
}

}
