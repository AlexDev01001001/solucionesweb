import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Horario } from '../Models/Horario';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HorarioService {
  private baseUrl = 'http://localhost:8080/api/horarios';

  constructor(private http: HttpClient) {}

  getTodosLosHorarios(): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.baseUrl}/detalle`);
  }
}