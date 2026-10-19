import { beforeEach, describe, expect, it, vi } from 'vitest';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { provideTranslateService } from '@ngx-translate/core';
import { Subject, from, of } from 'rxjs';

import { IArchivo } from '../archivo.model';
import { ArchivoService } from '../service/archivo.service';

import { ArchivoFormService } from './archivo-form.service';
import { ArchivoUpdate } from './archivo-update';

describe('Archivo Management Update Component', () => {
  let comp: ArchivoUpdate;
  let fixture: ComponentFixture<ArchivoUpdate>;
  let activatedRoute: ActivatedRoute;
  let archivoFormService: ArchivoFormService;
  let archivoService: ArchivoService;

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

    fixture = TestBed.createComponent(ArchivoUpdate);
    activatedRoute = TestBed.inject(ActivatedRoute);
    archivoFormService = TestBed.inject(ArchivoFormService);
    archivoService = TestBed.inject(ArchivoService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const archivo: IArchivo = { id: 26305 };

      activatedRoute.data = of({ archivo });
      comp.ngOnInit();

      expect(comp.archivo).toEqual(archivo);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<IArchivo>();
      const archivo = { id: 31738 };
      vi.spyOn(archivoFormService, 'getArchivo').mockReturnValue(archivo);
      vi.spyOn(archivoService, 'update').mockReturnValue(saveSubject);
      vi.spyOn(comp, 'previousState');
      activatedRoute.data = of({ archivo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(archivo);
      saveSubject.complete();

      // THEN
      expect(archivoFormService.getArchivo).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(archivoService.update).toHaveBeenCalledWith(expect.objectContaining(archivo));
      expect(comp.isSaving()).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<IArchivo>();
      const archivo = { id: 31738 };
      vi.spyOn(archivoFormService, 'getArchivo').mockReturnValue({ id: null });
      vi.spyOn(archivoService, 'create').mockReturnValue(saveSubject);
      vi.spyOn(comp, 'previousState');
      activatedRoute.data = of({ archivo: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.next(archivo);
      saveSubject.complete();

      // THEN
      expect(archivoFormService.getArchivo).toHaveBeenCalled();
      expect(archivoService.create).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<IArchivo>();
      const archivo = { id: 31738 };
      vi.spyOn(archivoService, 'update').mockReturnValue(saveSubject);
      vi.spyOn(comp, 'previousState');
      activatedRoute.data = of({ archivo });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving()).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(archivoService.update).toHaveBeenCalled();
      expect(comp.isSaving()).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
