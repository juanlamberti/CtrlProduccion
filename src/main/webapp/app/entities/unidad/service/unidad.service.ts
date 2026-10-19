import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Service, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { serverApiUrl } from 'app/config';
import { createRequestOption } from 'app/core/request';
import { IUnidad, NewUnidad } from '../unidad.model';

export type PartialUpdateUnidad = Partial<IUnidad> & Pick<IUnidad, 'id'>;

@Service()
export class UnidadsService {
  searchTerm = '';
  readonly unidadsParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly unidadsResource = httpResource<IUnidad[]>(() => {
    const params = this.unidadsParams();
    if (!params) {
      return undefined;
    }
    return { url: `${this.resourceUrl}/search`, params };
  });
  /**
   * This signal holds the list of unidad that have been fetched. It is updated when the unidadsResource emits a new value.
   * In case of error while fetching the unidads, the signal is set to an empty array.
   */
  readonly unidads = computed(() => (this.unidadsResource.hasValue() ? this.unidadsResource.value() : []));
  protected readonly resourceUrl = `${serverApiUrl}api/unidads`;
}

@Service()
export class UnidadService extends UnidadsService {
  protected readonly http = inject(HttpClient);

  search(req: Record<string, string | number | boolean | readonly (string | number | boolean)[]>): void {
    this.unidadsParams.set({ ...req, ...(this.searchTerm.trim() ? { 'search.contains': this.searchTerm.trim() } : {}) });
  }

  create(unidad: NewUnidad): Observable<IUnidad> {
    return this.http.post<IUnidad>(this.resourceUrl, unidad);
  }

  update(unidad: IUnidad): Observable<IUnidad> {
    return this.http.put<IUnidad>(`${this.resourceUrl}/${encodeURIComponent(this.getUnidadIdentifier(unidad))}`, unidad);
  }

  partialUpdate(unidad: PartialUpdateUnidad): Observable<IUnidad> {
    return this.http.patch<IUnidad>(`${this.resourceUrl}/${encodeURIComponent(this.getUnidadIdentifier(unidad))}`, unidad);
  }

  find(id: number): Observable<IUnidad> {
    return this.http.get<IUnidad>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IUnidad[]>> {
    const options = createRequestOption(req);
    return this.http.get<IUnidad[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getUnidadIdentifier(unidad: Pick<IUnidad, 'id'>): number {
    return unidad.id;
  }

  compareUnidad(o1: Pick<IUnidad, 'id'> | null, o2: Pick<IUnidad, 'id'> | null): boolean {
    return o1 && o2 ? this.getUnidadIdentifier(o1) === this.getUnidadIdentifier(o2) : o1 === o2;
  }

  addUnidadToCollectionIfMissing<Type extends Pick<IUnidad, 'id'>>(
    unidadCollection: Type[],
    ...unidadsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const unidads: Type[] = unidadsToCheck.filter(unidadItem => unidadItem !== null && unidadItem !== undefined);
    if (unidads.length > 0) {
      const unidadCollectionIdentifiers = unidadCollection.map(unidadItem => this.getUnidadIdentifier(unidadItem));
      const unidadsToAdd = unidads.filter(unidadItem => {
        const unidadIdentifier = this.getUnidadIdentifier(unidadItem);
        if (unidadCollectionIdentifiers.includes(unidadIdentifier)) {
          return false;
        }
        unidadCollectionIdentifiers.push(unidadIdentifier);
        return true;
      });
      return [...unidadsToAdd, ...unidadCollection];
    }
    return unidadCollection;
  }
}
