import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IArticulo } from '../articulo.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../articulo.test-samples';

import { ArticuloService } from './articulo.service';

const requireRestSample: IArticulo = {
  ...sampleWithRequiredData,
};

describe('Articulo Service', () => {
  let service: ArticuloService;
  let httpMock: HttpTestingController;
  let expectedResult: IArticulo | IArticulo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(ArticuloService);
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

    it('should create a Articulo', () => {
      const articulo = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(articulo).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Articulo', () => {
      const articulo = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(articulo).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Articulo', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Articulo', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Articulo', () => {
      service.delete(123).subscribe();

      const requests = httpMock.match({ method: 'DELETE' });
      expect(requests).toHaveLength(1);
    });

    describe('addArticuloToCollectionIfMissing', () => {
      it('should add a Articulo to an empty array', () => {
        const articulo: IArticulo = sampleWithRequiredData;
        expectedResult = service.addArticuloToCollectionIfMissing([], articulo);
        expect(expectedResult).toEqual([articulo]);
      });

      it('should not add a Articulo to an array that contains it', () => {
        const articulo: IArticulo = sampleWithRequiredData;
        const articuloCollection: IArticulo[] = [
          {
            ...articulo,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addArticuloToCollectionIfMissing(articuloCollection, articulo);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Articulo to an array that doesn't contain it", () => {
        const articulo: IArticulo = sampleWithRequiredData;
        const articuloCollection: IArticulo[] = [sampleWithPartialData];
        expectedResult = service.addArticuloToCollectionIfMissing(articuloCollection, articulo);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(articulo);
      });

      it('should add only unique Articulo to an array', () => {
        const articuloArray: IArticulo[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const articuloCollection: IArticulo[] = [sampleWithRequiredData];
        expectedResult = service.addArticuloToCollectionIfMissing(articuloCollection, ...articuloArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const articulo: IArticulo = sampleWithRequiredData;
        const articulo2: IArticulo = sampleWithPartialData;
        expectedResult = service.addArticuloToCollectionIfMissing([], articulo, articulo2);
        expect(expectedResult).toEqual([articulo, articulo2]);
      });

      it('should accept null and undefined values', () => {
        const articulo: IArticulo = sampleWithRequiredData;
        expectedResult = service.addArticuloToCollectionIfMissing([], null, articulo, undefined);
        expect(expectedResult).toEqual([articulo]);
      });

      it('should return initial array if no Articulo is added', () => {
        const articuloCollection: IArticulo[] = [sampleWithRequiredData];
        expectedResult = service.addArticuloToCollectionIfMissing(articuloCollection, undefined, null);
        expect(expectedResult).toEqual(articuloCollection);
      });
    });

    describe('compareArticulo', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareArticulo(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 19822 };
        const entity2 = null;

        const compareResult1 = service.compareArticulo(entity1, entity2);
        const compareResult2 = service.compareArticulo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 19822 };
        const entity2 = { id: 15905 };

        const compareResult1 = service.compareArticulo(entity1, entity2);
        const compareResult2 = service.compareArticulo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return true if primaryKey matches', () => {
        const entity1 = { id: 19822 };
        const entity2 = { id: 19822 };

        const compareResult1 = service.compareArticulo(entity1, entity2);
        const compareResult2 = service.compareArticulo(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
