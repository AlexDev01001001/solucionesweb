import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OdontologosgetService } from '../../services/odontologosget.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Odontologo } from '../../Models/Odontologo';

@Component({
  selector: 'app-logindoctor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './logindoctor.component.html',
  styleUrl: './logindoctor.component.css'
})
export class LogindoctorComponent {
  correo: string = '';
  password: string = '';
  errorLogin: boolean = false;
  constructor(
    private router: Router,
    private odontologoService: OdontologosgetService,
    private http:HttpClient
  ) {}

  goToDoctorPage() {
  this.http.get<Odontologo[]>('http://localhost:8080/api/odontologos').subscribe(odontologos => {
    const odontologo = odontologos.find(o => o.correo === this.correo && o.password === this.password);
    if (odontologo) {
      // ✅ Guardar bien el objeto
      localStorage.setItem('odontologoLogueado', JSON.stringify(odontologo));
      this.router.navigate(['/vistadedoctor']);
    } else {
      alert('Correo o contraseña incorrectos');
    }
  });
}
}