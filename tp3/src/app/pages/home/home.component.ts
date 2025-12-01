import { Component } from '@angular/core';
import { CvListComponent } from '../../components/cv-list/cv-list.component';
import { HiredListComponent } from '../../components/hired-list/hired-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CvListComponent, HiredListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {}
