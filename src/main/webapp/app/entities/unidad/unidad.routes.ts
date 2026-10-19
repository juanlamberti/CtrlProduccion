import { Routes } from '@angular/router';

import { ASC } from 'app/config';
import { userRouteAccessService } from 'app/core/auth';

import UnidadResolve from './route/unidad-routing-resolve.service';

const unidadRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/unidad').then(m => m.Unidad),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [userRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/unidad-detail').then(m => m.UnidadDetail),
    resolve: {
      unidad: UnidadResolve,
    },
    canActivate: [userRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/unidad-update').then(m => m.UnidadUpdate),
    resolve: {
      unidad: UnidadResolve,
    },
    canActivate: [userRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/unidad-update').then(m => m.UnidadUpdate),
    resolve: {
      unidad: UnidadResolve,
    },
    canActivate: [userRouteAccessService],
  },
];

export default unidadRoute;
