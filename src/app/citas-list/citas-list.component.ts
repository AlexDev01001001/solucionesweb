import { Component } from '@angular/core';
import { CitasnavbarComponent } from '../citas/citasnavbar/citasnavbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-citas-list',
  standalone: true,
  imports: [CitasnavbarComponent],
  templateUrl: './citas-list.component.html',
  styleUrl: './citas-list.component.css'
})
export class CitasListComponent {
  constructor(private router:Router){}
  goToCita(){
    this.router.navigate(['/citas']);
  }
}
