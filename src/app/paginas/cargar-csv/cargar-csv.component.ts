import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniversidadService } from '../../servicios/universidad.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cargar-csv',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  templateUrl: './cargar-csv.component.html'
})
export class CargarCsvComponent {
  archivo!: File;

  constructor(
    private universidadService: UniversidadService,
    private snackBar: MatSnackBar
  ) {}

  onArchivoSeleccionado(event: any) {
    this.archivo = event.target.files[0];
  }

  subirArchivo() {
    if (!this.archivo) {
      this.snackBar.open('Selecciona un archivo CSV primero.', 'Cerrar', { duration: 3000 });
      return;
    }

    this.universidadService.cargarCSV(this.archivo).subscribe({
      next: (resp) => {
        this.snackBar.open('Archivo cargado exitosamente.', 'Cerrar', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Error al subir el archivo.', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
