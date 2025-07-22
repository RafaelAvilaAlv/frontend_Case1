import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'http://localhost:8080/api/user';

  private tokenSubject = new BehaviorSubject<string | null>(null);
  private rolSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const rol = localStorage.getItem('rol');
      if (token) this.tokenSubject.next(token);
      if (rol) this.rolSubject.next(rol);
    }
  }

  register(usuario: any): Observable<any> {
    return this.http.post(`${this.apiURL}/registrar`, usuario);
  }

  login(credenciales: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/login', credenciales).pipe(
      tap((respuesta: any) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', respuesta.token);
          localStorage.setItem('rol', respuesta.rol);
        }
        this.tokenSubject.next(respuesta.token);
        this.rolSubject.next(respuesta.rol);
      })
    );
  }

  guardarToken(token: string): void {
    this.tokenSubject.next(token);
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  guardarRol(rol: string): void {
    this.rolSubject.next(rol);
    if (typeof window !== 'undefined') {
      localStorage.setItem('rol', rol);
    }
  }

  obtenerToken(): string | null {
    return this.tokenSubject.value;
  }

  obtenerRol(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.rol || null;
    } catch (error) {
      console.error('Error al decodificar el token', error);
      return null;
    }
  }

  cerrarSesion(): void {
    this.tokenSubject.next(null);
    this.rolSubject.next(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('rol');
    }
  }

  estaAutenticado(): boolean {
    if (typeof window === 'undefined') return false;

    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const ahora = Math.floor(Date.now() / 1000);
      return payload.exp && payload.exp > ahora;
    } catch (error) {
      return false;
    }
  }
}
