import { Service } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IUnidad, NewUnidad } from '../unidad.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IUnidad for edit and NewUnidadFormGroupInput for create.
 */
type UnidadFormGroupInput = IUnidad | PartialWithRequiredKeyOf<NewUnidad>;

type UnidadFormDefaults = Pick<NewUnidad, 'id'>;

type UnidadFormGroupContent = {
  id: FormControl<IUnidad['id'] | NewUnidad['id']>;
  descUni: FormControl<IUnidad['descUni']>;
};

export type UnidadFormGroup = FormGroup<UnidadFormGroupContent>;

@Service()
export class UnidadFormService {
  createUnidadFormGroup(unidad?: UnidadFormGroupInput): UnidadFormGroup {
    const unidadRawValue = {
      ...this.getFormDefaults(),
      ...(unidad ?? { id: null }),
    };

    return new FormGroup<UnidadFormGroupContent>({
      id: new FormControl(
        { value: unidadRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      descUni: new FormControl(unidadRawValue.descUni, {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
    });
  }

  getUnidad(form: UnidadFormGroup): IUnidad | NewUnidad {
    return form.getRawValue();
  }

  resetForm(form: UnidadFormGroup, unidad: UnidadFormGroupInput): void {
    const unidadRawValue = { ...this.getFormDefaults(), ...unidad };
    form.reset({
      ...unidadRawValue,
      id: { value: unidadRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): UnidadFormDefaults {
    return {
      id: null,
    };
  }
}
