import { EntityIcon } from 'app/shared/entity-icon';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { Alert, AlertError } from 'app/shared/alert';
import { TranslateDirective } from 'app/shared/language';
import { IUnidad } from '../unidad.model';

@Component({
  selector: 'jhi-unidad-detail',
  templateUrl: './unidad-detail.html',
  imports: [EntityIcon, FontAwesomeModule, Alert, AlertError, TranslateDirective, RouterLink],
})
export class UnidadDetail {
  readonly unidad = input<IUnidad | null>(null);

  previousState(): void {
    globalThis.history.back();
  }
}
