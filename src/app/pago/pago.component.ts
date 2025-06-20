import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CitaStateService } from '../com-services/cita-state.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioStateService } from '../services/paciente-usuario.service';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css'
})
export class PagoComponent implements OnInit{
  nombre = '';
  numeroTarjeta = '';
  vencimiento = '';
  cvv = '';
  mostrandoConfirmacion = false;
  pagoExitoso = false;
  cita: any;

  constructor(private citaStateService:CitaStateService,private http:HttpClient,private router:Router, private usuarioState : UsuarioStateService){}

  ngOnInit(): void {
      this.citaStateService.getCitaObservable().subscribe(cita => {
        this.cita=cita;
      })
  }

  pagar() {
    if (this.nombre && this.numeroTarjeta && this.vencimiento && this.cvv) {
      this.mostrandoConfirmacion = true;
    } else {
      alert('Por favor completa todos los campos.');
    }
  }

confirmarPago() {
    const usuario = this.usuarioState.getUsuario();
    if (!usuario || !this.cita) {
      alert('Datos incompletos.');
      return;
    }

    const citaDTO = {
      fechaCita: this.cita.fecha,
      hora: this.cita.hora,
      idConsultorio: 1,
      idAdmin: 1,
      estado: 1,
      idPaciente: usuario.idPaciente,
      idOdontologo: this.cita.idOdontologo,
      idSeguimiento: this.cita.idSeguimiento,
      idTratamiento: this.cita.idTratamiento,
      precioConsulta: this.cita.precio
    };

    console.log('Registrando cita con DTO:', citaDTO);

    this.http.post('http://localhost:8080/api/pacientes/citas', citaDTO).subscribe({
      next: () => {
        this.pagoExitoso = true;
        this.mostrandoConfirmacion = false;
        alert('Cita registrada correctamente.');
        this.router.navigate(['/list']); // o la ruta que prefieras
      },
      error: (err) => {
        console.error('Error al registrar cita:', err);
        alert('Error al registrar la cita.');
      }
    });
  }

  cancelarPago() {
    this.mostrandoConfirmacion = false;
  }
}

