import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HorarioService } from '../../services/horario.service';
import { Odontologo } from '../../Models/Odontologo';
import { Horario } from '../../Models/Horario';
import { Tratamiento } from '../../Models/Tratamiento';
import { SeguimientoService } from '../../services/seguimiento.service';
import { CitaStateService } from '../../com-services/cita-state.service';
import { Router } from '@angular/router';
import { UsuarioStateService } from '../../services/paciente-usuario.service';

@Component({
  selector: 'app-bodypage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './bodypage.component.html',
  styleUrl: './bodypage.component.css'
})
export class BodypageComponent implements OnInit {
  odontologos: Odontologo[] = [];
  horarios: Horario[] = [];
  horariosFiltrados: Horario[] = [];
  odontologoSeleccionadoNombreCompleto: string = '';
  horaSeleccionada: string = '';
  

  //TRATAMIENTOS
  seguimientos: any[] = [];
  seguimientoSeleccionado: string = '';
  tratamientos: any[] = [];
  tratamientosFiltrados: any[] = [];
  tratamientoSeleccionado: string = '';

  esPrimeraCita = new FormControl(false);
  fecha = new FormControl('');
  minDate: string;
  recordatorio = new FormControl(false);

  constructor(private horarioService: HorarioService, private seguimientoService:SeguimientoService, private citaStateService: CitaStateService, private router:Router, private usuarioStateService: UsuarioStateService) {
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const dd = String(hoy.getDate()).padStart(2, '0');
    this.minDate = `${yyyy}-${mm}-${dd}`; 
  }

  ngOnInit(): void {
    this.horarioService.getTodosLosHorarios().subscribe((data) => {
      this.horarios = data;

      const unicos = new Map();
      data.forEach((h) => {
        const nombreCompleto = `${h.odontologo.nombres} ${h.odontologo.apellidos}`;
        if (!unicos.has(nombreCompleto)) {
          unicos.set(nombreCompleto, h.odontologo);
        }
      });

      this.odontologos = Array.from(unicos.values());
    });

    this.seguimientoService.getTratamientosConSeguimientos().subscribe(data => {
      this.tratamientos=data;

      this.seguimientos = Array.from(
        new Map(data.map(t => [t.descripcion, { id: t.id, descripcion: t.descripcion }])).values()
      );
    })

  }

  onSeguimientoChange(): void {
    this.tratamientosFiltrados = this.tratamientos.filter(
      t => t.descripcion === this.seguimientoSeleccionado
    );
    
  }

  /*onOdontologoChange(): void {
    this.horariosFiltrados = this.horarios.filter(
      (h) =>
        `${h.odontologo.nombres} ${h.odontologo.apellidos}` ===
        this.odontologoSeleccionadoNombreCompleto
    );
    this.horaSeleccionada = ''; 
  }*/
  odontologoSeleccionadoObj?:Odontologo;
  
    onOdontologoChange(): void {
      this.odontologoSeleccionadoObj = this.odontologos.find(
        o => `${o.nombres} ${o.apellidos}` === this.odontologoSeleccionadoNombreCompleto
      );

      this.horariosFiltrados = this.horarios.filter(
        h => `${h.odontologo.nombres} ${h.odontologo.apellidos}` === this.odontologoSeleccionadoNombreCompleto
      );
      this.horaSeleccionada = '';
    }

  programarCita(): void {
    const tratamientoSeleccionadoObj = this.tratamientosFiltrados.find(
      t => t.tratamientoDescripcion === this.tratamientoSeleccionado
    );

    const seguimientoSeleccionadoObj = this.seguimientos.find(
      s => s.descripcion === this.seguimientoSeleccionado
    );

    const cita = {
      odontologo: this.odontologoSeleccionadoNombreCompleto,
      fecha: this.fecha.value,
      hora: this.horaSeleccionada,
      seguimiento: this.seguimientoSeleccionado,
      tratamiento: this.tratamientoSeleccionado,
      precio: tratamientoSeleccionadoObj?.precio || null,
      recordatorio: this.recordatorio.value
    };

    this.citaStateService.setCita(cita);
    console.log('Cita enviada:', cita);
  }

  obtenerIdPaciente(): number {
    const usuario = this.usuarioStateService.getUsuario();
    return usuario?.idPaciente || 0;
  }

  enviarDatos():void{
    const tratamientoSeleccionadoObj = this.tratamientosFiltrados.find(
      t => t.tratamientoDescripcion === this.tratamientoSeleccionado
    );

    const seguimientoSeleccionadoObj = this.tratamientos.find(
      t => t.descripcion === this.seguimientoSeleccionado
    );

    const citaParaBD = {
    idOdontologo: this.odontologoSeleccionadoObj?.idOdontologo || null,
    idTratamiento: tratamientoSeleccionadoObj?.id || null,
    idSeguimiento: tratamientoSeleccionadoObj?.idSeguimiento || seguimientoSeleccionadoObj?.id || null,
    fechaCita: this.fecha.value,
    hora: this.horaSeleccionada,
    estado: 1,
    idConsultorio: 1,
    idAdmin: 1,
    idPaciente: this.obtenerIdPaciente(),
    precioConsulta: Number((tratamientoSeleccionadoObj?.precio || 0).toFixed(2)),
    recordatorio: this.recordatorio.value
  };

  this.citaStateService.setCitaParaEnvio(citaParaBD);
  console.log('Datos preparados para envio a BD: ',citaParaBD)

  }

    
}
