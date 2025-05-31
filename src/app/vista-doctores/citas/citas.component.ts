import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
})
export class CitasComponent {
  citas = [
    { hora: '09:00 AM', paciente: 'Juan Pérez', procedimiento: 'Limpieza dental' },
    { hora: '10:30 AM', paciente: 'María Gómez', procedimiento: 'Revisión general' },
    { hora: '01:00 PM', paciente: 'Carlos Díaz', procedimiento: 'Extracción molar' }
  ];
}