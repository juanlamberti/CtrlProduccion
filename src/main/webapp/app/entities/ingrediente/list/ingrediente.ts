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
import { IngredienteDeleteDialog } from '../delete/ingrediente-delete-dialog';
import { IIngrediente } from '../ingrediente.model';
import { IngredienteService } from '../service/ingrediente.service';

@Component({
  selector: 'jhi-ingrediente',
  templateUrl: './ingrediente.html',
  imports: [
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
export class Ingrediente {
  readonly ingredientes = signal<IIngrediente[]>([]);

  sortState = sortStateSignal({});
  filters: IFilterOptions = new FilterOptions();

  readonly itemsPerPage = signal(ITEMS_PER_PAGE);
  readonly totalItems = signal(0);
  readonly page = signal(1);

  readonly searchForm = new FormGroup({
    search: new FormControl('', { nonNullable: true }),
  });

  readonly router = inject(Router);
  protected readonly ingredienteService = inject(IngredienteService);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  readonly isLoading = this.ingredienteService.ingredientesResource.isLoading;
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
    this.searchForm.controls.search.setValue(this.ingredienteService.searchTerm, { emitEvent: false });
    this.searchForm.controls.search.valueChanges
      .pipe(
        tap(value => {
          this.ingredienteService.searchTerm = value;
        }),
        debounceTime(300),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        const value = this.searchForm.controls.search.value;
        this.ingredienteService.searchTerm = value;
        this.page.set(1);
        this.handleNavigation(1, this.sortState(), this.filters.filterOptions);
        this.load();
      });

    effect(() => {
      const headers = this.ingredienteService.ingredientesResource.headers();
      if (headers) {
        this.fillComponentAttributesFromResponseHeader(headers);
      }
    });
    effect(() => {
      this.ingredientes.set(this.fillComponentAttributesFromResponseBody([...this.ingredienteService.ingredientes()]));
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

  trackId = (item: IIngrediente): number => this.ingredienteService.getIngredienteIdentifier(item);

  delete(ingrediente: IIngrediente): void {
    const modalRef = this.modalService.open(IngredienteDeleteDialog, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ingrediente = ingrediente;
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
    this.searchForm.controls.search.setValue('', { emitEvent: false });
    this.ingredienteService.searchTerm = '';
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
    const page = params.get(PAGE_HEADER);
    this.page.set(+(page ?? 1));
    this.sortState.set(this.sortService.parseSortParam(params.get(SORT) ?? data[DEFAULT_SORT_DATA]));
    this.filters.initializeFromParams(params);
  }

  protected fillComponentAttributesFromResponseBody(data: IIngrediente[]): IIngrediente[] {
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
    this.ingredienteService.search(queryObject);
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

    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: queryParamsObj,
    });
  }
}
