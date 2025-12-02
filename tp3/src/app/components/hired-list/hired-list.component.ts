import { Component, inject, signal, OnDestroy } from '@angular/core';
import { EmbaucheService } from '../../services/embauche.service';
import { Cv } from '../../models/cv.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-hired-list',
  standalone: true,
  templateUrl: './hired-list.component.html',
  styleUrl: './hired-list.component.css',
})
export class HiredListComponent {
  private readonly embaucheService = inject(EmbaucheService);
  list = toSignal(this.embaucheService.hired$, { initialValue: [] as Cv[] });

  constructor() {}
}
