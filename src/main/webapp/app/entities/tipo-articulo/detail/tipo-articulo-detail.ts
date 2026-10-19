import { EntityIcon } from 'app/shared/entity-icon';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { Alert, AlertError } from 'app/shared/alert';
import { TranslateDirective } from 'app/shared/language';
import { ITipoArticulo } from '../tipo-articulo.model';

@Component({
  selector: 'jhi-tipo-articulo-detail',
  templateUrl: './tipo-articulo-detail.html',
  imports: [EntityIcon, FontAwesomeModule, Alert, AlertError, TranslateDirective, RouterLink],
})
export class TipoArticuloDetail {
  readonly tipoArticulo = input<ITipoArticulo | null>(null);

  previousState(): void {
    globalThis.history.back();
  }
}
