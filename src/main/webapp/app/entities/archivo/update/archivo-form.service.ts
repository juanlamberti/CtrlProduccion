import { Service } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IArchivo, NewArchivo } from '../archivo.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IArchivo for edit and NewArchivoFormGroupInput for create.
 */
type ArchivoFormGroupInput = IArchivo | PartialWithRequiredKeyOf<NewArchivo>;

type ArchivoFormDefaults = Pick<NewArchivo, 'id'>;

type ArchivoFormGroupContent = {
  id: FormControl<IArchivo['id'] | NewArchivo['id']>;
  nombreArc: FormControl<IArchivo['nombreArc']>;
  estadoArc: FormControl<IArchivo['estadoArc']>;
  tipoArc: FormControl<IArchivo['tipoArc']>;
  archivoArc: FormControl<IArchivo['archivoArc']>;
  archivoArcContentType: FormControl<IArchivo['archivoArcContentType']>;
};

export type ArchivoFormGroup = FormGroup<ArchivoFormGroupContent>;

@Service()
export class ArchivoFormService {
  createArchivoFormGroup(archivo?: ArchivoFormGroupInput): ArchivoFormGroup {
    const archivoRawValue = {
      ...this.getFormDefaults(),
      ...(archivo ?? { id: null }),
    };

    return new FormGroup<ArchivoFormGroupContent>({
      id: new FormControl(
        { value: archivoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      nombreArc: new FormControl(archivoRawValue.nombreArc, {
        validators: [Validators.required, Validators.maxLength(1000)],
      }),
      estadoArc: new FormControl(archivoRawValue.estadoArc, {
        validators: [Validators.required, Validators.maxLength(20)],
      }),
      tipoArc: new FormControl(archivoRawValue.tipoArc, {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      archivoArc: new FormControl(archivoRawValue.archivoArc, {
        validators: [Validators.required],
      }),
      archivoArcContentType: new FormControl(archivoRawValue.archivoArcContentType),
    });
  }

  getArchivo(form: ArchivoFormGroup): IArchivo | NewArchivo {
    return form.getRawValue();
  }

  resetForm(form: ArchivoFormGroup, archivo: ArchivoFormGroupInput): void {
    const archivoRawValue = { ...this.getFormDefaults(), ...archivo };
    form.reset({
      ...archivoRawValue,
      id: { value: archivoRawValue.id, disabled: true },
    });
  }

  private getFormDefaults(): ArchivoFormDefaults {
    return {
      id: null,
    };
  }
}
