import { EntityIcon } from 'app/shared/entity-icon';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal';

import { ITEM_DELETED_EVENT } from 'app/config';
import { AlertError } from 'app/shared/alert';
import { TranslateDirective } from 'app/shared/language';
import { UnidadService } from '../service/unidad.service';
import { IUnidad } from '../unidad.model';

@Component({
  templateUrl: './unidad-delete-dialog.html',
  imports: [EntityIcon, TranslateDirective, FormsModule, FontAwesomeModule, AlertError],
})
export class UnidadDeleteDialog {
  unidad?: IUnidad;

  protected readonly unidadService = inject(UnidadService);
  protected readonly activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.unidadService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
