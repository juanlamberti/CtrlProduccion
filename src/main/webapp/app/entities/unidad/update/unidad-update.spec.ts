import { beforeEach, describe, expect, it, vi } from 'vitest';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { provideTranslateService } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { UnidadService } from '../service/unidad.service';
import { IUnidad } from '../unidad.model';

import { UnidadFormService } from './unidad-form.service';
import { UnidadUpdate } from './unidad-update';

describe('Unidad Management Update Component', () => {
  let comp: UnidadUpdate;
  let fixture: ComponentFixture<UnidadUpdate>;
  let activatedRoute: ActivatedRoute;
  let unidadFormService: UnidadFormService;
  let unidadService: UnidadService;

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

    fixture = TestBed.createComponent(UnidadUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    unidadFormService = TestBed.inject(UnidadFormService);
    unidadService = TestBed.inject(UnidadService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const unidad: IUnidad = { id: 5034 };

      activatedRoute.data = of({ unidad });
      comp.ngOnInit();

      expect(comp.unidad).toEqual(unidad);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IUnidad>();
      const unidad = { id: 26699 };
      vi.spyOn(unidadFormService, 'getUnidad').mockReturnValue(unidad);
      vi.spyOn(unidadService, 'update').mockReturnValue(saveSubject);
      vi.spyOn(comp, 'previousState');
      activatedRoute.data = of({ unidad });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(unidad);
      saveSubject.complete();

      // THEN
      expect(unidadFormService.getUnidad).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(unidadService.update).toHaveBeenCalledWith(expect.objectContaining(unidad));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IUnidad>();
      const unidad = { id: 26699 };
      vi.spyOn(unidadFormService, 'getUnidad').mockReturnValue({ id: null });
      vi.spyOn(unidadService, 'create').mockReturnValue(saveSubject);
      vi.spyOn(comp, 'previousState');
      activatedRoute.data = of({ unidad: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(unidad);
      saveSubject.complete();

      // THEN
      expect(unidadFormService.getUnidad).toHaveBeenCalled();
      expect(unidadService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IUnidad>();
      const unidad = { id: 26699 };
      vi.spyOn(unidadService, 'update').mockReturnValue(saveSubject);
      vi.spyOn(comp, 'previousState');
      activatedRoute.data = of({ unidad });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(unidadService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
