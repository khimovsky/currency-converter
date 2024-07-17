import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'converter',
    loadComponent: () => import('./features/currency-converter/components/currency-converter/currency-converter.component').then((c) => c.CurrencyConverterComponent)
  },
];
