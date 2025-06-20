import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CitaStateService } from '../../com-services/cita-state.service';
import { CommonModule } from '@angular/common';
import { CitaRequest } from '../../Models/CitaQuest';
import { CitaService } from '../../services/cita-service.service';
import { UsuarioStateService } from '../../services/paciente-usuario.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.css'
})
export class ResumenComponent implements OnInit{

  cita:any;

    constructor(private router:Router, private citaStateService:CitaStateService, private citaService:CitaService, private usuarioState:UsuarioStateService){}
  
    goToPay(){
    this.router.navigate(['/pay']);
    }


  ngOnInit(): void {
    this.citaStateService.getCitaObservable().subscribe(cita => {
      this.cita = cita;
      console.log('Cita recibida (observable):', cita);
    });
  }
}
