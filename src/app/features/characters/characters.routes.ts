import { Routes } from '@angular/router';

export const CHARACTER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/character-list/character-list.component')
      .then(m => m.CharacterListComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./components/character-detail/character-detail.component')
      .then(m => m.CharacterDetailComponent)
  }
];