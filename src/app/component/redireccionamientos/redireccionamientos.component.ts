import { Component } from '@angular/core';
import { PaginaprincipalComponent } from "../../paginaprincipal/paginaprincipal.component";
import { MainComponent } from "../../paginaprincipal/main/main.component";
import { CarrouselComponent } from '../../paginaprincipal/carrousel/carrousel.component';
import { FooterComponent } from "../../paginaprincipal/footer/footer.component";

@Component({
  selector: 'app-redireccionamientos',
  standalone: true,
  imports: [PaginaprincipalComponent, MainComponent, CarrouselComponent, FooterComponent],
  templateUrl: './redireccionamientos.component.html',
  styleUrl: './redireccionamientos.component.css'
})
export class RedireccionamientosComponent {

}
