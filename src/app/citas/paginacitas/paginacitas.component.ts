import { Component } from '@angular/core';
import { CitasnavbarComponent } from "../citasnavbar/citasnavbar.component";
import { BodypageComponent } from "../bodypage/bodypage.component";
import { ResumenComponent } from "../resumen/resumen.component";

@Component({
  selector: 'app-paginacitas',
  standalone: true,
  imports: [CitasnavbarComponent, BodypageComponent, ResumenComponent],
  templateUrl: './paginacitas.component.html',
  styleUrl: './paginacitas.component.css'
})
export class PaginacitasComponent {
}
