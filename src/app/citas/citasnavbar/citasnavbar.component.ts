import { Component, OnInit } from '@angular/core';
import { PacienteUsuario } from '../../Models/PacienteUsuario';
import { UsuarioStateService } from '../../services/paciente-usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-citasnavbar',
  standalone: true,
  imports: [],
  templateUrl: './citasnavbar.component.html',
  styleUrl: './citasnavbar.component.css'
})
export class CitasnavbarComponent implements OnInit {
  nombreCompleto: string = '';
  constructor(private usuarioState:UsuarioStateService, private router :Router){}

  ngOnInit(): void {
    const usuario = this.usuarioState.getUsuario();
    this.nombreCompleto = usuario ? `${usuario.nombres} ${usuario.apellidos}` : 'Usuario';
  }

  cerrarSesion() {
  this.usuarioState.limpiarUsuario();
  this.router.navigate(['/login']);
}
}
