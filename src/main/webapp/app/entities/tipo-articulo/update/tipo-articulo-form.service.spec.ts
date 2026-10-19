import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../tipo-articulo.test-samples';

import { TipoArticuloFormService } from './tipo-articulo-form.service';

describe('TipoArticulo Form Service', () => {
  let service: TipoArticuloFormService;

  beforeEach(() => {
    service = TestBed.inject(TipoArticuloFormService);
  });

  describe('Service methods', () => {
    describe('createTipoArticuloFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTipoArticuloFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descTpArt: expect.any(Object),
          }),
        );
      });

      it('passing ITipoArticulo should create a new form with FormGroup', () => {
        const formGroup = service.createTipoArticuloFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descTpArt: expect.any(Object),
          }),
        );
      });
    });

    describe('getTipoArticulo', () => {
      it('should return NewTipoArticulo for default TipoArticulo initial value', () => {
        const formGroup = service.createTipoArticuloFormGroup(sampleWithNewData);

        const tipoArticulo = service.getTipoArticulo(formGroup);

        expect(tipoArticulo).toMatchObject(sampleWithNewData);
      });

      it('should return NewTipoArticulo for empty TipoArticulo initial value', () => {
        const formGroup = service.createTipoArticuloFormGroup();

        const tipoArticulo = service.getTipoArticulo(formGroup);

        expect(tipoArticulo).toMatchObject({});
      });

      it('should return ITipoArticulo', () => {
        const formGroup = service.createTipoArticuloFormGroup(sampleWithRequiredData);

        const tipoArticulo = service.getTipoArticulo(formGroup);

        expect(tipoArticulo).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITipoArticulo should not enable id FormControl', () => {
        const formGroup = service.createTipoArticuloFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTipoArticulo should disable id FormControl', () => {
        const formGroup = service.createTipoArticuloFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
