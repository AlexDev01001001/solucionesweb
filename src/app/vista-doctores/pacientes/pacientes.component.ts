import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css'
})
export class PacientesComponent {
  pacientes = [
    { nombre: 'Juan Pérez', email: 'juan.perez@example.com', telefono: '555-1234', edad: 30 },
    { nombre: 'María Gómez', email: 'maria.gomez@example.com', telefono: '555-5678', edad: 25 },
    { nombre: 'Carlos Díaz', email: 'carlos.diaz@example.com', telefono: '555-8765', edad: 40 }
  ];
}