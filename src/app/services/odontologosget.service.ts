import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Odontologo} from '../Models/Odontologo';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OdontologosgetService {
private baseUrl = 'http://localhost:8080/api/odontologos'; // <-- corregido

  constructor(private http: HttpClient) {}

  getOdontologos(): Observable<Odontologo[]> {
    return this.http.get<Odontologo[]>(this.baseUrl);
  }
}
