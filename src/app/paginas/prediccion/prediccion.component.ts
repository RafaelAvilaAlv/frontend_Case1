import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-prediccion',
  templateUrl: './prediccion.component.html',
  styleUrls: ['./prediccion.component.scss']
})
export class PrediccionComponent {
  formulario: FormGroup;
  resultado: number | null = null;
  cargando = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.formulario = this.fb.group({
      academic_reputation: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      employer_reputation: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      sustainability: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      faculty_student_ratio: [null, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  predecir() {
    if (this.formulario.invalid) return;

    this.cargando = true;
    const datos = this.formulario.value;

    this.http.post<any>('http://localhost:8080/api/universidad/prediccion', datos).subscribe({
      next: res => {
        this.resultado = res.overall_score;
        this.cargando = false;
      },
      error: err => {
        console.error('Error en la predicción', err);
        this.cargando = false;
        alert('Error al obtener predicción. Verifica la conexión o el backend.');
      }
    });
  }


}
