import { map, Observable, Subject, takeUntil } from 'rxjs';
import { Currency, ICurrencyDTO, ICurrencyVM, TConversion } from '../models/currency.model';
import { ApiService } from '../../../core/http/api.service';
import { inject, Injectable, OnInit } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CurrencyConverterService {
  private readonly apiService = inject(ApiService);
  private readonly _exchangeRates$ = new Subject<ICurrencyVM>();
  public readonly exchangeRates$ = this._exchangeRates$.asObservable();

  constructor() {
    this.exchangeRates(Currency.RUB)
      .pipe(takeUntil(this._exchangeRates$))
      .subscribe(rates => this._exchangeRates$.next(rates));
  }

  public exchangeRates(currency: Currency): Observable<ICurrencyVM> {
    return this.apiService.get<ICurrencyDTO>(currency)
      .pipe(
        map(data => ({ code: data.base_code, rates: data.conversion_rates })),
      );
  }
}
