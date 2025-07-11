import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tratamiento } from '../Models/Tratamiento';

@Injectable({providedIn: 'root'})
export class SeguimientoService {
  private baseUrl = 'http://localhost:8080/api/seguimientos';

  constructor(private http: HttpClient) {}

  getTratamientosConSeguimientos(): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(`${this.baseUrl}/detalle`); //sacamos seguimiento y tratamiento
  }
}
