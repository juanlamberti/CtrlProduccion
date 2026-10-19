import { Routes } from '@angular/router';

import { ASC } from 'app/config';
import { userRouteAccessService } from 'app/core/auth';

import TipoArticuloResolve from './route/tipo-articulo-routing-resolve.service';

const tipoArticuloRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/tipo-articulo').then(m => m.TipoArticulo),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [userRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/tipo-articulo-detail').then(m => m.TipoArticuloDetail),
    resolve: {
      tipoArticulo: TipoArticuloResolve,
    },
    canActivate: [userRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/tipo-articulo-update').then(m => m.TipoArticuloUpdate),
    resolve: {
      tipoArticulo: TipoArticuloResolve,
    },
    canActivate: [userRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/tipo-articulo-update').then(m => m.TipoArticuloUpdate),
    resolve: {
      tipoArticulo: TipoArticuloResolve,
    },
    canActivate: [userRouteAccessService],
  },
];

export default tipoArticuloRoute;
