import { Service } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IArticulo, NewArticulo } from '../articulo.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IArticulo for edit and NewArticuloFormGroupInput for create.
 */
type ArticuloFormGroupInput = IArticulo | PartialWithRequiredKeyOf<NewArticulo>;

type ArticuloFormDefaults = Pick<NewArticulo, 'id'>;

type ArticuloFormGroupContent = {
  id: FormControl<IArticulo['id'] | NewArticulo['id']>;
  descArt: FormControl<IArticulo['descArt']>;
  recetaArt: FormControl<IArticulo['recetaArt']>;
  unidadGenerarArt: FormControl<IArticulo['unidadGenerarArt']>;
  mermaPreparacionArt: FormControl<IArticulo['mermaPreparacionArt']>;
  pesoArt: FormControl<IArticulo['pesoArt']>;
  presentacionCompraArt: FormControl<IArticulo['presentacionCompraArt']>;
  valorPresentacionArt: FormControl<IArticulo['valorPresentacionArt']>;
  unidadPresentacionArt: FormControl<IArticulo['unidadPresentacionArt']>;
  tipoArt: FormControl<IArticulo['tipoArt']>;
};

export type ArticuloFormGroup = FormGroup<ArticuloFormGroupContent>;

@Service()
export class ArticuloFormService {
  createArticuloFormGroup(articulo?: ArticuloFormGroupInput): ArticuloFormGroup {
    const articuloRawValue = {
      ...this.getFormDefaults(),
      ...(articulo ?? { id: null }),
    };

    return new FormGroup<ArticuloFormGroupContent>({
      id: new FormControl(
        { value: articuloRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      descArt: new FormControl(articuloRawValue.descArt, {
        validators: [Validators.required, Validators.maxLength(500)],
      }),
      recetaArt: new FormControl(articuloRawValue.recetaArt, {
        validators: [Validators.maxLength(65000)],
      }),
      unidadGenerarArt: new FormControl(articuloRawValue.unidadGenerarArt, {
        validators: [Validators.min(0)],
      }),
      mermaPreparacionArt: new FormControl(articuloRawValue.mermaPreparacionArt, {
        validators: [Validators.min(0)],
      }),
      pesoArt: new FormControl(articuloRawValue.pesoArt, {
        validators: [Validators.min(0)],
      }),
      presentacionCompraArt: new FormControl(articuloRawValue.presentacionCompraArt, {
        validators: [Validators.min(0)],
      }),
      valorPresentacionArt: new FormControl(articuloRawValue.valorPresentacionArt, {
        validators: [Validators.min(0)],
      }),
      unidadPresentacionArt: new FormControl(articuloRawValue.unidadPresentacionArt, {
        validators: [],
      }),
      tipoArt: new FormControl(articuloRawValue.tipoArt, {
        validators: [Validators.required],
      }),
    });
  }

  getArticulo(form: ArticuloFormGroup): IArticulo | NewArticulo {
    return form.getRawValue();
  }

  resetForm(form: ArticuloFormGroup, articulo: ArticuloFormGroupInput, isIngredient: boolean): void {
    const articuloRawValue = { ...this.getFormDefaults(), ...articulo };
    form.reset({
      ...articuloRawValue,
      id: { value: articuloRawValue.id, disabled: true },
    });
    if (isIngredient) {
      form.get('presentacionCompraArt')?.setValue(0);
      form.get('valorPresentacionArt')?.setValue(0);
    }
  }

  private getFormDefaults(): ArticuloFormDefaults {
    return {
      id: null,
    };
  }
}
