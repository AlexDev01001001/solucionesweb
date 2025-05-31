import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-historias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historias.component.html',
  styleUrl: './historias.component.css'
})
export class HistoriasComponent {
  historias = [
    { paciente: 'Juan Pérez', resumen: 'Tratamiento de caries en molares', fecha: '2025-05-30', ultimaActualizacion: '2025-05-31' },
    { paciente: 'María Gómez', resumen: 'Endodoncia completada en incisivo', fecha: '2025-05-28', ultimaActualizacion: '2025-05-29' },
    { paciente: 'Carlos Díaz', resumen: 'Limpieza dental y revisión', fecha: '2025-05-27', ultimaActualizacion: '2025-05-27' }
  ];
}