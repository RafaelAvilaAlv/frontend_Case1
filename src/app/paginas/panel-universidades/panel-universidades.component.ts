import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniversidadService } from '../../servicios/universidad.service';
import { Universidad } from '../../modelos/universidad.model';

@Component({
  selector: 'app-panel-universidades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel-universidades.component.html'
})
export class PanelUniversidadesComponent implements OnInit {
  universidades: Universidad[] = [];

  constructor(private universidadService: UniversidadService) {}

  ngOnInit(): void {
    this.universidadService.listarUniversidades().subscribe({
      next: (data) => {
        this.universidades = data;
      },
      error: (error) => {
        console.error('Error al listar universidades', error);
      }
    });
  }
}
