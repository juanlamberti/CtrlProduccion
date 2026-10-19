import { Routes } from '@angular/router';

import { ASC } from 'app/config';
import { userRouteAccessService } from 'app/core/auth';

import ArchivoResolve from './route/archivo-routing-resolve.service';

const archivoRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/archivo').then(m => m.Archivo),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [userRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/archivo-detail').then(m => m.ArchivoDetail),
    resolve: {
      archivo: ArchivoResolve,
    },
    canActivate: [userRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/archivo-update').then(m => m.ArchivoUpdate),
    resolve: {
      archivo: ArchivoResolve,
    },
    canActivate: [userRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/archivo-update').then(m => m.ArchivoUpdate),
    resolve: {
      archivo: ArchivoResolve,
    },
    canActivate: [userRouteAccessService],
  },
];

export default archivoRoute;
