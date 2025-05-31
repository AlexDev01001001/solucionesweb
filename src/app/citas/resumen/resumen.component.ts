import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [],
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.css'
})
export class ResumenComponent {

    constructor(private router:Router){}
  
    goToPay(){
    this.router.navigate(['/pay']);
  }
}
