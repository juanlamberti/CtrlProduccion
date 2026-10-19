import { beforeEach, describe, expect, it, vi } from 'vitest';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { provideTranslateService } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { TipoArticuloService } from '../service/tipo-articulo.service';
import { ITipoArticulo } from '../tipo-articulo.model';

import { TipoArticuloFormService } from './tipo-articulo-form.service';
import { TipoArticuloUpdate } from './tipo-articulo-update';

describe('TipoArticulo Management Update Component', () => {
  let comp: TipoArticuloUpdate;
  let fixture: ComponentFixture<TipoArticuloUpdate>;
  let activatedRoute: ActivatedRoute;
  let tipoArticuloFormService: TipoArticuloFormService;
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

    fixture = TestBed.createComponent(TipoArticuloUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    tipoArticuloFormService = TestBed.inject(TipoArticuloFormService);
    tipoArticuloService = TestBed.inject(TipoArticuloService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const tipoArticulo: ITipoArticulo = { id: 16472 };

      activatedRoute.data = of({ tipoArticulo });
      comp.ngOnInit();

      expect(comp.tipoArticulo).toEqual(tipoArticulo);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<ITipoArticulo>();
      const tipoArticulo = { id: 18919 };
      vi.spyOn(tipoArticuloFormService, 'getTipoArticulo').mockReturnValue(tipoArticulo);
      vi.spyOn(tipoArticuloService, 'update').mockReturnValue(saveSubject);
      vi.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoArticulo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(tipoArticulo);
      saveSubject.complete();

      // THEN
      expect(tipoArticuloFormService.getTipoArticulo).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(tipoArticuloService.update).toHaveBeenCalledWith(expect.objectContaining(tipoArticulo));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<ITipoArticulo>();
      const tipoArticulo = { id: 18919 };
      vi.spyOn(tipoArticuloFormService, 'getTipoArticulo').mockReturnValue({ id: null });
      vi.spyOn(tipoArticuloService, 'create').mockReturnValue(saveSubject);
      vi.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoArticulo: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(tipoArticulo);
      saveSubject.complete();

      // THEN
      expect(tipoArticuloFormService.getTipoArticulo).toHaveBeenCalled();
      expect(tipoArticuloService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<ITipoArticulo>();
      const tipoArticulo = { id: 18919 };
      vi.spyOn(tipoArticuloService, 'update').mockReturnValue(saveSubject);
      vi.spyOn(comp, 'previousState');
      activatedRoute.data = of({ tipoArticulo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(tipoArticuloService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
