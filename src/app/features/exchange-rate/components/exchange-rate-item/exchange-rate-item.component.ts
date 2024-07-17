import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICurrencyVM } from '../../../data-access/models/currency.model';
import { ConvertRatePipe } from '../../../data-access/pipes/convert-rate.pipe';
import { SlicePipe } from '@angular/common';
import { NumberSlicePipe } from '../../../data-access/pipes/number-slice.pipe';

@Component({
  selector: 'app-exchange-rate-item',
  templateUrl: './exchange-rate-item.component.html',
  styleUrls: ['./exchange-rate-item.component.css'],
  imports: [ConvertRatePipe, NumberSlicePipe],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExchangeRateItemComponent {
  @Input({ required: true }) currency!: ICurrencyVM;
}
