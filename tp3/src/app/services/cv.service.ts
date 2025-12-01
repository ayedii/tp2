import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Cv } from '../models/cv.model';

@Injectable({ providedIn: 'root' })
export class CvService {
  private readonly fakeCvs: Cv[] = [
    { id: 1, name: 'Ayedi Islem', age: 22, job: 'Frontend Engineer', photo: '/images/islem.jpg' },
    { id: 2, name: 'Attia Yosr', age: 22, job: 'Backend Developer', photo: '/images/yosr.png' },
    { id: 3, name: 'Mars Ataa', age: 22, job: 'Fullstack Developer', photo: '/images/ataa.png' },
    { id: 4, name: 'Soussi Selim', age: 22, job: 'Network Engineer', photo: '/images/selim.png' }
  ];

  private readonly _cvs = signal<Cv[]>(this.fakeCvs);

  // TODO: Adjust to the correct endpoint from Swagger Explorer when known
  private readonly apiUrl = 'https://apilb.tridevs.net/api/personnes';

  constructor(private readonly http: HttpClient, private readonly toastr: ToastrService) {
    this.loadFromApi();
  }

  get cvs() {
    return this._cvs.asReadonly();
  }

  getById(id: number): Cv | undefined {
    return this._cvs().find(c => c.id === id);
  }

  deleteById(id: number): void {
    this._cvs.update(list => list.filter(c => c.id !== id));
  }

  loadFromApi(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        const mapped: Cv[] = (data || []).map((d: any, idx: number) => ({
          id: Number(d.id ?? d._id ?? idx + 1),
          name: String(((d.name ?? d.fullName ?? `${(d.firstname ?? d.firstName ?? '')} ${(d.lastname ?? d.lastName ?? '')}`.trim()) || 'Inconnu')),
          age: Number(d.age ?? d.years ?? 0),
          job: String(d.job ?? d.title ?? d.role ?? 'N/A'),
          photo: String(d.photo ?? d.avatar ?? '/images/anonymous.jpeg'),
        }));
        if (mapped.length) {
          this._cvs.set(mapped);
        }
      },
      error: () => {
        this._cvs.set(this.fakeCvs);
        this.toastr.error("Problème lors du chargement des CVs depuis l'API.", 'Erreur API');
      }
    });
  }
}
