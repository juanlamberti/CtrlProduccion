import { Routes } from '@angular/router';

import { ASC } from 'app/config';
import { userRouteAccessService } from 'app/core/auth';

import TipoParametroResolve from './route/tipo-parametro-routing-resolve.service';

const tipoParametroRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/tipo-parametro').then(m => m.TipoParametro),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [userRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/tipo-parametro-detail').then(m => m.TipoParametroDetail),
    resolve: {
      tipoParametro: TipoParametroResolve,
    },
    canActivate: [userRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/tipo-parametro-update').then(m => m.TipoParametroUpdate),
    resolve: {
      tipoParametro: TipoParametroResolve,
    },
    canActivate: [userRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/tipo-parametro-update').then(m => m.TipoParametroUpdate),
    resolve: {
      tipoParametro: TipoParametroResolve,
    },
    canActivate: [userRouteAccessService],
  },
];

export default tipoParametroRoute;
