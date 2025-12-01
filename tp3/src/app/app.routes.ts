import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CvListComponent } from './components/cv-list/cv-list.component';
import { HiredListComponent } from './components/hired-list/hired-list.component';
import { CvDetailComponent } from './pages/cv-detail/cv-detail.component';
import { AuthComponent } from './pages/auth/auth.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cvs', component: CvListComponent },
  { path: 'cvs/:id', component: CvDetailComponent },
  { path: 'embauches', component: HiredListComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'slideshow', component: SlideshowComponent },
  { path: '**', redirectTo: 'home' }
];
