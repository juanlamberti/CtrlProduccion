import { ArticuloLookup } from '../lookup/articulo-lookup';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EntityIcon } from 'app/shared/entity-icon';
import { HttpHeaders } from '@angular/common/http';
import { Component, effect, inject, signal, untracked } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Data, ParamMap, Router, RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap/pagination';
import { combineLatest, debounceTime, filter, map, tap } from 'rxjs';

import { DEFAULT_SORT_DATA, ITEMS_PER_PAGE, ITEM_DELETED_EVENT, PAGE_HEADER, SORT, TOTAL_COUNT_RESPONSE_HEADER } from 'app/config';
import { Alert, AlertError } from 'app/shared/alert';
import { Filter, FilterOptions, IFilterOption, IFilterOptions } from 'app/shared/filter';
import { TranslateDirective } from 'app/shared/language';
import { ItemCount } from 'app/shared/pagination';
import { SortByDirective, SortDirective, SortService, type SortState, sortStateSignal } from 'app/shared/sort';
import { NaturalezaArticulo } from 'app/entities/enumerations/naturaleza-articulo.model';
import { IArticulo } from '../articulo.model';
import { ArticuloDeleteDialog } from '../delete/articulo-delete-dialog';
import { ArticuloService } from '../service/articulo.service';

@Component({
  selector: 'jhi-articulo',
  templateUrl: './articulo.html',
  imports: [
    ArticuloLookup,
    ReactiveFormsModule,
    EntityIcon,
    RouterLink,
    FontAwesomeModule,
    AlertError,
    Alert,
    SortDirective,
    SortByDirective,
    TranslateDirective,
    Filter,
    NgbPagination,
    ItemCount,
  ],
})
export class Articulo {
  readonly articulos = signal<IArticulo[]>([]);

  sortState = sortStateSignal({});
  filters: IFilterOptions = new FilterOptions();

  readonly itemsPerPage = signal(ITEMS_PER_PAGE);
  readonly totalItems = signal(0);
  readonly page = signal(1);

  readonly searchForm = new FormGroup({
    search: new FormControl('', { nonNullable: true }),
    naturaleza: new FormControl<NaturalezaArticulo | null>(null),
    insumo: new FormControl<IArticulo | null>(null),
  });

  readonly router = inject(Router);
  protected readonly articuloService = inject(ArticuloService);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  readonly isLoading = this.articuloService.articulosResource.isLoading;
  protected readonly activatedRoute = inject(ActivatedRoute);
  protected readonly activatedRouteState = toSignal(
    combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data]).pipe(
      map(([queryParamMap, data]) => ({ queryParamMap, data })),
    ),
    { initialValue: { queryParamMap: this.activatedRoute.snapshot.queryParamMap, data: this.activatedRoute.snapshot.data } },
  );
  protected readonly sortService = inject(SortService);
  protected readonly filterOptions = toSignal(this.filters.filterChanges);
  protected modalService = inject(NgbModal);

  constructor() {
    this.searchForm.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.page.set(1);
      this.load();
      this.handleNavigation(1, this.sortState(), this.filters.filterOptions);
    });
    this.searchForm.controls.search.setValue(this.articuloService.searchTerm, { emitEvent: false });
    this.searchForm.controls.search.valueChanges
      .pipe(
        tap(value => {
          this.articuloService.searchTerm = value;
        }),
        debounceTime(300),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        const value = this.searchForm.controls.search.value;
        this.articuloService.searchTerm = value;
        this.page.set(1);
        this.handleNavigation(1, this.sortState(), this.filters.filterOptions);
        this.load();
      });

    effect(() => {
      const headers = this.articuloService.articulosResource.headers();
      if (headers) {
        this.fillComponentAttributesFromResponseHeader(headers);
      }
    });
    effect(() => {
      this.articulos.set(this.fillComponentAttributesFromResponseBody([...this.articuloService.articulos()]));
    });
    effect(() => {
      const activatedRouteState = this.activatedRouteState();
      untracked(() => {
        // Only watch for route changes. Other signals should be ignored.
        this.fillComponentAttributeFromRoute(activatedRouteState.queryParamMap, activatedRouteState.data);
        this.load();
      });
    });

    effect(() => {
      const filterOptions = this.filterOptions();
      if (filterOptions) {
        untracked(() => {
          // Only watch for filter changes. Other signals should be ignored.
          this.handleNavigation(1, this.sortState(), filterOptions);
        });
      }
    });
  }

  trackId = (item: IArticulo): number => this.articuloService.getArticuloIdentifier(item);

  delete(articulo: IArticulo): void {
    const modalRef = this.modalService.open(ArticuloDeleteDialog, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.articulo = articulo;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed
      .pipe(
        filter(reason => reason === ITEM_DELETED_EVENT),
        tap(() => this.load()),
      )
      .subscribe();
  }

  clearSearch(): void {
    this.searchForm.controls.search.setValue('');
  }

  clearFilters(): void {
    this.searchForm.reset(
      { naturaleza: this.activatedRouteState().data['recipe'] === true ? NaturalezaArticulo.COMPUESTO : null, insumo: null },
      { emitEvent: false },
    );
    this.searchForm.controls.search.setValue('', { emitEvent: false });
    this.articuloService.searchTerm = '';
    this.filters.clear();
    this.page.set(1);
    this.handleNavigation(1, this.sortState(), []);
    this.load();
  }

  load(): void {
    this.queryBackend();
  }

  navigateToWithComponentValues(event: SortState): void {
    this.handleNavigation(this.page(), event, this.filters.filterOptions);
  }

  navigateToPage(page: number): void {
    this.handleNavigation(page, this.sortState(), this.filters.filterOptions);
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    const recipe = data['recipe'] === true;
    const nature = params.get('naturalezaArt');
    const insumoId = Number(params.get('insumoId'));
    this.searchForm.reset(
      {
        naturaleza: recipe
          ? NaturalezaArticulo.COMPUESTO
          : nature === NaturalezaArticulo.SIMPLE || nature === NaturalezaArticulo.COMPUESTO
            ? nature
            : null,
        insumo: Number.isSafeInteger(insumoId) && insumoId > 0 ? { id: insumoId, descArt: params.get('insumoDescripcion') } : null,
      },
      { emitEvent: false },
    );
    if (recipe) {
      this.searchForm.controls.naturaleza.disable({ emitEvent: false });
    } else {
      this.searchForm.controls.naturaleza.enable({ emitEvent: false });
    }
    const page = params.get(PAGE_HEADER);
    this.page.set(+(page ?? 1));
    this.sortState.set(this.sortService.parseSortParam(params.get(SORT) ?? data[DEFAULT_SORT_DATA]));
    this.filters.initializeFromParams(params);
  }

  protected fillComponentAttributesFromResponseBody(data: IArticulo[]): IArticulo[] {
    return data;
  }

  protected fillComponentAttributesFromResponseHeader(headers: HttpHeaders): void {
    this.totalItems.set(Number(headers.get(TOTAL_COUNT_RESPONSE_HEADER)));
  }

  protected queryBackend(): void {
    const pageToLoad: number = this.page();
    const queryObject: any = {
      page: pageToLoad - 1,
      size: this.itemsPerPage(),
      eagerload: true,
      sort: this.sortService.buildSortParam(this.sortState()),
    };
    for (const filterOption of this.filters.filterOptions) {
      queryObject[filterOption.name] = filterOption.values;
    }
    if (this.activatedRouteState().data['recipe'] === true) {
      queryObject.naturalezaArt = NaturalezaArticulo.COMPUESTO;
    }
    const selection = this.searchForm.getRawValue();
    if (selection.naturaleza) {
      queryObject.naturalezaArt = selection.naturaleza;
    }
    if (selection.insumo) {
      queryObject.insumoId = selection.insumo.id;
    }
    this.articuloService.search(queryObject);
  }

  protected handleNavigation(page: number, sortState: SortState, filterOptions?: IFilterOption[]): void {
    const queryParamsObj: any = {
      page,
      size: this.itemsPerPage(),
      sort: this.sortService.buildSortParam(sortState),
    };

    if (filterOptions) {
      for (const filterOption of filterOptions) {
        queryParamsObj[filterOption.nameAsQueryParam()] = filterOption.values;
      }
    }

    const selection = this.searchForm.getRawValue();
    queryParamsObj.naturalezaArt = selection.naturaleza;
    queryParamsObj.insumoId = selection.insumo?.id;
    queryParamsObj.insumoDescripcion = selection.insumo?.descArt;
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: queryParamsObj,
    });
  }
}
