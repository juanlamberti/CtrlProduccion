import { beforeEach, describe, expect, it, vi } from 'vitest';
import { HttpResponse } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { provideTranslateService } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { TipoParametroService } from 'app/entities/tipo-parametro/service/tipo-parametro.service';
import { ITipoParametro } from 'app/entities/tipo-parametro/tipo-parametro.model';
import { IParametro } from '../parametro.model';
import { ParametroService } from '../service/parametro.service';

import { ParametroFormService } from './parametro-form.service';
import { ParametroUpdate } from './parametro-update';

describe('Parametro Management Update Component', () => {
  let comp: ParametroUpdate;
  let fixture: ComponentFixture<ParametroUpdate>;
  let activatedRoute: ActivatedRoute;
  let parametroFormService: ParametroFormService;
  let parametroService: ParametroService;
  let tipoParametroService: TipoParametroService;

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

    fixture = TestBed.createComponent(ParametroUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    parametroFormService = TestBed.inject(ParametroFormService);
    parametroService = TestBed.inject(ParametroService);
    tipoParametroService = TestBed.inject(TipoParametroService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call TipoParametro query and add missing value', () => {
      const parametro: IParametro = { id: 8891 };
      const tipo: ITipoParametro = { id: 25905 };
      parametro.tipo = tipo;

      const tipoParametroCollection: ITipoParametro[] = [{ id: 25905 }];
      vi.spyOn(tipoParametroService, 'query').mockReturnValue(of(new HttpResponse({ body: tipoParametroCollection })));
      const additionalTipoParametros = [tipo];
      const expectedCollection: ITipoParametro[] = [...additionalTipoParametros, ...tipoParametroCollection];
      vi.spyOn(tipoParametroService, 'addTipoParametroToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ parametro });
      comp.ngOnInit();

      expect(tipoParametroService.query).toHaveBeenCalled();
      expect(tipoParametroService.addTipoParametroToCollectionIfMissing).toHaveBeenCalledWith(
        tipoParametroCollection,
        ...additionalTipoParametros.map(i => expect.objectContaining(i) as typeof i),
      );
      expect(comp.tipoParametrosSharedCollection()).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const parametro: IParametro = { id: 8891 };
      const tipo: ITipoParametro = { id: 25905 };
      parametro.tipo = tipo;

      activatedRoute.data = of({ parametro });
      comp.ngOnInit();

      expect(comp.tipoParametrosSharedCollection()).toContainEqual(tipo);
      expect(comp.parametro).toEqual(parametro);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IParametro>();
      const parametro = { id: 28317 };
      vi.spyOn(parametroFormService, 'getParametro').mockReturnValue(parametro);
      vi.spyOn(parametroService, 'update').mockReturnValue(saveSubject);
      vi.spyOn(comp, 'previousState');
      activatedRoute.data = of({ parametro });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(parametro);
      saveSubject.complete();

      // THEN
      expect(parametroFormService.getParametro).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(parametroService.update).toHaveBeenCalledWith(expect.objectContaining(parametro));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IParametro>();
      const parametro = { id: 28317 };
      vi.spyOn(parametroFormService, 'getParametro').mockReturnValue({ id: null });
      vi.spyOn(parametroService, 'create').mockReturnValue(saveSubject);
      vi.spyOn(comp, 'previousState');
      activatedRoute.data = of({ parametro: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(parametro);
      saveSubject.complete();

      // THEN
      expect(parametroFormService.getParametro).toHaveBeenCalled();
      expect(parametroService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IParametro>();
      const parametro = { id: 28317 };
      vi.spyOn(parametroService, 'update').mockReturnValue(saveSubject);
      vi.spyOn(comp, 'previousState');
      activatedRoute.data = of({ parametro });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(parametroService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTipoParametro', () => {
      it('should forward to tipoParametroService', () => {
        const entity = { id: 25905 };
        const entity2 = { id: 18067 };
        vi.spyOn(tipoParametroService, 'compareTipoParametro');
        comp.compareTipoParametro(entity, entity2);
        expect(tipoParametroService.compareTipoParametro).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
