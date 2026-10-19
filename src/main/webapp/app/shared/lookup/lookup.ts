import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, forwardRef, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslatePipe } from '@ngx-translate/core';
import { EMPTY, Observable, Subject, catchError, expand, map, of, reduce, switchMap, tap, timer } from 'rxjs';

import { serverApiUrl } from 'app/config';
import { TranslateDirective } from 'app/shared/language';

@Component({
  selector: 'jhi-lookup',
  templateUrl: './lookup.html',
  imports: [RouterLink, FontAwesomeModule, TranslatePipe, TranslateDirective],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => Lookup), multi: true }],
})
export class Lookup<T extends { id: number }> implements ControlValueAccessor, OnInit {
  readonly inputId = input.required<string>();
  readonly allowCreate = input(false);
  readonly options = signal<T[]>([]);
  readonly text = signal('');
  readonly opened = signal(false);
  readonly disabled = signal(false);
  readonly loading = signal(false);
  readonly failed = signal(false);
  readonly activeIndex = signal(-1);

  protected readonly entityKey: string = 'global';
  protected readonly resourcePath: string = '';
  protected readonly routePath: string = '';

  private readonly http = inject(HttpClient);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly requests = new Subject<{ term: string; delay: number }>();
  private selected: T | null = null;
  private replaceOnInput = false;

  constructor() {
    this.requests
      .pipe(
        tap(() => {
          this.loading.set(true);
          this.failed.set(false);
          this.options.set([]);
          this.activeIndex.set(-1);
        }),
        switchMap(({ term, delay }) =>
          timer(delay).pipe(
            switchMap(() =>
              this.fetchPage(term, 0).pipe(
                expand((response, index) => {
                  const count = response.body?.length ?? 0;
                  const total = Number(response.headers.get('X-Total-Count') ?? 0);
                  return count === 100 && ((index + 1) * 100 < total || !total) ? this.fetchPage(term, index + 1) : EMPTY;
                }),
                map(response => response.body ?? []),
                reduce((items, page) => [...items, ...page], [] as T[]),
                catchError(() => {
                  this.failed.set(true);
                  return of([] as T[]);
                }),
              ),
            ),
          ),
        ),
        takeUntilDestroyed(),
      )
      .subscribe(items => {
        this.options.set(items);
        this.loading.set(false);
      });
  }

  ngOnInit(): void {
    this.requests.next({ term: '', delay: 0 });
  }

  writeValue(value: T | null): void {
    this.selected = value;
    this.text.set(value ? this.display(value) : '');
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(value: boolean): void {
    this.disabled.set(value);
    if (value) this.opened.set(false);
  }

  focus(): void {
    if (this.disabled()) return;
    this.opened.set(true);
    this.replaceOnInput = this.selected !== null;
    this.requests.next({ term: '', delay: 0 });
  }

  beforeInput(event: Event): void {
    if (this.replaceOnInput) {
      const field = event.target as HTMLInputElement;
      field.setSelectionRange(0, field.value.length);
      this.replaceOnInput = false;
    }
  }

  search(event: Event): void {
    this.text.set((event.target as HTMLInputElement).value);
    this.selected = null;
    this.onChange(null);
    this.opened.set(true);
    this.requests.next({ term: this.text().trim(), delay: 300 });
  }

  select(item: T): void {
    if (this.disabled()) return;
    this.selected = item;
    this.text.set(this.display(item));
    this.opened.set(false);
    this.onChange(item);
    this.onTouched();
  }

  clear(): void {
    if (this.disabled()) return;
    this.selected = null;
    this.text.set('');
    this.onChange(null);
    this.onTouched();
    this.requests.next({ term: '', delay: 0 });
  }

  blur(event: FocusEvent): void {
    if (event.relatedTarget instanceof Node && this.element.nativeElement.contains(event.relatedTarget)) return;
    this.opened.set(false);
    this.text.set(this.selected ? this.display(this.selected) : '');
    this.onTouched();
  }

  keydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.opened.set(false);
      this.text.set(this.selected ? this.display(this.selected) : '');
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!this.opened()) this.focus();
      const step = event.key === 'ArrowDown' ? 1 : -1;
      const count = this.options().length;
      this.activeIndex.set(count ? (this.activeIndex() + step + count) % count : -1);
      this.element.nativeElement.querySelector(`#${this.inputId()}-option-${this.activeIndex()}`)?.scrollIntoView({ block: 'nearest' });
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const index = this.activeIndex();
      if (this.opened() && index >= 0 && index < this.options().length) this.select(this.options()[index]);
    }
  }

  display(item: T): string {
    return String(item.id);
  }

  private onChange: (value: T | null) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  private fetchPage(term: string, page: number): Observable<HttpResponse<T[]>> {
    return this.http.get<T[]>(`${serverApiUrl}api/${this.resourcePath}/search`, {
      params: { page, size: 100, sort: 'id,asc', ...(term ? { 'search.contains': term } : {}) },
      observe: 'response',
    });
  }
}
