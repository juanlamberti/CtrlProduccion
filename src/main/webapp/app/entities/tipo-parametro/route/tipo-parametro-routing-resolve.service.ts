import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { EMPTY, Observable, catchError, of } from 'rxjs';

import { TipoParametroService } from '../service/tipo-parametro.service';
import { ITipoParametro } from '../tipo-parametro.model';

const tipoParametroResolve = (route: ActivatedRouteSnapshot): Observable<null | ITipoParametro> => {
  const { id } = route.params;
  if (id) {
    const router = inject(Router);
    const service = inject(TipoParametroService);
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

export default tipoParametroResolve;
