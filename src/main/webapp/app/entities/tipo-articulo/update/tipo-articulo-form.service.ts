import { Service } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ITipoArticulo, NewTipoArticulo } from '../tipo-articulo.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITipoArticulo for edit and NewTipoArticuloFormGroupInput for create.
 */
type TipoArticuloFormGroupInput = ITipoArticulo | PartialWithRequiredKeyOf<NewTipoArticulo>;

type TipoArticuloFormDefaults = Pick<NewTipoArticulo, 'id'>;

type TipoArticuloFormGroupContent = {
  id: FormControl<ITipoArticulo['id'] | NewTipoArticulo['id']>;
  descTpArt: FormControl<ITipoArticulo['descTpArt']>;
};

export type TipoArticuloFormGroup = FormGroup<TipoArticuloFormGroupContent>;

@Service()
export class TipoArticuloFormService {
  createTipoArticuloFormGroup(tipoArticulo?: TipoArticuloFormGroupInput): TipoArticuloFormGroup {
    const tipoArticuloRawValue = {
      ...this.getFormDefaults(),
      ...(tipoArticulo ?? { id: null }),
    };

    return new FormGroup<TipoArticuloFormGroupContent>({
      id: new FormControl(
        { value: tipoArticuloRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      descTpArt: new FormControl(tipoArticuloRawValue.descTpArt, {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
    });
  }

  getTipoArticulo(form: TipoArticuloFormGroup): ITipoArticulo | NewTipoArticulo {
    return form.getRawValue();
  }

  resetForm(form: TipoArticuloFormGroup, tipoArticulo: TipoArticuloFormGroupInput): void {
    const tipoArticuloRawValue = { ...this.getFormDefaults(), ...tipoArticulo };
    form.reset({
      ...tipoArticuloRawValue,
      id: { value: tipoArticuloRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): TipoArticuloFormDefaults {
    return {
      id: null,
    };
  }
}
