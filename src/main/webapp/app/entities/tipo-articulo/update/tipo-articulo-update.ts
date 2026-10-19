import { EntityIcon } from 'app/shared/entity-icon';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Observable, finalize } from 'rxjs';

import { AlertError } from 'app/shared/alert';
import { TranslateDirective } from 'app/shared/language';
import { TipoArticuloService } from '../service/tipo-articulo.service';
import { ITipoArticulo } from '../tipo-articulo.model';

import { TipoArticuloFormGroup, TipoArticuloFormService } from './tipo-articulo-form.service';

@Component({
  selector: 'jhi-tipo-articulo-update',
  templateUrl: './tipo-articulo-update.html',
  imports: [EntityIcon, TranslateDirective, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class TipoArticuloUpdate implements OnInit {
  readonly isSaving = signal(false);
  tipoArticulo: ITipoArticulo | null = null;

  protected tipoArticuloService = inject(TipoArticuloService);
  protected tipoArticuloFormService = inject(TipoArticuloFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TipoArticuloFormGroup = this.tipoArticuloFormService.createTipoArticuloFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoArticulo }) => {
      this.tipoArticulo = tipoArticulo;
      if (tipoArticulo) {
        this.updateForm(tipoArticulo);
      }
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const tipoArticulo = this.tipoArticuloFormService.getTipoArticulo(this.editForm);
    if (tipoArticulo.id === null) {
      this.subscribeToSaveResponse(this.tipoArticuloService.create(tipoArticulo));
    } else {
      this.subscribeToSaveResponse(this.tipoArticuloService.update(tipoArticulo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<ITipoArticulo | null>): void {
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

  protected updateForm(tipoArticulo: ITipoArticulo): void {
    this.tipoArticulo = tipoArticulo;
    this.tipoArticuloFormService.resetForm(this.editForm, tipoArticulo);
  }
}
