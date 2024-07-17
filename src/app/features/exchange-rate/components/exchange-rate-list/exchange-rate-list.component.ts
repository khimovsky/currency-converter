import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CurrencyConverterService } from '../../../data-access/services/currency-converter.service';
import { ExchangeRateItemComponent } from "../exchange-rate-item/exchange-rate-item.component";
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-exchange-rate-list',
  templateUrl: './exchange-rate-list.component.html',
  styleUrls: ['./exchange-rate-list.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExchangeRateItemComponent, NgIf, AsyncPipe]
})
export class ExchangeRateListComponent {
  private readonly currencyConverterService = inject(CurrencyConverterService);
  public readonly exchangeRates$ = this.currencyConverterService.exchangeRates$;
}
