import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Service, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { serverApiUrl } from 'app/config';
import { createRequestOption } from 'app/core/request';
import { ITipoArticulo, NewTipoArticulo } from '../tipo-articulo.model';

export type PartialUpdateTipoArticulo = Partial<ITipoArticulo> & Pick<ITipoArticulo, 'id'>;

@Service()
export class TipoArticulosService {
  searchTerm = '';
  readonly tipoArticulosParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly tipoArticulosResource = httpResource<ITipoArticulo[]>(() => {
    const params = this.tipoArticulosParams();
    if (!params) {
      return undefined;
    }
    return { url: `${this.resourceUrl}/search`, params };
  });
  /**
   * This signal holds the list of tipoArticulo that have been fetched. It is updated when the tipoArticulosResource emits a new value.
   * In case of error while fetching the tipoArticulos, the signal is set to an empty array.
   */
  readonly tipoArticulos = computed(() => (this.tipoArticulosResource.hasValue() ? this.tipoArticulosResource.value() : []));
  protected readonly resourceUrl = `${serverApiUrl}api/tipo-articulos`;
}

@Service()
export class TipoArticuloService extends TipoArticulosService {
  protected readonly http = inject(HttpClient);

  search(req: Record<string, string | number | boolean | readonly (string | number | boolean)[]>): void {
    this.tipoArticulosParams.set({ ...req, ...(this.searchTerm.trim() ? { 'search.contains': this.searchTerm.trim() } : {}) });
  }

  create(tipoArticulo: NewTipoArticulo): Observable<ITipoArticulo> {
    return this.http.post<ITipoArticulo>(this.resourceUrl, tipoArticulo);
  }

  update(tipoArticulo: ITipoArticulo): Observable<ITipoArticulo> {
    return this.http.put<ITipoArticulo>(
      `${this.resourceUrl}/${encodeURIComponent(this.getTipoArticuloIdentifier(tipoArticulo))}`,
      tipoArticulo,
    );
  }

  partialUpdate(tipoArticulo: PartialUpdateTipoArticulo): Observable<ITipoArticulo> {
    return this.http.patch<ITipoArticulo>(
      `${this.resourceUrl}/${encodeURIComponent(this.getTipoArticuloIdentifier(tipoArticulo))}`,
      tipoArticulo,
    );
  }

  find(id: number): Observable<ITipoArticulo> {
    return this.http.get<ITipoArticulo>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<ITipoArticulo[]>> {
    const options = createRequestOption(req);
    return this.http.get<ITipoArticulo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getTipoArticuloIdentifier(tipoArticulo: Pick<ITipoArticulo, 'id'>): number {
    return tipoArticulo.id;
  }

  compareTipoArticulo(o1: Pick<ITipoArticulo, 'id'> | null, o2: Pick<ITipoArticulo, 'id'> | null): boolean {
    return o1 && o2 ? this.getTipoArticuloIdentifier(o1) === this.getTipoArticuloIdentifier(o2) : o1 === o2;
  }

  addTipoArticuloToCollectionIfMissing<Type extends Pick<ITipoArticulo, 'id'>>(
    tipoArticuloCollection: Type[],
    ...tipoArticulosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const tipoArticulos: Type[] = tipoArticulosToCheck.filter(
      tipoArticuloItem => tipoArticuloItem !== null && tipoArticuloItem !== undefined,
    );
    if (tipoArticulos.length > 0) {
      const tipoArticuloCollectionIdentifiers = tipoArticuloCollection.map(tipoArticuloItem =>
        this.getTipoArticuloIdentifier(tipoArticuloItem),
      );
      const tipoArticulosToAdd = tipoArticulos.filter(tipoArticuloItem => {
        const tipoArticuloIdentifier = this.getTipoArticuloIdentifier(tipoArticuloItem);
        if (tipoArticuloCollectionIdentifiers.includes(tipoArticuloIdentifier)) {
          return false;
        }
        tipoArticuloCollectionIdentifiers.push(tipoArticuloIdentifier);
        return true;
      });
      return [...tipoArticulosToAdd, ...tipoArticuloCollection];
    }
    return tipoArticuloCollection;
  }
}
