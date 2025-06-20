import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CitaStateService {
  private citaSubject = new BehaviorSubject<any>(null);
  private citaParaEnvio: any;

  setCita(cita: any): void {
    this.citaSubject.next(cita);
  }

  getCitaObservable() {
    return this.citaSubject.asObservable();
  }

  setCitaParaEnvio(cita: any) {
    this.citaParaEnvio = cita;
  }

  getCitaParaEnvio() {
    return this.citaParaEnvio;
  }
}
