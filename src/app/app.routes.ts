import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout.component')
      .then(m => m.MainLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/characters/components/character-list/character-list.component')
          .then(m => m.CharacterListComponent)
      },
      {
        path: 'character/:id',
        loadComponent: () => import('./features/characters/components/character-detail/character-detail.component')
          .then(m => m.CharacterDetailComponent)
      }
    ]
  }
];
