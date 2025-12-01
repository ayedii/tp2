import { Component, Input, signal } from '@angular/core';
import { AsyncPipe, NgIf, NgStyle } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable, combineLatest, map, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-slideshow',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgStyle],
  templateUrl: './slideshow.component.html',
  styleUrl: './slideshow.component.css'
})
export class SlideshowComponent {
  
  private readonly defaultImages: string[] = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1504199367641-aba8151af406?q=80&w=1200&auto=format&fit=crop'
  ];

  @Input() set images(value: string[] | null) {
    this._images.set(value ?? []);
  }

  @Input() set imagesObservable(value: Observable<string[]> | null) {
    this._images$ = value;
  }
  @Input() set intervalMs(value: number | null) {
    this._intervalMs.set((value ?? 2000) > 0 ? (value ?? 2000) : 2000);
  }
  @Input() set width(value: string | number | null) {
    this._width.set(value ?? 400);
  }
  @Input() set height(value: string | number | null) {
    this._height.set(value ?? 260);
  }

  protected readonly _images = signal<string[]>([]);
  protected readonly _intervalMs = signal<number>(2000);
  protected readonly _width = signal<string | number>(400);
  protected readonly _height = signal<string | number>(260);
  private _images$: Observable<string[]> | null = null;

  constructor() {
    if (this._images().length === 0) {
      this._images.set(this.defaultImages);
    }
  }
  private get images$(): Observable<string[]> {
    return this._images$ ?? toObservable(this._images);
  }
  private readonly ms$ = toObservable(this._intervalMs);

  readonly currentImage$ = combineLatest([this.images$, this.ms$]).pipe(
    switchMap(([imgs, ms]) => {
      if (!imgs || imgs.length === 0) {
        return timer(0, ms).pipe(map(() => null as string | null));
      }
      return timer(0, ms).pipe(map(i => imgs[i % imgs.length]));
    })
  );

  readonly hasImages$ = this.images$.pipe(map(imgs => Array.isArray(imgs) && imgs.length > 0));

  get boxStyle() {
    const w = this._width();
    const h = this._height();
    return {
      width: typeof w === 'number' ? `${w}px` : String(w),
      height: typeof h === 'number' ? `${h}px` : String(h),
    } as const;
  }

}
