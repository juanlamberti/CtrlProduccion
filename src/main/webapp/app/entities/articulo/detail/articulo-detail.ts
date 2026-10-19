import { EntityIcon } from 'app/shared/entity-icon';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { Alert, AlertError } from 'app/shared/alert';
import { TranslateDirective } from 'app/shared/language';
import { IArticulo } from '../articulo.model';

@Component({
  selector: 'jhi-articulo-detail',
  templateUrl: './articulo-detail.html',
  imports: [EntityIcon, FontAwesomeModule, Alert, AlertError, TranslateDirective, RouterLink],
})
export class ArticuloDetail {
  readonly articulo = input<IArticulo | null>(null);

  previousState(): void {
    globalThis.history.back();
  }
}
