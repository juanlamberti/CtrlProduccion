import { EntityIcon } from 'app/shared/entity-icon';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Observable, finalize } from 'rxjs';

import { DataUtils, EventManager, EventWithContent, FileLoadError } from 'app/core/util';
import { AlertError, AlertErrorModel } from 'app/shared/alert';
import { type BlobType } from 'app/shared/jhipster/data-utils';
import { TranslateDirective } from 'app/shared/language';
import { IArchivo } from '../archivo.model';
import { ArchivoService } from '../service/archivo.service';

import { ArchivoFormGroup, ArchivoFormService } from './archivo-form.service';

@Component({
  selector: 'jhi-archivo-update',
  templateUrl: './archivo-update.html',
  imports: [EntityIcon, TranslateDirective, FontAwesomeModule, AlertError, ReactiveFormsModule],
})
export class ArchivoUpdate implements OnInit {
  readonly isSaving = signal(false);
  archivo: IArchivo | null = null;

  protected dataUtils = inject(DataUtils);
  protected eventManager = inject(EventManager);
  protected archivoService = inject(ArchivoService);
  protected archivoFormService = inject(ArchivoFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ArchivoFormGroup = this.archivoFormService.createArchivoFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ archivo }) => {
      this.archivo = archivo;
      if (archivo) {
        this.updateForm(archivo);
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

  previousState(): void {
    globalThis.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const archivo = this.archivoFormService.getArchivo(this.editForm);
    if (archivo.id === null) {
      this.subscribeToSaveResponse(this.archivoService.create(archivo));
    } else {
      this.subscribeToSaveResponse(this.archivoService.update(archivo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<IArchivo | null>): void {
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

  protected updateForm(archivo: IArchivo): void {
    this.archivo = archivo;
    this.archivoFormService.resetForm(this.editForm, archivo);
  }
}
