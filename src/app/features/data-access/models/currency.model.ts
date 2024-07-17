export enum Currency {
  RUB = 'RUB',
  USD = 'USD',
  EUR = 'EUR',
}

export type TConversion = Partial<Record<Currency, number>>;

export interface ICurrencyDTO {
  'result': string,
  'documentation': string,
  'terms_of_use': string,
  'time_last_update_unix': string,
  'time_last_update_utc': string,
  'time_next_update_unix': number,
  'time_next_update_utc': string,
  'base_code': string,
  'conversion_rates': TConversion,
}

export interface ICurrencyVM {
  'code': string,
  'rates': TConversion,
}
