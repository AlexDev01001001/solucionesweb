import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/*@Injectable({ providedIn: 'root' })
export class CitaStateService {
  private citaSubject = new BehaviorSubject<any>(null);
  private citaParaEnvio = new BehaviorSubject<any>(null);
  

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

  getCitaParaEnvioObservable() {
    return this.citaParaEnvio.asObservable();
  }

  getCitaParaEnvioSnapshot() {
    return this.citaParaEnvio.getValue();
  }
}*/

@Injectable({ providedIn: 'root' })
export class CitaStateService {
  private citaSubject = new BehaviorSubject<any>(null);
  private citaParaEnvioSubject = new BehaviorSubject<any>(null); // ✅ nombre claro y correcto

  setCita(cita: any): void {
    this.citaSubject.next(cita);
  }

  getCitaObservable() {
    return this.citaSubject.asObservable();
  }

  setCitaParaEnvio(cita: any) {
    this.citaParaEnvioSubject.next(cita); // ✅ usa .next()
  }

  getCitaParaEnvioObservable() {
    return this.citaParaEnvioSubject.asObservable(); // ✅ observable para suscribirse si lo deseas
  }

  getCitaParaEnvioSnapshot() {
    return this.citaParaEnvioSubject.getValue(); // ✅ correcto uso de .getValue()
  }
}
