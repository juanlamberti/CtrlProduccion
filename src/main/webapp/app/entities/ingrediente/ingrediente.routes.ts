import { Routes } from '@angular/router';

import { ASC } from 'app/config';
import { userRouteAccessService } from 'app/core/auth';

import IngredienteResolve from './route/ingrediente-routing-resolve.service';

const ingredienteRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/ingrediente').then(m => m.Ingrediente),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [userRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/ingrediente-detail').then(m => m.IngredienteDetail),
    resolve: {
      ingrediente: IngredienteResolve,
    },
    canActivate: [userRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/ingrediente-update').then(m => m.IngredienteUpdate),
    resolve: {
      ingrediente: IngredienteResolve,
    },
    canActivate: [userRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/ingrediente-update').then(m => m.IngredienteUpdate),
    resolve: {
      ingrediente: IngredienteResolve,
    },
    canActivate: [userRouteAccessService],
  },
];

export default ingredienteRoute;
