import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ITipoArticulo } from '../tipo-articulo.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../tipo-articulo.test-samples';

import { TipoArticuloService } from './tipo-articulo.service';

const requireRestSample: ITipoArticulo = {
  ...sampleWithRequiredData,
};

describe('TipoArticulo Service', () => {
  let service: TipoArticuloService;
  let httpMock: HttpTestingController;
  let expectedResult: ITipoArticulo | ITipoArticulo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(TipoArticuloService);
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

    it('should create a TipoArticulo', () => {
      const tipoArticulo = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(tipoArticulo).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TipoArticulo', () => {
      const tipoArticulo = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(tipoArticulo).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TipoArticulo', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TipoArticulo', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a TipoArticulo', () => {
      service.delete(123).subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests).toHaveLength(1);
    });

    describe('addTipoArticuloToCollectionIfMissing', () => {
      it('should add a TipoArticulo to an empty array', () => {
        const tipoArticulo: ITipoArticulo = sampleWithRequiredData;
        expectedResult = service.addTipoArticuloToCollectionIfMissing([], tipoArticulo);
        expect(expectedResult).toEqual([tipoArticulo]);
      });

      it('should not add a TipoArticulo to an array that contains it', () => {
        const tipoArticulo: ITipoArticulo = sampleWithRequiredData;
        const tipoArticuloCollection: ITipoArticulo[] = [
          {
            ...tipoArticulo,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTipoArticuloToCollectionIfMissing(tipoArticuloCollection, tipoArticulo);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TipoArticulo to an array that doesn't contain it", () => {
        const tipoArticulo: ITipoArticulo = sampleWithRequiredData;
        const tipoArticuloCollection: ITipoArticulo[] = [sampleWithPartialData];
        expectedResult = service.addTipoArticuloToCollectionIfMissing(tipoArticuloCollection, tipoArticulo);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(tipoArticulo);
      });

      it('should add only unique TipoArticulo to an array', () => {
        const tipoArticuloArray: ITipoArticulo[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const tipoArticuloCollection: ITipoArticulo[] = [sampleWithRequiredData];
        expectedResult = service.addTipoArticuloToCollectionIfMissing(tipoArticuloCollection, ...tipoArticuloArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const tipoArticulo: ITipoArticulo = sampleWithRequiredData;
        const tipoArticulo2: ITipoArticulo = sampleWithPartialData;
        expectedResult = service.addTipoArticuloToCollectionIfMissing([], tipoArticulo, tipoArticulo2);
        expect(expectedResult).toEqual([tipoArticulo, tipoArticulo2]);
      });

      it('should accept null and undefined values', () => {
        const tipoArticulo: ITipoArticulo = sampleWithRequiredData;
        expectedResult = service.addTipoArticuloToCollectionIfMissing([], null, tipoArticulo, undefined);
        expect(expectedResult).toEqual([tipoArticulo]);
      });

      it('should return initial array if no TipoArticulo is added', () => {
        const tipoArticuloCollection: ITipoArticulo[] = [sampleWithRequiredData];
        expectedResult = service.addTipoArticuloToCollectionIfMissing(tipoArticuloCollection, undefined, null);
        expect(expectedResult).toEqual(tipoArticuloCollection);
      });
    });

    describe('compareTipoArticulo', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTipoArticulo(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 18919 };
        const entity2 = null;

        const compareResult1 = service.compareTipoArticulo(entity1, entity2);
        const compareResult2 = service.compareTipoArticulo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 18919 };
        const entity2 = { id: 16472 };

        const compareResult1 = service.compareTipoArticulo(entity1, entity2);
        const compareResult2 = service.compareTipoArticulo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return true if primaryKey matches', () => {
        const entity1 = { id: 18919 };
        const entity2 = { id: 18919 };

        const compareResult1 = service.compareTipoArticulo(entity1, entity2);
        const compareResult2 = service.compareTipoArticulo(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
