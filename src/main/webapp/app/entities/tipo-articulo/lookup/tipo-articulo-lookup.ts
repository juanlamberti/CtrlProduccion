import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslatePipe } from '@ngx-translate/core';

import { TranslateDirective } from 'app/shared/language';
import { Lookup } from 'app/shared/lookup/lookup';
import { ITipoArticulo } from '../tipo-articulo.model';

@Component({
  selector: 'jhi-tipo-articulo-lookup',
  templateUrl: '../../../shared/lookup/lookup.html',
  imports: [RouterLink, FontAwesomeModule, TranslatePipe, TranslateDirective],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TipoArticuloLookup), multi: true }],
})
export class TipoArticuloLookup extends Lookup<ITipoArticulo> {
  protected override readonly entityKey = 'ctrlProdNewApp.tipoArticulo';
  protected override readonly resourcePath = 'tipo-articulos';
  protected override readonly routePath = 'tipo-articulo';

  override display(item: ITipoArticulo): string {
    return item.descTpArt ?? String(item.id);
  }
}
