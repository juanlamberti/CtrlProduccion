import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'user-management',
    title: 'userManagement.home.title',
    loadChildren: () => import('./admin/user-management/user-management.routes'),
  },
  {
    path: 'authority',
    title: 'ctrlProdNewApp.adminAuthority.home.title',
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'articulo',
    title: 'ctrlProdNewApp.articulo.home.title',
    loadChildren: () => import('./articulo/articulo.routes'),
  },
  {
    path: 'ingrediente',
    title: 'ctrlProdNewApp.ingrediente.home.title',
    loadChildren: () => import('./ingrediente/ingrediente.routes'),
  },
  {
    path: 'tipo-articulo',
    title: 'ctrlProdNewApp.tipoArticulo.home.title',
    loadChildren: () => import('./tipo-articulo/tipo-articulo.routes'),
  },
  {
    path: 'unidad',
    title: 'ctrlProdNewApp.unidad.home.title',
    loadChildren: () => import('./unidad/unidad.routes'),
  },
  {
    path: 'parametro',
    title: 'ctrlProdNewApp.parametro.home.title',
    loadChildren: () => import('./parametro/parametro.routes'),
  },
  {
    path: 'tipo-parametro',
    title: 'ctrlProdNewApp.tipoParametro.home.title',
    loadChildren: () => import('./tipo-parametro/tipo-parametro.routes'),
  },
  {
    path: 'archivo',
    title: 'ctrlProdNewApp.archivo.home.title',
    loadChildren: () => import('./archivo/archivo.routes'),
  },
  // jhipster-needle-add-entity-route - JHipster will add entity modules routes here
];

export default routes;
