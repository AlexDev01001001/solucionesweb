import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logindoctor',
  standalone: true,
  imports: [],
  templateUrl: './logindoctor.component.html',
  styleUrl: './logindoctor.component.css'
})
export class LogindoctorComponent {
    constructor(private router:Router){}
  
  goToDoctorPage(){
    this.router.navigate(['/doctoresview']);
  }

}
