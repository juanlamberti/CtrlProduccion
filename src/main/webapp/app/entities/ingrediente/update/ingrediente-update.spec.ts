import { beforeEach, describe, expect, it, vi } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { provideTranslateService } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { IArticulo } from 'app/entities/articulo/articulo.model';
import { ArticuloService } from 'app/entities/articulo/service/articulo.service';
import { IIngrediente } from '../ingrediente.model';
import { IngredienteService } from '../service/ingrediente.service';

import { IngredienteFormService } from './ingrediente-form.service';
import { IngredienteUpdate } from './ingrediente-update';

describe('Ingrediente Management Update Component', () => {
  let comp: IngredienteUpdate;
  let fixture: ComponentFixture<IngredienteUpdate>;
  let activatedRoute: ActivatedRoute;
  let ingredienteFormService: IngredienteFormService;
  let ingredienteService: IngredienteService;
  let articuloService: ArticuloService;

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

    fixture = TestBed.createComponent(IngredienteUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    ingredienteFormService = TestBed.inject(IngredienteFormService);
    ingredienteService = TestBed.inject(IngredienteService);
    articuloService = TestBed.inject(ArticuloService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Articulo query and add missing value', () => {
      const ingrediente: IIngrediente = { id: 22955 };
      const articulo: IArticulo = { id: 19822 };
      ingrediente.articulo = articulo;
      const insumo: IArticulo = { id: 19822 };
      ingrediente.insumo = insumo;

      const articuloCollection: IArticulo[] = [{ id: 19822 }];
      vi.spyOn(articuloService, 'query').mockReturnValue(of(new HttpResponse({ body: articuloCollection })));
      const additionalArticulos = [articulo, insumo];
      const expectedCollection: IArticulo[] = [...additionalArticulos, ...articuloCollection];
      vi.spyOn(articuloService, 'addArticuloToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ ingrediente });
      comp.ngOnInit();

      expect(articuloService.query).toHaveBeenCalled();
      expect(articuloService.addArticuloToCollectionIfMissing).toHaveBeenCalledWith(
        articuloCollection,
        ...additionalArticulos.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.articulosSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const ingrediente: IIngrediente = { id: 22955 };
      const articulo: IArticulo = { id: 19822 };
      ingrediente.articulo = articulo;
      const insumo: IArticulo = { id: 19822 };
      ingrediente.insumo = insumo;

      activatedRoute.data = of({ ingrediente });
      comp.ngOnInit();

      expect(comp.articulosSharedCollection()).toContainEqual(articulo);
      expect(comp.articulosSharedCollection()).toContainEqual(insumo);
      expect(comp.ingrediente).toEqual(ingrediente);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IIngrediente>();
      const ingrediente = { id: 19536 };
      vi.spyOn(ingredienteFormService, 'getIngrediente').mockReturnValue(ingrediente);
      vi.spyOn(ingredienteService, 'update').mockReturnValue(saveSubject);
      vi.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ingrediente });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(ingrediente);
      saveSubject.complete();

      // THEN
      expect(ingredienteFormService.getIngrediente).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(ingredienteService.update).toHaveBeenCalledWith(expect.objectContaining(ingrediente));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IIngrediente>();
      const ingrediente = { id: 19536 };
      vi.spyOn(ingredienteFormService, 'getIngrediente').mockReturnValue({ id: null });
      vi.spyOn(ingredienteService, 'create').mockReturnValue(saveSubject);
      vi.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ingrediente: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(ingrediente);
      saveSubject.complete();

      // THEN
      expect(ingredienteFormService.getIngrediente).toHaveBeenCalled();
      expect(ingredienteService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IIngrediente>();
      const ingrediente = { id: 19536 };
      vi.spyOn(ingredienteService, 'update').mockReturnValue(saveSubject);
      vi.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ingrediente });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(ingredienteService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareArticulo', () => {
      it('should forward to articuloService', () => {
        const entity = { id: 19822 };
        const entity2 = { id: 15905 };
        vi.spyOn(articuloService, 'compareArticulo');
        comp.compareArticulo(entity, entity2);
        expect(articuloService.compareArticulo).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
