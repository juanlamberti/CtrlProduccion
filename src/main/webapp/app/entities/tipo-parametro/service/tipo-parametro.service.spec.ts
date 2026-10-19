import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ITipoParametro } from '../tipo-parametro.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../tipo-parametro.test-samples';

import { TipoParametroService } from './tipo-parametro.service';

const requireRestSample: ITipoParametro = {
  ...sampleWithRequiredData,
};

describe('TipoParametro Service', () => {
  let service: TipoParametroService;
  let httpMock: HttpTestingController;
  let expectedResult: ITipoParametro | ITipoParametro[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(TipoParametroService);
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

    it('should create a TipoParametro', () => {
      const tipoParametro = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(tipoParametro).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TipoParametro', () => {
      const tipoParametro = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(tipoParametro).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TipoParametro', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TipoParametro', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TipoParametro', () => {
      service.delete(123).subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests).toHaveLength(1);
    });

    describe('addTipoParametroToCollectionIfMissing', () => {
      it('should add a TipoParametro to an empty array', () => {
        const tipoParametro: ITipoParametro = sampleWithRequiredData;
        expectedResult = service.addTipoParametroToCollectionIfMissing([], tipoParametro);
        expect(expectedResult).toEqual([tipoParametro]);
      });

      it('should not add a TipoParametro to an array that contains it', () => {
        const tipoParametro: ITipoParametro = sampleWithRequiredData;
        const tipoParametroCollection: ITipoParametro[] = [
          {
            ...tipoParametro,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTipoParametroToCollectionIfMissing(tipoParametroCollection, tipoParametro);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TipoParametro to an array that doesn't contain it", () => {
        const tipoParametro: ITipoParametro = sampleWithRequiredData;
        const tipoParametroCollection: ITipoParametro[] = [sampleWithPartialData];
        expectedResult = service.addTipoParametroToCollectionIfMissing(tipoParametroCollection, tipoParametro);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoParametro);
      });

      it('should add only unique TipoParametro to an array', () => {
        const tipoParametroArray: ITipoParametro[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const tipoParametroCollection: ITipoParametro[] = [sampleWithRequiredData];
        expectedResult = service.addTipoParametroToCollectionIfMissing(tipoParametroCollection, ...tipoParametroArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tipoParametro: ITipoParametro = sampleWithRequiredData;
        const tipoParametro2: ITipoParametro = sampleWithPartialData;
        expectedResult = service.addTipoParametroToCollectionIfMissing([], tipoParametro, tipoParametro2);
        expect(expectedResult).toEqual([tipoParametro, tipoParametro2]);
      });

      it('should accept null and undefined values', () => {
        const tipoParametro: ITipoParametro = sampleWithRequiredData;
        expectedResult = service.addTipoParametroToCollectionIfMissing([], null, tipoParametro, undefined);
        expect(expectedResult).toEqual([tipoParametro]);
      });

      it('should return initial array if no TipoParametro is added', () => {
        const tipoParametroCollection: ITipoParametro[] = [sampleWithRequiredData];
        expectedResult = service.addTipoParametroToCollectionIfMissing(tipoParametroCollection, undefined, null);
        expect(expectedResult).toEqual(tipoParametroCollection);
      });
    });

    describe('compareTipoParametro', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTipoParametro(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 25905 };
        const entity2 = null;

        const compareResult1 = service.compareTipoParametro(entity1, entity2);
        const compareResult2 = service.compareTipoParametro(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 25905 };
        const entity2 = { id: 18067 };

        const compareResult1 = service.compareTipoParametro(entity1, entity2);
        const compareResult2 = service.compareTipoParametro(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return true if primaryKey matches', () => {
        const entity1 = { id: 25905 };
        const entity2 = { id: 25905 };

        const compareResult1 = service.compareTipoParametro(entity1, entity2);
        const compareResult2 = service.compareTipoParametro(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
