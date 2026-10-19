import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IUnidad } from '../unidad.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../unidad.test-samples';

import { UnidadService } from './unidad.service';

const requireRestSample: IUnidad = {
  ...sampleWithRequiredData,
};

describe('Unidad Service', () => {
  let service: UnidadService;
  let httpMock: HttpTestingController;
  let expectedResult: IUnidad | IUnidad[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(UnidadService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Unidad', () => {
      const unidad = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(unidad).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Unidad', () => {
      const unidad = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(unidad).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Unidad', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Unidad', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Unidad', () => {
      service.delete(123).subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests).toHaveLength(1);
    });

    describe('addUnidadToCollectionIfMissing', () => {
      it('should add a Unidad to an empty array', () => {
        const unidad: IUnidad = sampleWithRequiredData;
        expectedResult = service.addUnidadToCollectionIfMissing([], unidad);
        expect(expectedResult).toEqual([unidad]);
      });

      it('should not add a Unidad to an array that contains it', () => {
        const unidad: IUnidad = sampleWithRequiredData;
        const unidadCollection: IUnidad[] = [
          {
            ...unidad,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addUnidadToCollectionIfMissing(unidadCollection, unidad);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Unidad to an array that doesn't contain it", () => {
        const unidad: IUnidad = sampleWithRequiredData;
        const unidadCollection: IUnidad[] = [sampleWithPartialData];
        expectedResult = service.addUnidadToCollectionIfMissing(unidadCollection, unidad);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(unidad);
      });

      it('should add only unique Unidad to an array', () => {
        const unidadArray: IUnidad[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const unidadCollection: IUnidad[] = [sampleWithRequiredData];
        expectedResult = service.addUnidadToCollectionIfMissing(unidadCollection, ...unidadArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const unidad: IUnidad = sampleWithRequiredData;
        const unidad2: IUnidad = sampleWithPartialData;
        expectedResult = service.addUnidadToCollectionIfMissing([], unidad, unidad2);
        expect(expectedResult).toEqual([unidad, unidad2]);
      });

      it('should accept null and undefined values', () => {
        const unidad: IUnidad = sampleWithRequiredData;
        expectedResult = service.addUnidadToCollectionIfMissing([], null, unidad, undefined);
        expect(expectedResult).toEqual([unidad]);
      });

      it('should return initial array if no Unidad is added', () => {
        const unidadCollection: IUnidad[] = [sampleWithRequiredData];
        expectedResult = service.addUnidadToCollectionIfMissing(unidadCollection, undefined, null);
        expect(expectedResult).toEqual(unidadCollection);
      });
    });

    describe('compareUnidad', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareUnidad(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 26699 };
        const entity2 = null;

        const compareResult1 = service.compareUnidad(entity1, entity2);
        const compareResult2 = service.compareUnidad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 26699 };
        const entity2 = { id: 5034 };

        const compareResult1 = service.compareUnidad(entity1, entity2);
        const compareResult2 = service.compareUnidad(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return true if primaryKey matches', () => {
        const entity1 = { id: 26699 };
        const entity2 = { id: 26699 };

        const compareResult1 = service.compareUnidad(entity1, entity2);
        const compareResult2 = service.compareUnidad(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
