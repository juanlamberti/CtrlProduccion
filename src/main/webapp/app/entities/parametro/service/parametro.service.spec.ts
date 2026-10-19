import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IParametro } from '../parametro.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../parametro.test-samples';

import { ParametroService } from './parametro.service';

const requireRestSample: IParametro = {
  ...sampleWithRequiredData,
};

describe('Parametro Service', () => {
  let service: ParametroService;
  let httpMock: HttpTestingController;
  let expectedResult: IParametro | IParametro[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(ParametroService);
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

    it('should create a Parametro', () => {
      const parametro = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(parametro).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Parametro', () => {
      const parametro = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(parametro).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Parametro', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Parametro', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Parametro', () => {
      service.delete(123).subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests).toHaveLength(1);
    });

    describe('addParametroToCollectionIfMissing', () => {
      it('should add a Parametro to an empty array', () => {
        const parametro: IParametro = sampleWithRequiredData;
        expectedResult = service.addParametroToCollectionIfMissing([], parametro);
        expect(expectedResult).toEqual([parametro]);
      });

      it('should not add a Parametro to an array that contains it', () => {
        const parametro: IParametro = sampleWithRequiredData;
        const parametroCollection: IParametro[] = [
          {
            ...parametro,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addParametroToCollectionIfMissing(parametroCollection, parametro);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Parametro to an array that doesn't contain it", () => {
        const parametro: IParametro = sampleWithRequiredData;
        const parametroCollection: IParametro[] = [sampleWithPartialData];
        expectedResult = service.addParametroToCollectionIfMissing(parametroCollection, parametro);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(parametro);
      });

      it('should add only unique Parametro to an array', () => {
        const parametroArray: IParametro[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const parametroCollection: IParametro[] = [sampleWithRequiredData];
        expectedResult = service.addParametroToCollectionIfMissing(parametroCollection, ...parametroArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const parametro: IParametro = sampleWithRequiredData;
        const parametro2: IParametro = sampleWithPartialData;
        expectedResult = service.addParametroToCollectionIfMissing([], parametro, parametro2);
        expect(expectedResult).toEqual([parametro, parametro2]);
      });

      it('should accept null and undefined values', () => {
        const parametro: IParametro = sampleWithRequiredData;
        expectedResult = service.addParametroToCollectionIfMissing([], null, parametro, undefined);
        expect(expectedResult).toEqual([parametro]);
      });

      it('should return initial array if no Parametro is added', () => {
        const parametroCollection: IParametro[] = [sampleWithRequiredData];
        expectedResult = service.addParametroToCollectionIfMissing(parametroCollection, undefined, null);
        expect(expectedResult).toEqual(parametroCollection);
      });
    });

    describe('compareParametro', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareParametro(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 28317 };
        const entity2 = null;

        const compareResult1 = service.compareParametro(entity1, entity2);
        const compareResult2 = service.compareParametro(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 28317 };
        const entity2 = { id: 8891 };

        const compareResult1 = service.compareParametro(entity1, entity2);
        const compareResult2 = service.compareParametro(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return true if primaryKey matches', () => {
        const entity1 = { id: 28317 };
        const entity2 = { id: 28317 };

        const compareResult1 = service.compareParametro(entity1, entity2);
        const compareResult2 = service.compareParametro(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
