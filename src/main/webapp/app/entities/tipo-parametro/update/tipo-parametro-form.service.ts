import { Service } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ITipoParametro, NewTipoParametro } from '../tipo-parametro.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ITipoParametro for edit and NewTipoParametroFormGroupInput for create.
 */
type TipoParametroFormGroupInput = ITipoParametro | PartialWithRequiredKeyOf<NewTipoParametro>;

type TipoParametroFormDefaults = Pick<NewTipoParametro, 'id'>;

type TipoParametroFormGroupContent = {
  id: FormControl<ITipoParametro['id'] | NewTipoParametro['id']>;
  codigoTpParam: FormControl<ITipoParametro['codigoTpParam']>;
  descTpParam: FormControl<ITipoParametro['descTpParam']>;
};

export type TipoParametroFormGroup = FormGroup<TipoParametroFormGroupContent>;

@Service()
export class TipoParametroFormService {
  createTipoParametroFormGroup(tipoParametro?: TipoParametroFormGroupInput): TipoParametroFormGroup {
    const tipoParametroRawValue = {
      ...this.getFormDefaults(),
      ...(tipoParametro ?? { id: null }),
    };

    return new FormGroup<TipoParametroFormGroupContent>({
      id: new FormControl(
        { value: tipoParametroRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      codigoTpParam: new FormControl(tipoParametroRawValue.codigoTpParam, {
        validators: [Validators.required, Validators.maxLength(20)],
      }),
      descTpParam: new FormControl(tipoParametroRawValue.descTpParam, {
        validators: [Validators.required, Validators.maxLength(300)],
      }),
    });
  }

  getTipoParametro(form: TipoParametroFormGroup): ITipoParametro | NewTipoParametro {
    return form.getRawValue();
  }

  resetForm(form: TipoParametroFormGroup, tipoParametro: TipoParametroFormGroupInput): void {
    const tipoParametroRawValue = { ...this.getFormDefaults(), ...tipoParametro };
    form.reset({
      ...tipoParametroRawValue,
      id: { value: tipoParametroRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): TipoParametroFormDefaults {
    return {
      id: null,
    };
  }
}
