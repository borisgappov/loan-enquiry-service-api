import { Currency } from '../shared/constants';

export type Rates = { [key: Currency | string]: number };

export interface OxrResponse {
  disclaimer: string;
  license: string;
  timestamp: number;
  base: Currency;
  rates: Rates;
}
