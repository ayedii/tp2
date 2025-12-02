import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { Cv } from '../models/cv.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class EmbaucheService {
  private readonly _hired = signal<Cv[]>([]);
  constructor(private readonly toastr: ToastrService) {}

  get hired() {
    return this._hired.asReadonly();
  }

  readonly hired$: Observable<Cv[]> = toObservable(this._hired);

  embaucher(cv: Cv) {
    const exists = this._hired().some(c => c.id === cv.id);
    if (!exists) {
      this._hired.update(list => [...list, cv]);
      this.toastr.success(`${cv.name} a été embauché(e).`, 'Embauche');
    }
    else {
      this.toastr.warning(`${cv.name} est déjà sélectionné(e).`, 'Doublon');
    }
  }
}
