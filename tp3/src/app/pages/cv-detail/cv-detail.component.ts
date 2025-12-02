import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CvService } from '../../services/cv.service';
import { Cv } from '../../models/cv.model';

@Component({
  selector: 'app-cv-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cv-detail.component.html',
  styleUrl: './cv-detail.component.css'
})
export class CvDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cvService = inject(CvService);

  private readonly idParam = signal<number | null>(null);

  readonly cv = computed<Cv | undefined>(() => {
    const id = this.idParam();
    return id != null ? this.cvService.getById(id) : undefined;
  });

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.idParam.set(Number.isFinite(id) ? id : null);
  }

  deleteCv() {
    const current = this.cv();
    if (!current) return;
    this.cvService.deleteById(current.id);
    this.router.navigate(['/cvs']);
  }
}
