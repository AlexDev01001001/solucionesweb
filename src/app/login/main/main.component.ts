import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PacienteService } from '../../services/paciente-service.service';
import { FormsModule } from '@angular/forms';
import { UsuarioStateService } from '../../services/paciente-usuario.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  correo: string = '';
  password: string = '';

  constructor(private router:Router, private pacienteService:PacienteService,private usuarioState: UsuarioStateService){}

    goToRegister(){
    this.router.navigate(['/registro']);
  }

  goToList() {
  this.pacienteService.login(this.correo, this.password).subscribe({
    next: (paciente) => {
      this.usuarioState.setUsuario(paciente); // Guardar al usuario
      alert(`Bienvenido, ${paciente.nombres}`);
      this.router.navigate(['/list']);
    },
    error: () => {
      alert('Correo o contraseña incorrectos');
    }
  });
}

}
