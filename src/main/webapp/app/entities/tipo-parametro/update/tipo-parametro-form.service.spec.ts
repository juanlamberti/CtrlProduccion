import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../tipo-parametro.test-samples';

import { TipoParametroFormService } from './tipo-parametro-form.service';

describe('TipoParametro Form Service', () => {
  let service: TipoParametroFormService;

  beforeEach(() => {
    service = TestBed.inject(TipoParametroFormService);
  });

  describe('Service methods', () => {
    describe('createTipoParametroFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTipoParametroFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigoTpParam: expect.any(Object),
            descTpParam: expect.any(Object),
          }),
        );
      });

      it('passing ITipoParametro should create a new form with FormGroup', () => {
        const formGroup = service.createTipoParametroFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codigoTpParam: expect.any(Object),
            descTpParam: expect.any(Object),
          }),
        );
      });
    });

    describe('getTipoParametro', () => {
      it('should return NewTipoParametro for default TipoParametro initial value', () => {
        const formGroup = service.createTipoParametroFormGroup(sampleWithNewData);

        const tipoParametro = service.getTipoParametro(formGroup);

        expect(tipoParametro).toMatchObject(sampleWithNewData);
      });

      it('should return NewTipoParametro for empty TipoParametro initial value', () => {
        const formGroup = service.createTipoParametroFormGroup();

        const tipoParametro = service.getTipoParametro(formGroup);

        expect(tipoParametro).toMatchObject({});
      });

      it('should return ITipoParametro', () => {
        const formGroup = service.createTipoParametroFormGroup(sampleWithRequiredData);

        const tipoParametro = service.getTipoParametro(formGroup);

        expect(tipoParametro).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITipoParametro should not enable id FormControl', () => {
        const formGroup = service.createTipoParametroFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTipoParametro should disable id FormControl', () => {
        const formGroup = service.createTipoParametroFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
