import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Impacto } from './pages/impacto/impacto';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'impacto', component: Impacto },
];
