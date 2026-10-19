import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslatePipe } from '@ngx-translate/core';

import { TranslateDirective } from 'app/shared/language';
import { Lookup } from 'app/shared/lookup/lookup';
import { IUnidad } from '../unidad.model';

@Component({
  selector: 'jhi-unidad-lookup',
  templateUrl: '../../../shared/lookup/lookup.html',
  imports: [RouterLink, FontAwesomeModule, TranslatePipe, TranslateDirective],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => UnidadLookup), multi: true }],
})
export class UnidadLookup extends Lookup<IUnidad> {
  protected override readonly entityKey = 'ctrlProdNewApp.unidad';
  protected override readonly resourcePath = 'unidads';
  protected override readonly routePath = 'unidad';

  override display(item: IUnidad): string {
    return item.descUni ?? String(item.id);
  }
}
