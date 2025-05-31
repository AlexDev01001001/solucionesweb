import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-fill',
  standalone: true,
  imports: [],
  templateUrl: './registro-fill.component.html',
  styleUrl: './registro-fill.component.css'
})
export class RegistroFillComponent {

  constructor(private router:Router){}

  goToLogin(){
  this.router.navigate(['/login']);
  }


}
