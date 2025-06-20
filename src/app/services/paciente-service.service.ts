import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PacienteUsuario } from '../Models/PacienteUsuario';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PacienteService {
  private baseUrl = 'http://localhost:8080/api/pacientes';

  constructor(private http: HttpClient) {}

  registrarPaciente(paciente: PacienteUsuario): Observable<any> {
    return this.http.post(`${this.baseUrl}/registro`, paciente);
  }

  login(correo: string, contraseña: string): Observable<PacienteUsuario> {
    return this.http.post<PacienteUsuario>(`${this.baseUrl}/login`, { correo, contraseña });
  }

}
