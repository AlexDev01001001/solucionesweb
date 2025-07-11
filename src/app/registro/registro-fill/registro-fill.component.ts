import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PacienteService } from '../../services/paciente-service.service';
import { PacienteUsuario } from '../../Models/PacienteUsuario';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-registro-fill',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './registro-fill.component.html',
  styleUrl: './registro-fill.component.css'
})
export class RegistroFillComponent {

  password:string= '';
  confirmPassword: string = '';

  constructor(private router:Router, private pacienteService:PacienteService){}

  goToLogin(){
  this.router.navigate(['/login']);
  }

  registrarse(form: NgForm) {
  if (form.valid && this.password === this.confirmPassword) {
    const hoy = new Date();
    const fechaRegistro = hoy.toISOString().split('T')[0]; // formato yyyy-MM-dd
    
    const fechaNacimientoDate = new Date(form.value.fechaNacimiento);
    const fechaNacimiento = fechaNacimientoDate.toISOString().split('T')[0]; // yyyy-MM-dd

    const hashedPassword = CryptoJS.SHA256(form.value.password).toString();


    const paciente: PacienteUsuario = {
      nombres: form.value.nombre,
      apellidos: form.value.apellido,
      dni: form.value.dni,
      telefono: form.value.telefono,
      correo: form.value.email,
      contraseña: hashedPassword,
      fechaNacimiento: fechaNacimiento,
      fechaRegistro: fechaRegistro
    };

    this.pacienteService.registrarPaciente(paciente).subscribe({
      next: (response) => {
        alert(response.mensaje); 

          setTimeout(() => {
          this.goToLogin();
        }, 3000); // 3000 ms = 3 segundos
      },
      error: (err) => {
        console.error('Error al registrar paciente', err);
        alert('Ocurrió un error al registrar el paciente.');
      }
    });
  } else {
    alert("Por favor corrige los errores antes de continuar.");
  }
}

}
