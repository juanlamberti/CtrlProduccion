import { DecimalPipe } from '@angular/common';
import { Ingrediente } from 'app/entities/ingrediente/list/ingrediente';
import { UnidadLookup } from 'app/entities/unidad/lookup/unidad-lookup';
import { TipoArticuloLookup } from 'app/entities/tipo-articulo/lookup/tipo-articulo-lookup';
import { EntityIcon } from 'app/shared/entity-icon';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Observable, finalize, map } from 'rxjs';

import { TipoArticuloService } from 'app/entities/tipo-articulo/service/tipo-articulo.service';
import { ITipoArticulo } from 'app/entities/tipo-articulo/tipo-articulo.model';
import { UnidadService } from 'app/entities/unidad/service/unidad.service';
import { IUnidad } from 'app/entities/unidad/unidad.model';
import { AlertError } from 'app/shared/alert';
import { TranslateDirective } from 'app/shared/language';
import { NaturalezaArticulo } from 'app/entities/enumerations/naturaleza-articulo.model';
import { IArticulo } from '../articulo.model';
import { ArticuloService } from '../service/articulo.service';

import { ArticuloFormGroup, ArticuloFormService } from './articulo-form.service';

@Component({
  selector: 'jhi-articulo-update',
  templateUrl: './articulo-update.html',
  imports: [
    DecimalPipe,
    Ingrediente,
    UnidadLookup,
    TipoArticuloLookup,
    EntityIcon,
    TranslateDirective,
    FontAwesomeModule,
    AlertError,
    ReactiveFormsModule,
  ],
})
export class ArticuloUpdate implements OnInit {
  readonly isSaving = signal(false);
  readonly totals = signal<IArticulo | null>(null);
  readonly totalsError = signal(false);
  articulo: IArticulo | null = null;
  isIngredient = false;

  unidadsSharedCollection = signal<IUnidad[]>([]);
  tipoArticulosSharedCollection = signal<ITipoArticulo[]>([]);

  protected articuloService = inject(ArticuloService);
  protected articuloFormService = inject(ArticuloFormService);
  protected unidadService = inject(UnidadService);
  protected tipoArticuloService = inject(TipoArticuloService);
  protected activatedRoute = inject(ActivatedRoute);
  protected router = inject(Router);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ArticuloFormGroup = this.articuloFormService.createArticuloFormGroup();

  compareUnidad = (o1: IUnidad | null, o2: IUnidad | null): boolean => this.unidadService.compareUnidad(o1, o2);

  compareTipoArticulo = (o1: ITipoArticulo | null, o2: ITipoArticulo | null): boolean =>
    this.tipoArticuloService.compareTipoArticulo(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ articulo, ingredient }) => {
      this.isIngredient = ingredient === true || articulo?.naturalezaArt === NaturalezaArticulo.SIMPLE;
      this.articulo = articulo;
      if (!this.isIngredient && !articulo) {
        this.editForm.patchValue({ pesoArt: 0, valorPresentacionArt: 0 });
      }
      if (articulo) {
        this.updateForm(articulo);
      }
      if (this.isIngredient) {
        this.setIngredientMode(true);
      }
    });
  }

  setIngredientMode(isIngredient: boolean): void {
    this.isIngredient = isIngredient;
    this.totals.set(null);
    this.totalsError.set(false);
    if (isIngredient && !this.articulo) {
      this.tipoArticuloService.query({ 'descTpArt.equals': 'INSUMO' }).subscribe(response => {
        if (!this.isIngredient) return;
        const insumo = response.body?.find(tipo => tipo.descTpArt?.trim().toUpperCase() === 'INSUMO');
        if (insumo) {
          this.editForm.patchValue({ tipoArt: insumo });
        } else {
          this.tipoArticuloService.query({ 'descTpArt.equals': 'ARTICULO' }).subscribe(fallback => {
            if (this.isIngredient) {
              this.editForm.patchValue({
                tipoArt: fallback.body?.find(tipo => tipo.descTpArt?.trim().toUpperCase() === 'ARTICULO') ?? null,
              });
            }
          });
        }
      });
    } else {
      this.editForm.patchValue({ tipoArt: this.articulo?.tipoArt ?? null });
      this.loadTotals();
    }
  }

  loadTotals(): void {
    if (!this.articulo?.id) {
      return;
    }
    this.totals.set(null);
    this.totalsError.set(false);
    this.articuloService.totals(this.articulo.id).subscribe({
      next: totals => {
        this.totals.set(totals);
        if (!this.isIngredient) {
          this.editForm.patchValue({ pesoArt: totals.pesoArt, valorPresentacionArt: totals.valorPresentacionArt });
        }
      },
      error: () => this.totalsError.set(true),
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
      next: articulo => {
        if (articulo && !this.isIngredient) {
          this.updateForm(articulo);
        } else {
          this.onSaveSuccess();
        }
      },
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    void this.router.navigate(['/']);
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
    this.loadTotals();

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
