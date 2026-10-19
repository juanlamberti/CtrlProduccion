import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../articulo.test-samples';

import { ArticuloFormService } from './articulo-form.service';

describe('Articulo Form Service', () => {
  let service: ArticuloFormService;

  beforeEach(() => {
    service = TestBed.inject(ArticuloFormService);
  });

  describe('Service methods', () => {
    describe('createArticuloFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createArticuloFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descArt: expect.any(Object),
            recetaArt: expect.any(Object),
            unidadGenerarArt: expect.any(Object),
            mermaPreparacionArt: expect.any(Object),
            pesoArt: expect.any(Object),
            presentacionCompraArt: expect.any(Object),
            valorPresentacionArt: expect.any(Object),
            unidadPresentacionArt: expect.any(Object),
            tipoArt: expect.any(Object),
          }),
        );
      });

      it('passing IArticulo should create a new form with FormGroup', () => {
        const formGroup = service.createArticuloFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            descArt: expect.any(Object),
            recetaArt: expect.any(Object),
            unidadGenerarArt: expect.any(Object),
            mermaPreparacionArt: expect.any(Object),
            pesoArt: expect.any(Object),
            presentacionCompraArt: expect.any(Object),
            valorPresentacionArt: expect.any(Object),
            unidadPresentacionArt: expect.any(Object),
            tipoArt: expect.any(Object),
          }),
        );
      });
    });

    describe('getArticulo', () => {
      it('should return NewArticulo for default Articulo initial value', () => {
        const formGroup = service.createArticuloFormGroup(sampleWithNewData);

        const articulo = service.getArticulo(formGroup);

        expect(articulo).toMatchObject(sampleWithNewData);
      });

      it('should return NewArticulo for empty Articulo initial value', () => {
        const formGroup = service.createArticuloFormGroup();

        const articulo = service.getArticulo(formGroup);

        expect(articulo).toMatchObject({});
      });

      it('should return IArticulo', () => {
        const formGroup = service.createArticuloFormGroup(sampleWithRequiredData);

        const articulo = service.getArticulo(formGroup);

        expect(articulo).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IArticulo should not enable id FormControl', () => {
        const formGroup = service.createArticuloFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewArticulo should disable id FormControl', () => {
        const formGroup = service.createArticuloFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
