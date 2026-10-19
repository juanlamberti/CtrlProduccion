import { Routes } from '@angular/router';

import { ASC } from 'app/config';
import { userRouteAccessService } from 'app/core/auth';

import ParametroResolve from './route/parametro-routing-resolve.service';

const parametroRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/parametro').then(m => m.Parametro),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [userRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/parametro-detail').then(m => m.ParametroDetail),
    resolve: {
      parametro: ParametroResolve,
    },
    canActivate: [userRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/parametro-update').then(m => m.ParametroUpdate),
    resolve: {
      parametro: ParametroResolve,
    },
    canActivate: [userRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/parametro-update').then(m => m.ParametroUpdate),
    resolve: {
      parametro: ParametroResolve,
    },
    canActivate: [userRouteAccessService],
  },
];

export default parametroRoute;
