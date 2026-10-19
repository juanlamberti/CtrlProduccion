import { UnidadLookup } from 'app/entities/unidad/lookup/unidad-lookup';
import { TipoArticuloLookup } from 'app/entities/tipo-articulo/lookup/tipo-articulo-lookup';
import { EntityIcon } from 'app/shared/entity-icon';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Observable, finalize, map } from 'rxjs';

import { TipoArticuloService } from 'app/entities/tipo-articulo/service/tipo-articulo.service';
import { ITipoArticulo } from 'app/entities/tipo-articulo/tipo-articulo.model';
import { UnidadService } from 'app/entities/unidad/service/unidad.service';
import { IUnidad } from 'app/entities/unidad/unidad.model';
import { AlertError } from 'app/shared/alert';
import { TranslateDirective } from 'app/shared/language';
import { IArticulo } from '../articulo.model';
import { ArticuloService } from '../service/articulo.service';

import { ArticuloFormGroup, ArticuloFormService } from './articulo-form.service';

@Component({
  selector: 'jhi-articulo-update',
  templateUrl: './articulo-update.html',
  imports: [UnidadLookup, TipoArticuloLookup, EntityIcon, TranslateDirective, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class ArticuloUpdate implements OnInit {
  readonly isSaving = signal(false);
  articulo: IArticulo | null = null;

  unidadsSharedCollection = signal<IUnidad[]>([]);
  tipoArticulosSharedCollection = signal<ITipoArticulo[]>([]);

  protected articuloService = inject(ArticuloService);
  protected articuloFormService = inject(ArticuloFormService);
  protected unidadService = inject(UnidadService);
  protected tipoArticuloService = inject(TipoArticuloService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ArticuloFormGroup = this.articuloFormService.createArticuloFormGroup();

  compareUnidad = (o1: IUnidad | null, o2: IUnidad | null): boolean => this.unidadService.compareUnidad(o1, o2);

  compareTipoArticulo = (o1: ITipoArticulo | null, o2: ITipoArticulo | null): boolean =>
    this.tipoArticuloService.compareTipoArticulo(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ articulo }) => {
      this.articulo = articulo;
      if (articulo) {
        this.updateForm(articulo);
      }
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const articulo = this.articuloFormService.getArticulo(this.editForm);
    if (articulo.id === null) {
      this.subscribeToSaveResponse(this.articuloService.create(articulo));
    } else {
      this.subscribeToSaveResponse(this.articuloService.update(articulo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IArticulo | null>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving.set(false);
  }

  protected updateForm(articulo: IArticulo): void {
    this.articulo = articulo;
    this.articuloFormService.resetForm(this.editForm, articulo);

    this.unidadsSharedCollection.update(unidads =>
      this.unidadService.addUnidadToCollectionIfMissing<IUnidad>(unidads, articulo.unidadPresentacionArt),
    );
    this.tipoArticulosSharedCollection.update(tipoArticulos =>
      this.tipoArticuloService.addTipoArticuloToCollectionIfMissing<ITipoArticulo>(tipoArticulos, articulo.tipoArt),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.unidadService
      .query()
      .pipe(map((res: HttpResponse<IUnidad[]>) => res.body ?? []))
      .pipe(
        map((unidads: IUnidad[]) =>
          this.unidadService.addUnidadToCollectionIfMissing<IUnidad>(unidads, this.articulo?.unidadPresentacionArt),
        ),
      )
      .subscribe((unidads: IUnidad[]) => this.unidadsSharedCollection.set(unidads));

    this.tipoArticuloService
      .query()
      .pipe(map((res: HttpResponse<ITipoArticulo[]>) => res.body ?? []))
      .pipe(
        map((tipoArticulos: ITipoArticulo[]) =>
          this.tipoArticuloService.addTipoArticuloToCollectionIfMissing<ITipoArticulo>(tipoArticulos, this.articulo?.tipoArt),
        ),
      )
      .subscribe((tipoArticulos: ITipoArticulo[]) => this.tipoArticulosSharedCollection.set(tipoArticulos));
  }
}
