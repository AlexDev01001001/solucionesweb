import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CitaStateService } from '../com-services/cita-state.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioStateService } from '../services/paciente-usuario.service';
import { CitaService } from '../services/cita-service.service';

declare var Culqi: any;

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
  citaParaEnvio: any;

  constructor(private citaStateService:CitaStateService,private http:HttpClient,private router:Router, private usuarioState : UsuarioStateService){}

  ngOnInit(): void {
      this.citaStateService.getCitaObservable().subscribe(cita => {
        this.cita=cita;
       this.citaParaEnvio = this.citaStateService.getCitaParaEnvioSnapshot();
    console.log('Precio obtenido:', this.citaParaEnvio?.precioConsulta);  // <- De


      })
  }

    pagar() {
        if (this.nombre && this.numeroTarjeta && this.vencimiento && this.cvv) {
          const cita = this.citaStateService.getCitaParaEnvioSnapshot();

          console.log('Cita para pago:', cita); 

          if (!cita || cita.precioConsulta === undefined) {
            alert('No se pudo obtener el precio de la cita.');
            return;
          }

          this.citaParaEnvio = cita;
          this.mostrandoConfirmacion = true;
        } else {
          alert('Por favor completa todos los campos.');
        }
    }

  /*confirmarPago() {
  const citaCompleta = this.citaStateService.getCitaParaEnvioSnapshot();

  if (!citaCompleta) {
    alert('No hay datos de cita para registrar.');
    return;
  }

  console.log('Registrando cita con DTO:', citaCompleta);

  this.http.post('http://localhost:8080/api/pacientes/citas', citaCompleta).subscribe({
    next: () => {
      this.pagoExitoso = true;
      this.mostrandoConfirmacion = false;
      alert('Cita registrada correctamente.');
      this.router.navigate(['/list']);
      this.citaStateService.setCitaParaEnvio(null); // limpia los datos
    },
    error: (err) => {
      console.error('Error al registrar cita:', err);
      alert('Error al registrar la cita.');
    }
  });
}*/
  confirmarPago() {
  const citaCompleta = this.citaStateService.getCitaParaEnvioSnapshot();

  if (!citaCompleta) {
    alert('No hay datos de cita para registrar.');
    return;
  }

  const monto = Math.round(citaCompleta.precioConsulta * 100); // Culqi usa centavos

  Culqi.publicKey = 'pk_test_tZSfjjRyHRzcTn6R'; // Clave sandbox
  Culqi.settings({
    title: 'Soluciones Web',
    currency: 'PEN',
    description: 'Pago de cita',
    amount: monto,
  });

  Culqi.open();

  // ✅ Corrección: evitar error TS usando 'as any'
  (window as any).culqi = () => {
    if (Culqi.token) {
      const token = Culqi.token.id;
      console.log('Token generado:', token);

      // Registrar la cita en backend
      this.http.post('http://localhost:8080/api/pacientes/citas', citaCompleta).subscribe({
        next: () => {
          this.pagoExitoso = true;
          this.mostrandoConfirmacion = false;
          alert('Cita registrada correctamente.');
          this.router.navigate(['/list']);
          this.citaStateService.setCitaParaEnvio(null);
        },
        error: (err) => {
          console.error('Error al registrar cita:', err);
          alert('Error al registrar la cita.');
        }
      });

    } else {
      console.error('Error en el pago:', Culqi.error);
      alert('Pago no realizado.');
    }
  };
}

mandar() {
  const citaCompleta = this.citaStateService.getCitaParaEnvioSnapshot();

  if (!citaCompleta) {
    alert('No hay datos de cita para registrar.');
    return;
  }

  this.http.post('http://localhost:8080/api/pacientes/citas', citaCompleta).subscribe({
    next: () => {
      this.pagoExitoso = true;
      alert('✅ Cita registrada correctamente (modo manual).');
      this.router.navigate(['/list']);
      this.citaStateService.setCitaParaEnvio(null);
    },
    error: (err) => {
      console.error('Error al registrar cita:', err);
      alert('❌ Error al registrar la cita.');
    }
  });
}

  cancelarPago() {
    this.mostrandoConfirmacion = false;
  }
}

