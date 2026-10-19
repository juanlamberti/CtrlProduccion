import { beforeEach, describe, expect, it, vi } from 'vitest';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { provideTranslateService } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { TipoParametroService } from '../service/tipo-parametro.service';
import { ITipoParametro } from '../tipo-parametro.model';

import { TipoParametroFormService } from './tipo-parametro-form.service';
import { TipoParametroUpdate } from './tipo-parametro-update';

describe('TipoParametro Management Update Component', () => {
  let comp: TipoParametroUpdate;
  let fixture: ComponentFixture<TipoParametroUpdate>;
  let activatedRoute: ActivatedRoute;
  let tipoParametroFormService: TipoParametroFormService;
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

    fixture = TestBed.createComponent(TipoParametroUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tipoParametroFormService = TestBed.inject(TipoParametroFormService);
    tipoParametroService = TestBed.inject(TipoParametroService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const tipoParametro: ITipoParametro = { id: 18067 };

      activatedRoute.data = of({ tipoParametro });
      comp.ngOnInit();

      expect(comp.tipoParametro).toEqual(tipoParametro);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<ITipoParametro>();
      const tipoParametro = { id: 25905 };
      vi.spyOn(tipoParametroFormService, 'getTipoParametro').mockReturnValue(tipoParametro);
      vi.spyOn(tipoParametroService, 'update').mockReturnValue(saveSubject);
      vi.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoParametro });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(tipoParametro);
      saveSubject.complete();

      // THEN
      expect(tipoParametroFormService.getTipoParametro).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(tipoParametroService.update).toHaveBeenCalledWith(expect.objectContaining(tipoParametro));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<ITipoParametro>();
      const tipoParametro = { id: 25905 };
      vi.spyOn(tipoParametroFormService, 'getTipoParametro').mockReturnValue({ id: null });
      vi.spyOn(tipoParametroService, 'create').mockReturnValue(saveSubject);
      vi.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoParametro: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(tipoParametro);
      saveSubject.complete();

      // THEN
      expect(tipoParametroFormService.getTipoParametro).toHaveBeenCalled();
      expect(tipoParametroService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<ITipoParametro>();
      const tipoParametro = { id: 25905 };
      vi.spyOn(tipoParametroService, 'update').mockReturnValue(saveSubject);
      vi.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoParametro });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tipoParametroService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
