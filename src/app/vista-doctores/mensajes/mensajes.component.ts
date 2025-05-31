import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mensajes.component.html',
  styleUrl: './mensajes.component.css'
})
export class MensajesComponent {
  mensajes = [
    { remitente: 'Juan Pérez', texto: '¿Podría cambiar la cita del jueves?', fecha: '2025-05-30 08:15' },
    { remitente: 'María Gómez', texto: 'Gracias por la atención de hoy.', fecha: '2025-05-30 09:40' },
    { remitente: 'Carlos Díaz', texto: 'Necesito una consulta urgente.', fecha: '2025-05-31 07:55' }
  ];
}