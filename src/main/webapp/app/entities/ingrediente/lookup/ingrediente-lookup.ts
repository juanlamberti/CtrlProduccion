import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslatePipe } from '@ngx-translate/core';

import { TranslateDirective } from 'app/shared/language';
import { Lookup } from 'app/shared/lookup/lookup';
import { IIngrediente } from '../ingrediente.model';

@Component({
  selector: 'jhi-ingrediente-lookup',
  templateUrl: '../../../shared/lookup/lookup.html',
  imports: [RouterLink, FontAwesomeModule, TranslatePipe, TranslateDirective],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => IngredienteLookup), multi: true }],
})
export class IngredienteLookup extends Lookup<IIngrediente> {
  protected override readonly entityKey = 'ctrlProdNewApp.ingrediente';
  protected override readonly resourcePath = 'ingredientes';
  protected override readonly routePath = 'ingrediente';

  override display(item: IIngrediente): string {
    return [item.articulo?.descArt, item.insumo?.descArt].filter(Boolean).join(' / ') || String(item.id);
  }
}
