import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Service, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { serverApiUrl } from 'app/config';
import { createRequestOption } from 'app/core/request';
import { ITipoParametro, NewTipoParametro } from '../tipo-parametro.model';

export type PartialUpdateTipoParametro = Partial<ITipoParametro> & Pick<ITipoParametro, 'id'>;

@Service()
export class TipoParametrosService {
  searchTerm = '';
  readonly tipoParametrosParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly tipoParametrosResource = httpResource<ITipoParametro[]>(() => {
    const params = this.tipoParametrosParams();
    if (!params) {
      return undefined;
    }
    return { url: `${this.resourceUrl}/search`, params };
  });
  /**
   * This signal holds the list of tipoParametro that have been fetched. It is updated when the tipoParametrosResource emits a new value.
   * In case of error while fetching the tipoParametros, the signal is set to an empty array.
   */
  readonly tipoParametros = computed(() => (this.tipoParametrosResource.hasValue() ? this.tipoParametrosResource.value() : []));
  protected readonly resourceUrl = `${serverApiUrl}api/tipo-parametros`;
}

@Service()
export class TipoParametroService extends TipoParametrosService {
  protected readonly http = inject(HttpClient);

  search(req: Record<string, string | number | boolean | readonly (string | number | boolean)[]>): void {
    this.tipoParametrosParams.set({ ...req, ...(this.searchTerm.trim() ? { 'search.contains': this.searchTerm.trim() } : {}) });
  }

  create(tipoParametro: NewTipoParametro): Observable<ITipoParametro> {
    return this.http.post<ITipoParametro>(this.resourceUrl, tipoParametro);
  }

  update(tipoParametro: ITipoParametro): Observable<ITipoParametro> {
    return this.http.put<ITipoParametro>(
      `${this.resourceUrl}/${encodeURIComponent(this.getTipoParametroIdentifier(tipoParametro))}`,
      tipoParametro,
    );
  }

  partialUpdate(tipoParametro: PartialUpdateTipoParametro): Observable<ITipoParametro> {
    return this.http.patch<ITipoParametro>(
      `${this.resourceUrl}/${encodeURIComponent(this.getTipoParametroIdentifier(tipoParametro))}`,
      tipoParametro,
    );
  }

  find(id: number): Observable<ITipoParametro> {
    return this.http.get<ITipoParametro>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<ITipoParametro[]>> {
    const options = createRequestOption(req);
    return this.http.get<ITipoParametro[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getTipoParametroIdentifier(tipoParametro: Pick<ITipoParametro, 'id'>): number {
    return tipoParametro.id;
  }

  compareTipoParametro(o1: Pick<ITipoParametro, 'id'> | null, o2: Pick<ITipoParametro, 'id'> | null): boolean {
    return o1 && o2 ? this.getTipoParametroIdentifier(o1) === this.getTipoParametroIdentifier(o2) : o1 === o2;
  }

  addTipoParametroToCollectionIfMissing<Type extends Pick<ITipoParametro, 'id'>>(
    tipoParametroCollection: Type[],
    ...tipoParametrosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const tipoParametros: Type[] = tipoParametrosToCheck.filter(
      tipoParametroItem => tipoParametroItem !== null && tipoParametroItem !== undefined,
    );
    if (tipoParametros.length > 0) {
      const tipoParametroCollectionIdentifiers = tipoParametroCollection.map(tipoParametroItem =>
        this.getTipoParametroIdentifier(tipoParametroItem),
      );
      const tipoParametrosToAdd = tipoParametros.filter(tipoParametroItem => {
        const tipoParametroIdentifier = this.getTipoParametroIdentifier(tipoParametroItem);
        if (tipoParametroCollectionIdentifiers.includes(tipoParametroIdentifier)) {
          return false;
        }
        tipoParametroCollectionIdentifiers.push(tipoParametroIdentifier);
        return true;
      });
      return [...tipoParametrosToAdd, ...tipoParametroCollection];
    }
    return tipoParametroCollection;
  }
}
