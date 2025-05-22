import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bodypage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bodypage.component.html',
  styleUrl: './bodypage.component.css'
})
export class BodypageComponent {
  esPrimeraCita = new FormControl(false);
  fecha = new FormControl('2025-02-05');
  hora = new FormControl('07:30');
  recordatorio = new FormControl(false);
}
