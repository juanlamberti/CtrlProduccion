import { EntityIcon } from 'app/shared/entity-icon';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { Alert, AlertError } from 'app/shared/alert';
import { TranslateDirective } from 'app/shared/language';
import { ITipoParametro } from '../tipo-parametro.model';

@Component({
  selector: 'jhi-tipo-parametro-detail',
  templateUrl: './tipo-parametro-detail.html',
  imports: [EntityIcon, FontAwesomeModule, Alert, AlertError, TranslateDirective, RouterLink],
})
export class TipoParametroDetail {
  readonly tipoParametro = input<ITipoParametro | null>(null);

  previousState(): void {
    globalThis.history.back();
  }
}
