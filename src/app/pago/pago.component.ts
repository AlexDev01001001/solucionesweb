import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css'
})
export class PagoComponent {
  nombre = '';
  numeroTarjeta = '';
  vencimiento = '';
  cvv = '';
  mostrandoConfirmacion = false;
  pagoExitoso = false;

  pagar() {
    if (this.nombre && this.numeroTarjeta && this.vencimiento && this.cvv) {
      this.mostrandoConfirmacion = true;
    } else {
      alert('Por favor completa todos los campos.');
    }
  }

  confirmarPago() {
    this.mostrandoConfirmacion = false;
    this.pagoExitoso = true;
  }

  cancelarPago() {
    this.mostrandoConfirmacion = false;
  }
}