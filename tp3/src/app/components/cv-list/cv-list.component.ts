import { Component, inject, computed, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CvService } from '../../services/cv.service';
import { EmbaucheService } from '../../services/embauche.service';
import { Cv } from '../../models/cv.model';

@Component({
  selector: 'app-cv-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cv-list.component.html',
  styleUrl: './cv-list.component.css'
})
export class CvListComponent {
  private readonly cvService = inject(CvService);
  private readonly embaucheService = inject(EmbaucheService);

  // Computed list (example: sorted by name)
  readonly cvs = computed<Cv[]>(() => {
    const list = this.cvService.cvs();
    return [...list].sort((a: Cv, b: Cv) => a.name.localeCompare(b.name));
  });

  // Example effect reacting to the computed signal
  private readonly logCount = effect(() => {
    void this.cvs().length;
  });

  embaucher(id: number) {
    const cv = this.cvs().find((c: Cv) => c.id === id);
    if (cv) {
      this.embaucheService.embaucher(cv);
    }
  }
}
