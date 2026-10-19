import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Service, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { serverApiUrl } from 'app/config';
import { createRequestOption } from 'app/core/request';
import { IArchivo, NewArchivo } from '../archivo.model';

export type PartialUpdateArchivo = Partial<IArchivo> & Pick<IArchivo, 'id'>;

@Service()
export class ArchivosService {
  searchTerm = '';
  readonly archivosParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly archivosResource = httpResource<IArchivo[]>(() => {
    const params = this.archivosParams();
    if (!params) {
      return undefined;
    }
    return { url: `${this.resourceUrl}/search`, params };
  });
  /**
   * This signal holds the list of archivo that have been fetched. It is updated when the archivosResource emits a new value.
   * In case of error while fetching the archivos, the signal is set to an empty array.
   */
  readonly archivos = computed(() => (this.archivosResource.hasValue() ? this.archivosResource.value() : []));
  protected readonly resourceUrl = `${serverApiUrl}api/archivos`;
}

@Service()
export class ArchivoService extends ArchivosService {
  protected readonly http = inject(HttpClient);

  search(req: Record<string, string | number | boolean | readonly (string | number | boolean)[]>): void {
    this.archivosParams.set({ ...req, ...(this.searchTerm.trim() ? { 'search.contains': this.searchTerm.trim() } : {}) });
  }

  create(archivo: NewArchivo): Observable<IArchivo> {
    return this.http.post<IArchivo>(this.resourceUrl, archivo);
  }

  update(archivo: IArchivo): Observable<IArchivo> {
    return this.http.put<IArchivo>(`${this.resourceUrl}/${encodeURIComponent(this.getArchivoIdentifier(archivo))}`, archivo);
  }

  partialUpdate(archivo: PartialUpdateArchivo): Observable<IArchivo> {
    return this.http.patch<IArchivo>(`${this.resourceUrl}/${encodeURIComponent(this.getArchivoIdentifier(archivo))}`, archivo);
  }

  find(id: number): Observable<IArchivo> {
    return this.http.get<IArchivo>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IArchivo[]>> {
    const options = createRequestOption(req);
    return this.http.get<IArchivo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getArchivoIdentifier(archivo: Pick<IArchivo, 'id'>): number {
    return archivo.id;
  }

  compareArchivo(o1: Pick<IArchivo, 'id'> | null, o2: Pick<IArchivo, 'id'> | null): boolean {
    return o1 && o2 ? this.getArchivoIdentifier(o1) === this.getArchivoIdentifier(o2) : o1 === o2;
  }

  addArchivoToCollectionIfMissing<Type extends Pick<IArchivo, 'id'>>(
    archivoCollection: Type[],
    ...archivosToCheck: (Type | null | undefined)[]
  ): Type[] {
    const archivos: Type[] = archivosToCheck.filter(archivoItem => archivoItem !== null && archivoItem !== undefined);
    if (archivos.length > 0) {
      const archivoCollectionIdentifiers = archivoCollection.map(archivoItem => this.getArchivoIdentifier(archivoItem));
      const archivosToAdd = archivos.filter(archivoItem => {
        const archivoIdentifier = this.getArchivoIdentifier(archivoItem);
        if (archivoCollectionIdentifiers.includes(archivoIdentifier)) {
          return false;
        }
        archivoCollectionIdentifiers.push(archivoIdentifier);
        return true;
      });
      return [...archivosToAdd, ...archivoCollection];
    }
    return archivoCollection;
  }
}
