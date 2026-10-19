import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { EMPTY, Observable, catchError, of } from 'rxjs';

import { TipoArticuloService } from '../service/tipo-articulo.service';
import { ITipoArticulo } from '../tipo-articulo.model';

const tipoArticuloResolve = (route: ActivatedRouteSnapshot): Observable<null | ITipoArticulo> => {
  const { id } = route.params;
  if (id) {
    const router = inject(Router);
    const service = inject(TipoArticuloService);
    return service.find(id).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          router.navigate(['404']);
        } else {
          router.navigate(['error']);
        }
        return EMPTY;
      }),
    );
  }

  return of(null);
};

export default tipoArticuloResolve;
