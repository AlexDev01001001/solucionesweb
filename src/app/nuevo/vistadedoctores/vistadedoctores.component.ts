import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';


interface CitaDetalleDTO {
  idCita: number;
  odontologoNombre: string;
  seguimientoDescripcion: string;
  tratamientoDescripcion: string;
  fechaCita: string;
  hora: string;
  estado: number;
  pacienteNombre:string;
}

@Component({
  selector: 'app-vistadedoctores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vistadedoctores.component.html',
  styleUrl: './vistadedoctores.component.css'
})
export class VistadedoctoresComponent implements OnInit {
  citas: CitaDetalleDTO[] = [];
  citasFiltradas: CitaDetalleDTO[] = [];
  nombreOdontologo: string = '';
  citasDeHoy: CitaDetalleDTO[] = [];

  historialCitas: CitaDetalleDTO[] = [];
  constructor(private http: HttpClient) {}

    ngOnInit(): void {
      const odontologoStr = localStorage.getItem('odontologoLogueado');
      if (odontologoStr) {
        const odontologoObj = JSON.parse(odontologoStr);
        const id = odontologoObj.id; // Asegúrate que sea `id` y no `idOdontologo`

        console.log('ID del odontólogo:', id); // 👈 revisa en consola

        this.nombreOdontologo = `${odontologoObj.nombres} ${odontologoObj.apellidos}`;

        this.http.get<CitaDetalleDTO[]>(`http://localhost:8080/api/odontologos/${id}/citas`)
          .subscribe(res => {
            this.citas = res;
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0); // 🔒 Evita errores por horas

            this.citasFiltradas = this.citas.filter(c => {
              const fechaCita = new Date(c.fechaCita);
              fechaCita.setHours(0, 0, 0, 0);
              return c.estado === 1 && fechaCita >= hoy;
            });
          });
      }
    }

    verDetalleCita(idCita: number) {
      const cita = this.citas.find(c => c.idCita === idCita);
      if (cita) {
        alert(
          `Detalle de Cita #${cita.idCita}\n` +
          `Paciente: ${cita.pacienteNombre}\n` +
          `Tratamiento: ${cita.tratamientoDescripcion}\n` +
          `Seguimiento: ${cita.seguimientoDescripcion}\n` +
          `Fecha: ${cita.fechaCita}\n` +
          `Hora: ${cita.hora}`
        );
      } else {
        alert("Cita no encontrada.");
      }
    }

    marcarComoAtendida(idCita: number): void {
      const confirmacion = confirm("¿Deseas marcar esta cita como completada?");
      if (!confirmacion) return;

      this.http.put(`http://localhost:8080/api/pacientes/citas/${idCita}/atendida`, {})
        .subscribe({
          next: () => {
            alert("Cita marcada como completada.");
            // Recargar lista para reflejar cambios
            this.citasFiltradas = this.citasFiltradas.filter(c => c.idCita !== idCita);
          },
          error: () => {
            alert("Error al marcar la cita.");
          }
        });
    }

    cargarHistorial(): void {
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      this.historialCitas = this.citas
        .filter(cita => {
          const fechaCita = new Date(cita.fechaCita);
          fechaCita.setHours(0, 0, 0, 0);
          return cita.estado === 2 && fechaCita < hoy;
        })
        .sort((a, b) => {
          const fechaA = new Date(a.fechaCita).getTime();
          const fechaB = new Date(b.fechaCita).getTime();
          return fechaB - fechaA; // 👈 de mayor a menor
        });
    }

    cerrarSesion(): void {
      localStorage.removeItem('odontologoLogueado');
      window.location.href = '/doctor'; 
    }
}
