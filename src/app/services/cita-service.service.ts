import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CitaDetalleDTO } from '../Models/CitaDetalleDTO';
import { Observable } from 'rxjs';
import { CitaRequest } from '../Models/CitaQuest';

@Injectable({ providedIn: 'root' })
export class CitaService {
  private apiUrl = 'http://localhost:8080/api/pacientes';

  constructor(private http: HttpClient) {}

  obtenerCitasPorPaciente(idPaciente: number): Observable<CitaDetalleDTO[]> {
    return this.http.get<CitaDetalleDTO[]>(`${this.apiUrl}/citas/${idPaciente}`);
  }

  registrarCita(cita: CitaRequest): Observable<any> {
  return this.http.post('http://localhost:8080/api/pacientes/citas', cita);

}
}