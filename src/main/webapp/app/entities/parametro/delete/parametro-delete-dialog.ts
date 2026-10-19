import { EntityIcon } from 'app/shared/entity-icon';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal';

import { ITEM_DELETED_EVENT } from 'app/config';
import { AlertError } from 'app/shared/alert';
import { TranslateDirective } from 'app/shared/language';
import { IParametro } from '../parametro.model';
import { ParametroService } from '../service/parametro.service';

@Component({
  templateUrl: './parametro-delete-dialog.html',
  imports: [EntityIcon, TranslateDirective, FormsModule, FontAwesomeModule, AlertError],
})
export class ParametroDeleteDialog {
  parametro?: IParametro;

  protected readonly parametroService = inject(ParametroService);
  protected readonly activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.parametroService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
