import { Injectable } from '@angular/core';
import { PacienteUsuario } from '../Models/PacienteUsuario';

@Injectable({ providedIn: 'root' })
export class UsuarioStateService {
  private usuario: PacienteUsuario | null = null;

  constructor( ) {
    const guardado = localStorage.getItem('usuario');
    if (guardado) {
      this.usuario = JSON.parse(guardado);
    }
  }

  setUsuario(usuario: PacienteUsuario): void {
    this.usuario = usuario;
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  getUsuario(): PacienteUsuario | null {
    if (!this.usuario) {
      const guardado = localStorage.getItem('usuario');
      if (guardado) {
        this.usuario = JSON.parse(guardado);
      }
    }
    return this.usuario;
  }

  limpiarUsuario(): void {
    this.usuario = null;
    localStorage.removeItem('usuario');
  }
}