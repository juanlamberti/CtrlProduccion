import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Service, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { serverApiUrl } from 'app/config';
import { createRequestOption } from 'app/core/request';
import { IParametro, NewParametro } from '../parametro.model';

export type PartialUpdateParametro = Partial<IParametro> & Pick<IParametro, 'id'>;

@Service()
export class ParametrosService {
  searchTerm = '';
  readonly parametrosParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly parametrosResource = httpResource<IParametro[]>(() => {
    const params = this.parametrosParams();
    if (!params) {
      return undefined;
    }
    return { url: `${this.resourceUrl}/search`, params };
  });
  /**
   * This signal holds the list of parametro that have been fetched. It is updated when the parametrosResource emits a new value.
   * In case of error while fetching the parametros, the signal is set to an empty array.
   */
  readonly parametros = computed(() => (this.parametrosResource.hasValue() ? this.parametrosResource.value() : []));
  protected readonly resourceUrl = `${serverApiUrl}api/parametros`;
}

@Service()
export class ParametroService extends ParametrosService {
  protected readonly http = inject(HttpClient);

  search(req: Record<string, string | number | boolean | readonly (string | number | boolean)[]>): void {
    this.parametrosParams.set({ ...req, ...(this.searchTerm.trim() ? { 'search.contains': this.searchTerm.trim() } : {}) });
  }

  create(parametro: NewParametro): Observable<IParametro> {
    return this.http.post<IParametro>(this.resourceUrl, parametro);
  }

  update(parametro: IParametro): Observable<IParametro> {
    return this.http.put<IParametro>(`${this.resourceUrl}/${encodeURIComponent(this.getParametroIdentifier(parametro))}`, parametro);
  }

  partialUpdate(parametro: PartialUpdateParametro): Observable<IParametro> {
    return this.http.patch<IParametro>(`${this.resourceUrl}/${encodeURIComponent(this.getParametroIdentifier(parametro))}`, parametro);
  }

  find(id: number): Observable<IParametro> {
    return this.http.get<IParametro>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IParametro[]>> {
    const options = createRequestOption(req);
    return this.http.get<IParametro[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getParametroIdentifier(parametro: Pick<IParametro, 'id'>): number {
    return parametro.id;
  }

  compareParametro(o1: Pick<IParametro, 'id'> | null, o2: Pick<IParametro, 'id'> | null): boolean {
    return o1 && o2 ? this.getParametroIdentifier(o1) === this.getParametroIdentifier(o2) : o1 === o2;
  }

  addParametroToCollectionIfMissing<Type extends Pick<IParametro, 'id'>>(
    parametroCollection: Type[],
    ...parametrosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const parametros: Type[] = parametrosToCheck.filter(parametroItem => parametroItem !== null && parametroItem !== undefined);
    if (parametros.length > 0) {
      const parametroCollectionIdentifiers = parametroCollection.map(parametroItem => this.getParametroIdentifier(parametroItem));
      const parametrosToAdd = parametros.filter(parametroItem => {
        const parametroIdentifier = this.getParametroIdentifier(parametroItem);
        if (parametroCollectionIdentifiers.includes(parametroIdentifier)) {
          return false;
        }
        parametroCollectionIdentifiers.push(parametroIdentifier);
        return true;
      });
      return [...parametrosToAdd, ...parametroCollection];
    }
    return parametroCollection;
  }
}
