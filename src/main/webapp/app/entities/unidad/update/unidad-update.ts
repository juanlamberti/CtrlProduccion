import { EntityIcon } from 'app/shared/entity-icon';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Observable, finalize } from 'rxjs';

import { AlertError } from 'app/shared/alert';
import { TranslateDirective } from 'app/shared/language';
import { UnidadService } from '../service/unidad.service';
import { IUnidad } from '../unidad.model';

import { UnidadFormGroup, UnidadFormService } from './unidad-form.service';

@Component({
  selector: 'jhi-unidad-update',
  templateUrl: './unidad-update.html',
  imports: [EntityIcon, TranslateDirective, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class UnidadUpdate implements OnInit {
  readonly isSaving = signal(false);
  unidad: IUnidad | null = null;

  protected unidadService = inject(UnidadService);
  protected unidadFormService = inject(UnidadFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: UnidadFormGroup = this.unidadFormService.createUnidadFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ unidad }) => {
      this.unidad = unidad;
      if (unidad) {
        this.updateForm(unidad);
      }
    });
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const unidad = this.unidadFormService.getUnidad(this.editForm);
    if (unidad.id === null) {
      this.subscribeToSaveResponse(this.unidadService.create(unidad));
    } else {
      this.subscribeToSaveResponse(this.unidadService.update(unidad));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IUnidad | null>): void {
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

  protected updateForm(unidad: IUnidad): void {
    this.unidad = unidad;
    this.unidadFormService.resetForm(this.editForm, unidad);
  }
}
