import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslatePipe } from '@ngx-translate/core';

import { TranslateDirective } from 'app/shared/language';
import { Lookup } from 'app/shared/lookup/lookup';
import { IArticulo } from '../articulo.model';

@Component({
  selector: 'jhi-articulo-lookup',
  templateUrl: '../../../shared/lookup/lookup.html',
  imports: [RouterLink, FontAwesomeModule, TranslatePipe, TranslateDirective],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ArticuloLookup), multi: true }],
})
export class ArticuloLookup extends Lookup<IArticulo> {
  protected override readonly entityKey = 'ctrlProdNewApp.articulo';
  protected override readonly resourcePath = 'articulos';
  protected override readonly routePath = 'articulo';

  override display(item: IArticulo): string {
    return item.descArt ?? String(item.id);
  }
}
