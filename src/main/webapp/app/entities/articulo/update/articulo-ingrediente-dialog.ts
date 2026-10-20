import { Component, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal';
import { finalize } from 'rxjs';

import { AlertError } from 'app/shared/alert';
import { TranslateDirective } from 'app/shared/language';
import { IArticulo } from '../articulo.model';
import { ArticuloService } from '../service/articulo.service';

@Component({
  templateUrl: './articulo-ingrediente-dialog.html',
  imports: [ReactiveFormsModule, AlertError, TranslateDirective],
})
export class ArticuloIngredienteDialog implements OnInit {
  articulo!: IArticulo;
  readonly isSaving = signal(false);
  readonly failed = signal(false);
  readonly form = new FormGroup({
    descArt: new FormControl<string | null>(null, [Validators.required, Validators.maxLength(500)]),
    presentacionCompraArt: new FormControl<number | null>(null, [Validators.required, Validators.min(Number.MIN_VALUE)]),
    valorPresentacionArt: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
  });
  readonly activeModal = inject(NgbActiveModal);
  private readonly articuloService = inject(ArticuloService);

  ngOnInit(): void {
    this.form.reset({
      descArt: this.articulo.descArt ?? null,
      presentacionCompraArt: this.articulo.presentacionCompraArt ?? null,
      valorPresentacionArt: this.articulo.valorPresentacionArt ?? null,
    });
  }

  save(): void {
    if (this.form.invalid || this.isSaving()) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSaving.set(true);
    this.failed.set(false);
    this.articuloService
      .partialUpdate({ id: this.articulo.id, ...this.form.getRawValue() })
      .pipe(finalize(() => this.isSaving.set(false)))
      .subscribe({
        next: articulo => this.activeModal.close(articulo),
        error: () => this.failed.set(true),
      });
  }
}
