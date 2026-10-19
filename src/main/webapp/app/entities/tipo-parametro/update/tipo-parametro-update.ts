import { EntityIcon } from 'app/shared/entity-icon';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Observable, finalize } from 'rxjs';

import { AlertError } from 'app/shared/alert';
import { TranslateDirective } from 'app/shared/language';
import { TipoParametroService } from '../service/tipo-parametro.service';
import { ITipoParametro } from '../tipo-parametro.model';

import { TipoParametroFormGroup, TipoParametroFormService } from './tipo-parametro-form.service';

@Component({
  selector: 'jhi-tipo-parametro-update',
  templateUrl: './tipo-parametro-update.html',
  imports: [EntityIcon, TranslateDirective, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class TipoParametroUpdate implements OnInit {
  readonly isSaving = signal(false);
  tipoParametro: ITipoParametro | null = null;

  protected tipoParametroService = inject(TipoParametroService);
  protected tipoParametroFormService = inject(TipoParametroFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: TipoParametroFormGroup = this.tipoParametroFormService.createTipoParametroFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoParametro }) => {
      this.tipoParametro = tipoParametro;
      if (tipoParametro) {
        this.updateForm(tipoParametro);
      }
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const tipoParametro = this.tipoParametroFormService.getTipoParametro(this.editForm);
    if (tipoParametro.id === null) {
      this.subscribeToSaveResponse(this.tipoParametroService.create(tipoParametro));
    } else {
      this.subscribeToSaveResponse(this.tipoParametroService.update(tipoParametro));
    }
  }

  protected subscribeToSaveResponse(result: Observable<ITipoParametro | null>): void {
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

  protected updateForm(tipoParametro: ITipoParametro): void {
    this.tipoParametro = tipoParametro;
    this.tipoParametroFormService.resetForm(this.editForm, tipoParametro);
  }
}
