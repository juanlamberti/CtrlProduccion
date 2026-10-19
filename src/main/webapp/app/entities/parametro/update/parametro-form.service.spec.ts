import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../parametro.test-samples';

import { ParametroFormService } from './parametro-form.service';

describe('Parametro Form Service', () => {
  let service: ParametroFormService;

  beforeEach(() => {
    service = TestBed.inject(ParametroFormService);
  });

  describe('Service methods', () => {
    describe('createParametroFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createParametroFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigoParam: expect.any(Object),
            descParam: expect.any(Object),
            valorParam: expect.any(Object),
            archivoParam: expect.any(Object),
            editCteSNParam: expect.any(Object),
            tipo: expect.any(Object),
          }),
        );
      });

      it('passing IParametro should create a new form with FormGroup', () => {
        const formGroup = service.createParametroFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigoParam: expect.any(Object),
            descParam: expect.any(Object),
            valorParam: expect.any(Object),
            archivoParam: expect.any(Object),
            editCteSNParam: expect.any(Object),
            tipo: expect.any(Object),
          }),
        );
      });
    });

    describe('getParametro', () => {
      it('should return NewParametro for default Parametro initial value', () => {
        const formGroup = service.createParametroFormGroup(sampleWithNewData);

        const parametro = service.getParametro(formGroup);

        expect(parametro).toMatchObject(sampleWithNewData);
      });

      it('should return NewParametro for empty Parametro initial value', () => {
        const formGroup = service.createParametroFormGroup();

        const parametro = service.getParametro(formGroup);

        expect(parametro).toMatchObject({});
      });

      it('should return IParametro', () => {
        const formGroup = service.createParametroFormGroup(sampleWithRequiredData);

        const parametro = service.getParametro(formGroup);

        expect(parametro).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IParametro should not enable id FormControl', () => {
        const formGroup = service.createParametroFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewParametro should disable id FormControl', () => {
        const formGroup = service.createParametroFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
