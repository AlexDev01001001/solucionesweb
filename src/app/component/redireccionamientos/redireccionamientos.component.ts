import { Component } from '@angular/core';
import { PaginaprincipalComponent } from "../../paginaprincipal/paginaprincipal.component";
import { MainComponent } from "../../paginaprincipal/main/main.component";

@Component({
  selector: 'app-redireccionamientos',
  standalone: true,
  imports: [PaginaprincipalComponent, MainComponent],
  templateUrl: './redireccionamientos.component.html',
  styleUrl: './redireccionamientos.component.css'
})
export class RedireccionamientosComponent {

}
