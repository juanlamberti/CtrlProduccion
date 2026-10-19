import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslatePipe } from '@ngx-translate/core';

import { TranslateDirective } from 'app/shared/language';
import { Lookup } from 'app/shared/lookup/lookup';
import { ITipoParametro } from '../tipo-parametro.model';

@Component({
  selector: 'jhi-tipo-parametro-lookup',
  templateUrl: '../../../shared/lookup/lookup.html',
  imports: [RouterLink, FontAwesomeModule, TranslatePipe, TranslateDirective],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TipoParametroLookup), multi: true }],
})
export class TipoParametroLookup extends Lookup<ITipoParametro> {
  protected override readonly entityKey = 'ctrlProdNewApp.tipoParametro';
  protected override readonly resourcePath = 'tipo-parametros';
  protected override readonly routePath = 'tipo-parametro';

  override display(item: ITipoParametro): string {
    return [item.codigoTpParam, item.descTpParam].filter(Boolean).join(' - ') || String(item.id);
  }
}
