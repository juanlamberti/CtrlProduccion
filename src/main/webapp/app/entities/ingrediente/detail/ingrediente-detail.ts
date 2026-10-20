import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap/modal';
import { IngredienteUpdate } from '../update/ingrediente-update';
import { EntityIcon } from 'app/shared/entity-icon';
import { Component, inject, model } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { Alert, AlertError } from 'app/shared/alert';
import { TranslateDirective } from 'app/shared/language';
import { IArticulo } from 'app/entities/articulo/articulo.model';
import { IIngrediente } from '../ingrediente.model';

@Component({
  selector: 'jhi-ingrediente-detail',
  templateUrl: './ingrediente-detail.html',
  imports: [EntityIcon, FontAwesomeModule, Alert, AlertError, TranslateDirective, RouterLink],
})
export class IngredienteDetail {
  dialogParent: IArticulo | null = null;
  readonly ingrediente = model<IIngrediente | null>(null);

  protected readonly activeModal = inject(NgbActiveModal, { optional: true });
  private readonly modalService = inject(NgbModal);

  edit(): void {
    const ingrediente = this.ingrediente();
    if (!ingrediente) {
      return;
    }
    const modalRef = this.modalService.open(IngredienteUpdate, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.dialogIngrediente = ingrediente;
    modalRef.componentInstance.dialogParent = this.dialogParent;
    modalRef.closed.subscribe((saved: IIngrediente) => this.ingrediente.set(saved));
  }

  previousState(): void {
    if (this.activeModal) {
      this.activeModal.close();
    } else {
      globalThis.history.back();
    }
  }
}
