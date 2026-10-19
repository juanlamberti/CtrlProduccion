import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../ingrediente.test-samples';

import { IngredienteFormService } from './ingrediente-form.service';

describe('Ingrediente Form Service', () => {
  let service: IngredienteFormService;

  beforeEach(() => {
    service = TestBed.inject(IngredienteFormService);
  });

  describe('Service methods', () => {
    describe('createIngredienteFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createIngredienteFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cantidadIng: expect.any(Object),
            articulo: expect.any(Object),
            insumo: expect.any(Object),
          }),
        );
      });

      it('passing IIngrediente should create a new form with FormGroup', () => {
        const formGroup = service.createIngredienteFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            cantidadIng: expect.any(Object),
            articulo: expect.any(Object),
            insumo: expect.any(Object),
          }),
        );
      });
    });

    describe('getIngrediente', () => {
      it('should return NewIngrediente for default Ingrediente initial value', () => {
        const formGroup = service.createIngredienteFormGroup(sampleWithNewData);

        const ingrediente = service.getIngrediente(formGroup);

        expect(ingrediente).toMatchObject(sampleWithNewData);
      });

      it('should return NewIngrediente for empty Ingrediente initial value', () => {
        const formGroup = service.createIngredienteFormGroup();

        const ingrediente = service.getIngrediente(formGroup);

        expect(ingrediente).toMatchObject({});
      });

      it('should return IIngrediente', () => {
        const formGroup = service.createIngredienteFormGroup(sampleWithRequiredData);

        const ingrediente = service.getIngrediente(formGroup);

        expect(ingrediente).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IIngrediente should not enable id FormControl', () => {
        const formGroup = service.createIngredienteFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewIngrediente should disable id FormControl', () => {
        const formGroup = service.createIngredienteFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
