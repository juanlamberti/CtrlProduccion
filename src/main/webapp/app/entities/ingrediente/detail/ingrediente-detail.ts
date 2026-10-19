import { EntityIcon } from 'app/shared/entity-icon';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { Alert, AlertError } from 'app/shared/alert';
import { TranslateDirective } from 'app/shared/language';
import { IIngrediente } from '../ingrediente.model';

@Component({
  selector: 'jhi-ingrediente-detail',
  templateUrl: './ingrediente-detail.html',
  imports: [EntityIcon, FontAwesomeModule, Alert, AlertError, TranslateDirective, RouterLink],
})
export class IngredienteDetail {
  readonly ingrediente = input<IIngrediente | null>(null);

  previousState(): void {
    globalThis.history.back();
  }
}
