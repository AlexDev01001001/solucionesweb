import { Component, OnInit } from '@angular/core';
import { CitasnavbarComponent } from '../citas/citasnavbar/citasnavbar.component';
import { Router } from '@angular/router';
import { CitaDetalleDTO } from '../Models/CitaDetalleDTO';
import { CitaService } from '../services/cita-service.service';
import { UsuarioStateService } from '../services/paciente-usuario.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-citas-list',
  standalone: true,
  imports: [CitasnavbarComponent,CommonModule],
  templateUrl: './citas-list.component.html',
  styleUrl: './citas-list.component.css'
})
export class CitasListComponent implements OnInit{

  citas: CitaDetalleDTO[] = [];
  mostrarModalCancelar = false;
  idCitaAEliminar: number | null = null;

  constructor(private router:Router, private citaService:CitaService,private usuarioState: UsuarioStateService, private http:HttpClient){}
  
  ngOnInit(): void {
      const usuario = this.usuarioState.getUsuario();
      const id = usuario?.idPaciente;

      if (id) {
      this.http.get<CitaDetalleDTO[]>(`http://localhost:8080/api/pacientes/citas/${id}`)
        .subscribe({
          next: (data) => this.citas = data,
          error: (err) => console.error('Error al obtener citas:', err)
        });
    }
  }

    getEstadoTexto(estado: number): string {
      switch (estado) {
        case 1: return 'Pendiente';
        case 2: return 'Realizada';
        case 3: return 'Cancelada';
        default: return 'Desconocido';
      }
    }

    getClaseEstado(estado: number): string {
      switch (estado) {
        case 1: return 'badge bg-success';
        case 2: return 'badge bg-warning text-dark';
        case 3: return 'badge bg-danger';
        default: return 'badge bg-secondary';
      }
    }

  goToCita(){
    this.router.navigate(['/citas']);
  }

  abrirModalCancelacion(id: number): void {
    this.idCitaAEliminar = id;
    this.mostrarModalCancelar = true;
  }

      cerrarModalCancelacion(): void {
      this.mostrarModalCancelar = false;
      this.idCitaAEliminar = null;
    }

    cancelarCita(): void {
      if (this.idCitaAEliminar !== null) {
        const url = `http://localhost:8080/api/pacientes/citas/${this.idCitaAEliminar}/cancelar`;

        this.http.put(url, {}).subscribe({
          next: () => {
            
            this.citas = this.citas.map(c =>
              c.idCita === this.idCitaAEliminar ? { ...c, estado: 3 } : c
            );
            this.cerrarModalCancelacion();
          },
          error: err => {
            console.error('Error al cancelar cita:', err);
            alert('Ocurrió un error al cancelar la cita.');
          }
        });
      }
    }
}
