import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Service, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { serverApiUrl } from 'app/config';
import { createRequestOption } from 'app/core/request';
import { IIngrediente, NewIngrediente } from '../ingrediente.model';

export type PartialUpdateIngrediente = Partial<IIngrediente> & Pick<IIngrediente, 'id'>;

@Service()
export class IngredientesService {
  searchTerm = '';
  readonly ingredientesParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly ingredientesResource = httpResource<IIngrediente[]>(() => {
    const params = this.ingredientesParams();
    if (!params) {
      return undefined;
    }
    return { url: `${this.resourceUrl}/search`, params };
  });
  /**
   * This signal holds the list of ingrediente that have been fetched. It is updated when the ingredientesResource emits a new value.
   * In case of error while fetching the ingredientes, the signal is set to an empty array.
   */
  readonly ingredientes = computed(() => (this.ingredientesResource.hasValue() ? this.ingredientesResource.value() : []));
  protected readonly resourceUrl = `${serverApiUrl}api/ingredientes`;
}

@Service()
export class IngredienteService extends IngredientesService {
  protected readonly http = inject(HttpClient);

  search(req: Record<string, string | number | boolean | readonly (string | number | boolean)[]>): void {
    this.ingredientesParams.set({ ...req, ...(this.searchTerm.trim() ? { 'search.contains': this.searchTerm.trim() } : {}) });
  }

  create(ingrediente: NewIngrediente): Observable<IIngrediente> {
    return this.http.post<IIngrediente>(this.resourceUrl, ingrediente);
  }

  update(ingrediente: IIngrediente): Observable<IIngrediente> {
    return this.http.put<IIngrediente>(
      `${this.resourceUrl}/${encodeURIComponent(this.getIngredienteIdentifier(ingrediente))}`,
      ingrediente,
    );
  }

  partialUpdate(ingrediente: PartialUpdateIngrediente): Observable<IIngrediente> {
    return this.http.patch<IIngrediente>(
      `${this.resourceUrl}/${encodeURIComponent(this.getIngredienteIdentifier(ingrediente))}`,
      ingrediente,
    );
  }

  find(id: number): Observable<IIngrediente> {
    return this.http.get<IIngrediente>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IIngrediente[]>> {
    const options = createRequestOption(req);
    return this.http.get<IIngrediente[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getIngredienteIdentifier(ingrediente: Pick<IIngrediente, 'id'>): number {
    return ingrediente.id;
  }

  compareIngrediente(o1: Pick<IIngrediente, 'id'> | null, o2: Pick<IIngrediente, 'id'> | null): boolean {
    return o1 && o2 ? this.getIngredienteIdentifier(o1) === this.getIngredienteIdentifier(o2) : o1 === o2;
  }

  addIngredienteToCollectionIfMissing<Type extends Pick<IIngrediente, 'id'>>(
    ingredienteCollection: Type[],
    ...ingredientesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const ingredientes: Type[] = ingredientesToCheck.filter(ingredienteItem => ingredienteItem !== null && ingredienteItem !== undefined);
    if (ingredientes.length > 0) {
      const ingredienteCollectionIdentifiers = ingredienteCollection.map(ingredienteItem => this.getIngredienteIdentifier(ingredienteItem));
      const ingredientesToAdd = ingredientes.filter(ingredienteItem => {
        const ingredienteIdentifier = this.getIngredienteIdentifier(ingredienteItem);
        if (ingredienteCollectionIdentifiers.includes(ingredienteIdentifier)) {
          return false;
        }
        ingredienteCollectionIdentifiers.push(ingredienteIdentifier);
        return true;
      });
      return [...ingredientesToAdd, ...ingredienteCollection];
    }
    return ingredienteCollection;
  }
}
