import { beforeEach, describe, expect, it, vi } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { provideTranslateService } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { TipoArticuloService } from 'app/entities/tipo-articulo/service/tipo-articulo.service';
import { ITipoArticulo } from 'app/entities/tipo-articulo/tipo-articulo.model';
import { UnidadService } from 'app/entities/unidad/service/unidad.service';
import { IUnidad } from 'app/entities/unidad/unidad.model';
import { IArticulo } from '../articulo.model';
import { ArticuloService } from '../service/articulo.service';

import { ArticuloFormService } from './articulo-form.service';
import { ArticuloUpdate } from './articulo-update';

describe('Articulo Management Update Component', () => {
  let comp: ArticuloUpdate;
  let fixture: ComponentFixture<ArticuloUpdate>;
  let activatedRoute: ActivatedRoute;
  let articuloFormService: ArticuloFormService;
  let articuloService: ArticuloService;
  let unidadService: UnidadService;
  let tipoArticuloService: TipoArticuloService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideTranslateService(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(ArticuloUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    articuloFormService = TestBed.inject(ArticuloFormService);
    articuloService = TestBed.inject(ArticuloService);
    unidadService = TestBed.inject(UnidadService);
    tipoArticuloService = TestBed.inject(TipoArticuloService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Unidad query and add missing value', () => {
      const articulo: IArticulo = { id: 15905 };
      const unidadPresentacionArt: IUnidad = { id: 26699 };
      articulo.unidadPresentacionArt = unidadPresentacionArt;

      const unidadCollection: IUnidad[] = [{ id: 26699 }];
      vi.spyOn(unidadService, 'query').mockReturnValue(of(new HttpResponse({ body: unidadCollection })));
      const additionalUnidads = [unidadPresentacionArt];
      const expectedCollection: IUnidad[] = [...additionalUnidads, ...unidadCollection];
      vi.spyOn(unidadService, 'addUnidadToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ articulo });
      comp.ngOnInit();

      expect(unidadService.query).toHaveBeenCalled();
      expect(unidadService.addUnidadToCollectionIfMissing).toHaveBeenCalledWith(
        unidadCollection,
        ...additionalUnidads.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.unidadsSharedCollection()).toEqual(expectedCollection);
    });

    it('should call TipoArticulo query and add missing value', () => {
      const articulo: IArticulo = { id: 15905 };
      const tipoArt: ITipoArticulo = { id: 18919 };
      articulo.tipoArt = tipoArt;

      const tipoArticuloCollection: ITipoArticulo[] = [{ id: 18919 }];
      vi.spyOn(tipoArticuloService, 'query').mockReturnValue(of(new HttpResponse({ body: tipoArticuloCollection })));
      const additionalTipoArticulos = [tipoArt];
      const expectedCollection: ITipoArticulo[] = [...additionalTipoArticulos, ...tipoArticuloCollection];
      vi.spyOn(tipoArticuloService, 'addTipoArticuloToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ articulo });
      comp.ngOnInit();

      expect(tipoArticuloService.query).toHaveBeenCalled();
      expect(tipoArticuloService.addTipoArticuloToCollectionIfMissing).toHaveBeenCalledWith(
        tipoArticuloCollection,
        ...additionalTipoArticulos.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.tipoArticulosSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const articulo: IArticulo = { id: 15905 };
      const unidadPresentacionArt: IUnidad = { id: 26699 };
      articulo.unidadPresentacionArt = unidadPresentacionArt;
      const tipoArt: ITipoArticulo = { id: 18919 };
      articulo.tipoArt = tipoArt;

      activatedRoute.data = of({ articulo });
      comp.ngOnInit();

      expect(comp.unidadsSharedCollection()).toContainEqual(unidadPresentacionArt);
      expect(comp.tipoArticulosSharedCollection()).toContainEqual(tipoArt);
      expect(comp.articulo).toEqual(articulo);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IArticulo>();
      const articulo = { id: 19822 };
      vi.spyOn(articuloFormService, 'getArticulo').mockReturnValue(articulo);
      vi.spyOn(articuloService, 'update').mockReturnValue(saveSubject);
      vi.spyOn(comp, 'previousState');
      activatedRoute.data = of({ articulo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(articulo);
      saveSubject.complete();

      // THEN
      expect(articuloFormService.getArticulo).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(articuloService.update).toHaveBeenCalledWith(expect.objectContaining(articulo));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IArticulo>();
      const articulo = { id: 19822 };
      vi.spyOn(articuloFormService, 'getArticulo').mockReturnValue({ id: null });
      vi.spyOn(articuloService, 'create').mockReturnValue(saveSubject);
      vi.spyOn(comp, 'previousState');
      activatedRoute.data = of({ articulo: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(articulo);
      saveSubject.complete();

      // THEN
      expect(articuloFormService.getArticulo).toHaveBeenCalled();
      expect(articuloService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IArticulo>();
      const articulo = { id: 19822 };
      vi.spyOn(articuloService, 'update').mockReturnValue(saveSubject);
      vi.spyOn(comp, 'previousState');
      activatedRoute.data = of({ articulo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(articuloService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareUnidad', () => {
      it('should forward to unidadService', () => {
        const entity = { id: 26699 };
        const entity2 = { id: 5034 };
        vi.spyOn(unidadService, 'compareUnidad');
        comp.compareUnidad(entity, entity2);
        expect(unidadService.compareUnidad).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareTipoArticulo', () => {
      it('should forward to tipoArticuloService', () => {
        const entity = { id: 18919 };
        const entity2 = { id: 16472 };
        vi.spyOn(tipoArticuloService, 'compareTipoArticulo');
        comp.compareTipoArticulo(entity, entity2);
        expect(tipoArticuloService.compareTipoArticulo).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
