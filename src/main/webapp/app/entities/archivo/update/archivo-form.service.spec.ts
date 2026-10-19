import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../archivo.test-samples';

import { ArchivoFormService } from './archivo-form.service';

describe('Archivo Form Service', () => {
  let service: ArchivoFormService;

  beforeEach(() => {
    service = TestBed.inject(ArchivoFormService);
  });

  describe('Service methods', () => {
    describe('createArchivoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createArchivoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombreArc: expect.any(Object),
            estadoArc: expect.any(Object),
            tipoArc: expect.any(Object),
            archivoArc: expect.any(Object),
          }),
        );
      });

      it('passing IArchivo should create a new form with FormGroup', () => {
        const formGroup = service.createArchivoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            nombreArc: expect.any(Object),
            estadoArc: expect.any(Object),
            tipoArc: expect.any(Object),
            archivoArc: expect.any(Object),
          }),
        );
      });
    });

    describe('getArchivo', () => {
      it('should return NewArchivo for default Archivo initial value', () => {
        const formGroup = service.createArchivoFormGroup(sampleWithNewData);

        const archivo = service.getArchivo(formGroup);

        expect(archivo).toMatchObject(sampleWithNewData);
      });

      it('should return NewArchivo for empty Archivo initial value', () => {
        const formGroup = service.createArchivoFormGroup();

        const archivo = service.getArchivo(formGroup);

        expect(archivo).toMatchObject({});
      });

      it('should return IArchivo', () => {
        const formGroup = service.createArchivoFormGroup(sampleWithRequiredData);

        const archivo = service.getArchivo(formGroup);

        expect(archivo).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IArchivo should not enable id FormControl', () => {
        const formGroup = service.createArchivoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewArchivo should disable id FormControl', () => {
        const formGroup = service.createArchivoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
