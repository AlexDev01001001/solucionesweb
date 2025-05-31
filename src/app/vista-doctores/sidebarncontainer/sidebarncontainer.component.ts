import { Component } from '@angular/core';
import { CitasComponent } from '../citas/citas.component';
import { MensajesComponent } from '../mensajes/mensajes.component';
import { PacientesComponent } from '../pacientes/pacientes.component';
import { HistoriasComponent } from '../historias/historias.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebarncontainer',
  standalone: true,
  imports: [CitasComponent,MensajesComponent,PacientesComponent,HistoriasComponent,CommonModule],
  templateUrl: './sidebarncontainer.component.html',
  styleUrl: './sidebarncontainer.component.css'
})
export class VistaAdminComponent {
  activeSection: 'citas' | 'pacientes' | 'historias' | 'mensajes' = 'citas';

  setActive(section: 'citas' | 'pacientes' | 'historias' | 'mensajes') {
    this.activeSection = section;
  }

  getSectionTitle() {
    switch (this.activeSection) {
      case 'citas': return 'CITAS DEL DÍA';
      case 'pacientes': return 'PACIENTES';
      case 'historias': return 'HISTORIAS CLÍNICAS';
      case 'mensajes': return 'MENSAJES';
      default: return '';
    }
  }
}