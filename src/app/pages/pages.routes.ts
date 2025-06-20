import type { Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

export const PAGES_ROUTES: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'historico',
        loadComponent: () =>
          import('./transaction-history/transaction-history.component').then(
            (c) => c.TransactionHistoryComponent
          ),
      },
    ],
  },
];
