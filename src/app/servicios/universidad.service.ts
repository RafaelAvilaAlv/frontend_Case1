import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Universidad } from '../modelos/universidad.model';

import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UniversidadService {
  private apiUrl = 'http://localhost:8080/universidad';

  // private apiUrl = `${environment.universidadApi}`; // ✅ IP o localhost dinámico según entorno


  constructor(private http: HttpClient) {}

  listarUniversidades(): Observable<Universidad[]> {
    return this.http.get<Universidad[]>(`${this.apiUrl}/listar`);
  }

  cargarCSV(archivo: File): Observable<string> {
  const formData = new FormData();
  formData.append('archivo', archivo);
  return this.http.post(`${this.apiUrl}/cargar`, formData, { responseType: 'text' });
}

//agrgeado nuevo

  predecir(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/prediccion`, datos);
  }

//nuevo 
  obtenerDesdeCSV(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/universidad/csv-datos`);
}


enviarPregunta(pregunta: string): Observable<any> {
  return this.http.post('http://localhost:8080/api/universidad/preguntas', { pregunta });
}


}
