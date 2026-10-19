import { Service } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IIngrediente, NewIngrediente } from '../ingrediente.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IIngrediente for edit and NewIngredienteFormGroupInput for create.
 */
type IngredienteFormGroupInput = IIngrediente | PartialWithRequiredKeyOf<NewIngrediente>;

type IngredienteFormDefaults = Pick<NewIngrediente, 'id'>;

type IngredienteFormGroupContent = {
  id: FormControl<IIngrediente['id'] | NewIngrediente['id']>;
  cantidadIng: FormControl<IIngrediente['cantidadIng']>;
  articulo: FormControl<IIngrediente['articulo']>;
  insumo: FormControl<IIngrediente['insumo']>;
};

export type IngredienteFormGroup = FormGroup<IngredienteFormGroupContent>;

@Service()
export class IngredienteFormService {
  createIngredienteFormGroup(ingrediente?: IngredienteFormGroupInput): IngredienteFormGroup {
    const ingredienteRawValue = {
      ...this.getFormDefaults(),
      ...(ingrediente ?? { id: null }),
    };

    return new FormGroup<IngredienteFormGroupContent>({
      id: new FormControl(
        { value: ingredienteRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      cantidadIng: new FormControl(ingredienteRawValue.cantidadIng, {
        validators: [Validators.required, Validators.min(0)],
      }),
      articulo: new FormControl(ingredienteRawValue.articulo, {
        validators: [Validators.required],
      }),
      insumo: new FormControl(ingredienteRawValue.insumo, {
        validators: [Validators.required],
      }),
    });
  }

  getIngrediente(form: IngredienteFormGroup): IIngrediente | NewIngrediente {
    return form.getRawValue();
  }

  resetForm(form: IngredienteFormGroup, ingrediente: IngredienteFormGroupInput): void {
    const ingredienteRawValue = { ...this.getFormDefaults(), ...ingrediente };
    form.reset({
      ...ingredienteRawValue,
      id: { value: ingredienteRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): IngredienteFormDefaults {
    return {
      id: null,
    };
  }
}
