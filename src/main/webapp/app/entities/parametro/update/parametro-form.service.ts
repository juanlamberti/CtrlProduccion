import { Service } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IParametro, NewParametro } from '../parametro.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IParametro for edit and NewParametroFormGroupInput for create.
 */
type ParametroFormGroupInput = IParametro | PartialWithRequiredKeyOf<NewParametro>;

type ParametroFormDefaults = Pick<NewParametro, 'id'>;

type ParametroFormGroupContent = {
  id: FormControl<IParametro['id'] | NewParametro['id']>;
  codigoParam: FormControl<IParametro['codigoParam']>;
  descParam: FormControl<IParametro['descParam']>;
  valorParam: FormControl<IParametro['valorParam']>;
  archivoParam: FormControl<IParametro['archivoParam']>;
  archivoParamContentType: FormControl<IParametro['archivoParamContentType']>;
  editCteSNParam: FormControl<IParametro['editCteSNParam']>;
  tipo: FormControl<IParametro['tipo']>;
};

export type ParametroFormGroup = FormGroup<ParametroFormGroupContent>;

@Service()
export class ParametroFormService {
  createParametroFormGroup(parametro?: ParametroFormGroupInput): ParametroFormGroup {
    const parametroRawValue = {
      ...this.getFormDefaults(),
      ...(parametro ?? { id: null }),
    };

    return new FormGroup<ParametroFormGroupContent>({
      id: new FormControl(
        { value: parametroRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      codigoParam: new FormControl(parametroRawValue.codigoParam, {
        validators: [Validators.required, Validators.maxLength(20)],
      }),
      descParam: new FormControl(parametroRawValue.descParam, {
        validators: [Validators.required, Validators.maxLength(500)],
      }),
      valorParam: new FormControl(parametroRawValue.valorParam, {
        validators: [Validators.maxLength(32000)],
      }),
      archivoParam: new FormControl(parametroRawValue.archivoParam),
      archivoParamContentType: new FormControl(parametroRawValue.archivoParamContentType),
      editCteSNParam: new FormControl(parametroRawValue.editCteSNParam, {
        validators: [Validators.required, Validators.maxLength(2)],
      }),
      tipo: new FormControl(parametroRawValue.tipo),
    });
  }

  getParametro(form: ParametroFormGroup): IParametro | NewParametro {
    return form.getRawValue();
  }

  resetForm(form: ParametroFormGroup, parametro: ParametroFormGroupInput): void {
    const parametroRawValue = { ...this.getFormDefaults(), ...parametro };
    form.reset({
      ...parametroRawValue,
      id: { value: parametroRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): ParametroFormDefaults {
    return {
      id: null,
    };
  }
}
