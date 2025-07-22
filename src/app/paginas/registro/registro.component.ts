import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicios/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements AfterViewInit {
  formularioRegistro: FormGroup;
  mensajeError: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.formularioRegistro = this.fb.group({
      nombreUsuario: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
      ]],
      confirmarClave: ['', Validators.required]
    }, { validators: this.validarClavesIguales });
  }

  ngAfterViewInit(): void {
    // Inicialización de DOM si se requiere
  }

  // Validación cruzada: verificar que las claves coincidan
  validarClavesIguales(control: AbstractControl): ValidationErrors | null {
    const clave = control.get('clave')?.value;
    const confirmar = control.get('confirmarClave')?.value;
    return clave === confirmar ? null : { clavesDiferentes: true };
  }

  registrar() {
    if (this.formularioRegistro.invalid) return;

    const { nombreUsuario, correo, clave, confirmarClave } = this.formularioRegistro.value;

    if (clave !== confirmarClave) {
      Swal.fire({
        icon: 'warning',
        title: 'Las contraseñas no coinciden',
        confirmButtonText: 'Ok'
      });
      return;
    }

    // ✅ Objeto adaptado al backend
    const usuario = {
      nombreUsuario: nombreUsuario,
      correo: correo,
      contrasena: clave // 🔁 campo exacto esperado por el backend
      // No se incluye el campo "rol"
    };

    this.authService.register(usuario).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'El usuario ha sido registrado correctamente.',
          confirmButtonText: 'Ok'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: 'Intenta nuevamente.',
          confirmButtonText: 'Cerrar'
        });
      }
    });
  }
}
