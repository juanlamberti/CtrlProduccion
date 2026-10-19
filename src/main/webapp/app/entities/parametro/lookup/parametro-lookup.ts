import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslatePipe } from '@ngx-translate/core';

import { TranslateDirective } from 'app/shared/language';
import { Lookup } from 'app/shared/lookup/lookup';
import { IParametro } from '../parametro.model';

@Component({
  selector: 'jhi-parametro-lookup',
  templateUrl: '../../../shared/lookup/lookup.html',
  imports: [RouterLink, FontAwesomeModule, TranslatePipe, TranslateDirective],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ParametroLookup), multi: true }],
})
export class ParametroLookup extends Lookup<IParametro> {
  protected override readonly entityKey = 'ctrlProdNewApp.parametro';
  protected override readonly resourcePath = 'parametros';
  protected override readonly routePath = 'parametro';

  override display(item: IParametro): string {
    return [item.codigoParam, item.descParam].filter(Boolean).join(' - ') || String(item.id);
  }
}
