import { Routes } from '@angular/router';

import { ASC } from 'app/config';
import { userRouteAccessService } from 'app/core/auth';

import ArticuloResolve from './route/articulo-routing-resolve.service';

const articuloRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/articulo').then(m => m.Articulo),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [userRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/articulo-detail').then(m => m.ArticuloDetail),
    resolve: {
      articulo: ArticuloResolve,
    },
    canActivate: [userRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/articulo-update').then(m => m.ArticuloUpdate),
    resolve: {
      articulo: ArticuloResolve,
    },
    canActivate: [userRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/articulo-update').then(m => m.ArticuloUpdate),
    resolve: {
      articulo: ArticuloResolve,
    },
    canActivate: [userRouteAccessService],
  },
];

export default articuloRoute;
