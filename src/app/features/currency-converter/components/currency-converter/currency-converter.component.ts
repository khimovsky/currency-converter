import { CurrencyConverterService } from '../../../data-access/services/currency-converter.service';
import { ChangeDetectionStrategy, ElementRef, inject, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { Currency } from '../../../data-access/models/currency.model';
import { BehaviorSubject, debounceTime, fromEvent, map, Subject, switchMap, takeUntil, withLatestFrom } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { NumberSlicePipe } from '../../../data-access/pipes/number-slice.pipe';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css'],
  standalone: true,
  imports: [NgIf, AsyncPipe, NumberSlicePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyConverterComponent {

  @ViewChild('firstCurrencyInput', { static: true }) firstCurrencyInput!: ElementRef<HTMLInputElement>;
  @ViewChild('secondCurrencyInput', { static: true }) secondCurrencyInput!: ElementRef<HTMLInputElement>;

  private readonly currencyConverterService = inject(CurrencyConverterService);
  private readonly destroy$ = new Subject<void>();

  public readonly options = ['RUB', 'USD', 'EUR'] as const;
  public firstSelectedOption$: BehaviorSubject<typeof this.options[number]> = new BehaviorSubject<typeof this.options[number]>('RUB');
  public secondSelectedOption$: BehaviorSubject<typeof this.options[number]> = new BehaviorSubject<typeof this.options[number]>('USD');

  public readonly firstInput$: BehaviorSubject<number> = new BehaviorSubject(0);
  public readonly secondInput$: BehaviorSubject<number> = new BehaviorSubject(0);

  onFirstSelectChange(event: Event): void {
    this.firstSelectedOption$.next((event.target as HTMLSelectElement).value as Currency);
  }

  onSecondSelectChange(event: Event): void {
    this.secondSelectedOption$.next((event.target as HTMLSelectElement).value as Currency);
  }

  ngOnInit(): void {
    fromEvent(this.firstCurrencyInput.nativeElement, 'input')
      .pipe(
        debounceTime(300),
        map(() => this.firstCurrencyInput.nativeElement.value.trim()),
        withLatestFrom(this.firstSelectedOption$),
        switchMap(([value, firstCurrency]) =>
          this.currencyConverterService.exchangeRates(Currency[firstCurrency])
            .pipe(
              withLatestFrom(this.secondSelectedOption$),
              map(([firstRates, secondCurrency]) => Number(value) * (firstRates.rates[secondCurrency] ?? 1)),
            )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(value => this.secondInput$.next(value));

    fromEvent(this.secondCurrencyInput.nativeElement, 'input')
    .pipe(
      debounceTime(300),
      map(() => this.secondCurrencyInput.nativeElement.value.trim()),
      withLatestFrom(this.secondSelectedOption$),
      switchMap(([value, secondCurrency]) =>
        this.currencyConverterService.exchangeRates(Currency[secondCurrency])
          .pipe(
            withLatestFrom(this.firstSelectedOption$),
            map(([secondRates, firstCurrency]) => Number(value) * (secondRates.rates[firstCurrency] ?? 1)),
          )
      ),
      takeUntil(this.destroy$)
    )
    .subscribe(value => this.firstInput$.next(value));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
