import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal';
import { ArticuloLookup } from 'app/entities/articulo/lookup/articulo-lookup';
import { EntityIcon } from 'app/shared/entity-icon';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject, input, output, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Observable, finalize, map } from 'rxjs';

import { IArticulo } from 'app/entities/articulo/articulo.model';
import { ArticuloService } from 'app/entities/articulo/service/articulo.service';
import { AlertError } from 'app/shared/alert';
import { TranslateDirective } from 'app/shared/language';
import { IIngrediente } from '../ingrediente.model';
import { IngredienteService } from '../service/ingrediente.service';

import { IngredienteFormGroup, IngredienteFormService } from './ingrediente-form.service';

@Component({
  selector: 'jhi-ingrediente-update',
  templateUrl: './ingrediente-update.html',
  imports: [ArticuloLookup, EntityIcon, TranslateDirective, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class IngredienteUpdate implements OnInit {
  dialogIngrediente: IIngrediente | null = null;
  dialogParent: IArticulo | null = null;
  readonly activeModal = inject(NgbActiveModal, { optional: true });
  readonly parentArticulo = input<IArticulo | null>(null);
  readonly saved = output<number>();
  readonly isSaving = signal(false);
  ingrediente: IIngrediente | null = null;

  articulosSharedCollection = signal<IArticulo[]>([]);

  protected ingredienteService = inject(IngredienteService);
  protected ingredienteFormService = inject(IngredienteFormService);
  protected articuloService = inject(ArticuloService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: IngredienteFormGroup = this.ingredienteFormService.createIngredienteFormGroup();

  compareArticulo = (o1: IArticulo | null, o2: IArticulo | null): boolean => this.articuloService.compareArticulo(o1, o2);

  ngOnInit(): void {
    if (this.activeModal) {
      if (this.dialogIngrediente) {
        this.updateForm(this.dialogIngrediente);
      } else {
        this.ingredienteFormService.resetForm(this.editForm, { id: null, articulo: this.dialogParent });
      }
      return;
    }
    const parent = this.parentArticulo() ?? this.dialogParent;
    if (parent) {
      this.ingredienteFormService.resetForm(this.editForm, { id: null, articulo: parent });
      return;
    }
    this.activatedRoute.data.subscribe(({ ingrediente }) => {
      this.ingrediente = ingrediente;
      if (ingrediente) {
        this.updateForm(ingrediente);
      }
    });
  }

  previousState(): void {
    if (this.activeModal) {
      this.activeModal.dismiss();
    } else {
      globalThis.history.back();
    }
  }

  save(): void {
    this.isSaving.set(true);
    const ingrediente = this.ingredienteFormService.getIngrediente(this.editForm);
    if (ingrediente.id === null) {
      this.subscribeToSaveResponse(this.ingredienteService.create(ingrediente));
    } else {
      this.subscribeToSaveResponse(this.ingredienteService.update(ingrediente));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IIngrediente | null>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: ingrediente => {
        if (this.activeModal) {
          this.activeModal.close(ingrediente);
        } else {
          this.onSaveSuccess();
        }
      },
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    const parent = this.parentArticulo() ?? this.dialogParent;
    if (parent) {
      this.ingredienteFormService.resetForm(this.editForm, { id: null, articulo: parent });
      this.saved.emit(parent.id);
    } else {
      this.previousState();
    }
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving.set(false);
  }

  protected updateForm(ingrediente: IIngrediente): void {
    this.ingrediente = ingrediente;
    this.ingredienteFormService.resetForm(this.editForm, ingrediente);

    this.articulosSharedCollection.update(articulos =>
      this.articuloService.addArticuloToCollectionIfMissing<IArticulo>(articulos, ingrediente.articulo, ingrediente.insumo),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.articuloService
      .query()
      .pipe(map((res: HttpResponse<IArticulo[]>) => res.body ?? []))
      .pipe(
        map((articulos: IArticulo[]) =>
          this.articuloService.addArticuloToCollectionIfMissing<IArticulo>(articulos, this.ingrediente?.articulo, this.ingrediente?.insumo),
        ),
      )
      .subscribe((articulos: IArticulo[]) => this.articulosSharedCollection.set(articulos));
  }
}
