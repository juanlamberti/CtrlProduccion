import { TipoParametroLookup } from 'app/entities/tipo-parametro/lookup/tipo-parametro-lookup';
import { EntityIcon } from 'app/shared/entity-icon';
import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Observable, finalize, map } from 'rxjs';

import { DataUtils, EventManager, EventWithContent, FileLoadError } from 'app/core/util';
import { TipoParametroService } from 'app/entities/tipo-parametro/service/tipo-parametro.service';
import { ITipoParametro } from 'app/entities/tipo-parametro/tipo-parametro.model';
import { AlertError, AlertErrorModel } from 'app/shared/alert';
import { type BlobType } from 'app/shared/jhipster/data-utils';
import { TranslateDirective } from 'app/shared/language';
import { IParametro } from '../parametro.model';
import { ParametroService } from '../service/parametro.service';

import { ParametroFormGroup, ParametroFormService } from './parametro-form.service';

@Component({
  selector: 'jhi-parametro-update',
  templateUrl: './parametro-update.html',
  imports: [TipoParametroLookup, EntityIcon, TranslateDirective, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class ParametroUpdate implements OnInit {
  readonly isSaving = signal(false);
  parametro: IParametro | null = null;

  tipoParametrosSharedCollection = signal<ITipoParametro[]>([]);

  protected dataUtils = inject(DataUtils);
  protected eventManager = inject(EventManager);
  protected parametroService = inject(ParametroService);
  protected parametroFormService = inject(ParametroFormService);
  protected tipoParametroService = inject(TipoParametroService);
  protected elementRef = inject(ElementRef);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ParametroFormGroup = this.parametroFormService.createParametroFormGroup();

  compareTipoParametro = (o1: ITipoParametro | null, o2: ITipoParametro | null): boolean =>
    this.tipoParametroService.compareTipoParametro(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ parametro }) => {
      this.parametro = parametro;
      if (parametro) {
        this.updateForm(parametro);
      }
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined, blobType?: BlobType): void {
    this.dataUtils.openFile(base64String, contentType, blobType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(
          new EventWithContent<AlertErrorModel>('ctrlProdNewApp.error', { ...err, key: `error.file.${err.key}` }),
        ),
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (idInput && this.elementRef.nativeElement.querySelector(`#${idInput}`)) {
      this.elementRef.nativeElement.querySelector(`#${idInput}`).value = null;
    }
  }

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const parametro = this.parametroFormService.getParametro(this.editForm);
    if (parametro.id === null) {
      this.subscribeToSaveResponse(this.parametroService.create(parametro));
    } else {
      this.subscribeToSaveResponse(this.parametroService.update(parametro));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IParametro | null>): void {
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

  protected updateForm(parametro: IParametro): void {
    this.parametro = parametro;
    this.parametroFormService.resetForm(this.editForm, parametro);

    this.tipoParametrosSharedCollection.update(tipoParametros =>
      this.tipoParametroService.addTipoParametroToCollectionIfMissing<ITipoParametro>(tipoParametros, parametro.tipo),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.tipoParametroService
      .query()
      .pipe(map((res: HttpResponse<ITipoParametro[]>) => res.body ?? []))
      .pipe(
        map((tipoParametros: ITipoParametro[]) =>
          this.tipoParametroService.addTipoParametroToCollectionIfMissing<ITipoParametro>(tipoParametros, this.parametro?.tipo),
        ),
      )
      .subscribe((tipoParametros: ITipoParametro[]) => this.tipoParametrosSharedCollection.set(tipoParametros));
  }
}
