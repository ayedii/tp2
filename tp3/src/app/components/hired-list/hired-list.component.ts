import { Component, inject, OnDestroy } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { EmbaucheService } from '../../services/embauche.service';
import { Subscription } from 'rxjs';
import { Cv } from '../../models/cv.model';

@Component({
  selector: 'app-hired-list',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './hired-list.component.html',
  styleUrl: './hired-list.component.css'
})
export class HiredListComponent implements OnDestroy {
  private readonly embaucheService = inject(EmbaucheService);
  private sub: Subscription | null = null;

  list: Cv[] = [];

  constructor() {
    this.sub = this.embaucheService.hired$.subscribe({
      next: (values) => {
        this.list = values;
      },
      error: (err) => {
        console.error('Erreur dans le flux des embauchés:', err);
      },
      complete: () => {
        console.log('Flux des embauchés terminé');
      },
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
