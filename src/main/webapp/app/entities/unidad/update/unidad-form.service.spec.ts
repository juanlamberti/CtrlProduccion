import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../unidad.test-samples';

import { UnidadFormService } from './unidad-form.service';

describe('Unidad Form Service', () => {
  let service: UnidadFormService;

  beforeEach(() => {
    service = TestBed.inject(UnidadFormService);
  });

  describe('Service methods', () => {
    describe('createUnidadFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createUnidadFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descUni: expect.any(Object),
          }),
        );
      });

      it('passing IUnidad should create a new form with FormGroup', () => {
        const formGroup = service.createUnidadFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descUni: expect.any(Object),
          }),
        );
      });
    });

    describe('getUnidad', () => {
      it('should return NewUnidad for default Unidad initial value', () => {
        const formGroup = service.createUnidadFormGroup(sampleWithNewData);

        const unidad = service.getUnidad(formGroup);

        expect(unidad).toMatchObject(sampleWithNewData);
      });

      it('should return NewUnidad for empty Unidad initial value', () => {
        const formGroup = service.createUnidadFormGroup();

        const unidad = service.getUnidad(formGroup);

        expect(unidad).toMatchObject({});
      });

      it('should return IUnidad', () => {
        const formGroup = service.createUnidadFormGroup(sampleWithRequiredData);

        const unidad = service.getUnidad(formGroup);

        expect(unidad).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IUnidad should not enable id FormControl', () => {
        const formGroup = service.createUnidadFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewUnidad should disable id FormControl', () => {
        const formGroup = service.createUnidadFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
