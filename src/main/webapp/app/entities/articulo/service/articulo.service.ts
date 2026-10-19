import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Service, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { serverApiUrl } from 'app/config';
import { createRequestOption } from 'app/core/request';
import { IArticulo, NewArticulo } from '../articulo.model';

export type PartialUpdateArticulo = Partial<IArticulo> & Pick<IArticulo, 'id'>;

@Service()
export class ArticulosService {
  searchTerm = '';
  readonly articulosParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly articulosResource = httpResource<IArticulo[]>(() => {
    const params = this.articulosParams();
    if (!params) {
      return undefined;
    }
    return { url: `${this.resourceUrl}/search`, params };
  });
  /**
   * This signal holds the list of articulo that have been fetched. It is updated when the articulosResource emits a new value.
   * In case of error while fetching the articulos, the signal is set to an empty array.
   */
  readonly articulos = computed(() => (this.articulosResource.hasValue() ? this.articulosResource.value() : []));
  protected readonly resourceUrl = `${serverApiUrl}api/articulos`;
}

@Service()
export class ArticuloService extends ArticulosService {
  protected readonly http = inject(HttpClient);

  search(req: Record<string, string | number | boolean | readonly (string | number | boolean)[]>): void {
    this.articulosParams.set({ ...req, ...(this.searchTerm.trim() ? { 'search.contains': this.searchTerm.trim() } : {}) });
  }

  create(articulo: NewArticulo): Observable<IArticulo> {
    return this.http.post<IArticulo>(this.resourceUrl, articulo);
  }

  update(articulo: IArticulo): Observable<IArticulo> {
    return this.http.put<IArticulo>(`${this.resourceUrl}/${encodeURIComponent(this.getArticuloIdentifier(articulo))}`, articulo);
  }

  partialUpdate(articulo: PartialUpdateArticulo): Observable<IArticulo> {
    return this.http.patch<IArticulo>(`${this.resourceUrl}/${encodeURIComponent(this.getArticuloIdentifier(articulo))}`, articulo);
  }

  find(id: number): Observable<IArticulo> {
    return this.http.get<IArticulo>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IArticulo[]>> {
    const options = createRequestOption(req);
    return this.http.get<IArticulo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getArticuloIdentifier(articulo: Pick<IArticulo, 'id'>): number {
    return articulo.id;
  }

  compareArticulo(o1: Pick<IArticulo, 'id'> | null, o2: Pick<IArticulo, 'id'> | null): boolean {
    return o1 && o2 ? this.getArticuloIdentifier(o1) === this.getArticuloIdentifier(o2) : o1 === o2;
  }

  addArticuloToCollectionIfMissing<Type extends Pick<IArticulo, 'id'>>(
    articuloCollection: Type[],
    ...articulosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const articulos: Type[] = articulosToCheck.filter(articuloItem => articuloItem !== null && articuloItem !== undefined);
    if (articulos.length > 0) {
      const articuloCollectionIdentifiers = articuloCollection.map(articuloItem => this.getArticuloIdentifier(articuloItem));
      const articulosToAdd = articulos.filter(articuloItem => {
        const articuloIdentifier = this.getArticuloIdentifier(articuloItem);
        if (articuloCollectionIdentifiers.includes(articuloIdentifier)) {
          return false;
        }
        articuloCollectionIdentifiers.push(articuloIdentifier);
        return true;
      });
      return [...articulosToAdd, ...articuloCollection];
    }
    return articuloCollection;
  }
}
