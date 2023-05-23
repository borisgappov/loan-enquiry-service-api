import { AppConfigService, OxrResponse, Rates } from '@app/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Cache } from 'cache-manager';

@Injectable()
export class ExchangeService {
  readonly cacheKey = 'get_latest';
  static latestRates: Rates = {};
  oxrUri: string;

  constructor(private readonly appConfig: AppConfigService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {
    const { EX_OXR_URI, EX_OXR_APP_ID, EX_BASE_CURRENCY } = this.appConfig.exchange;
    this.oxrUri = `${EX_OXR_URI}?app_id=${EX_OXR_APP_ID}&from=${EX_BASE_CURRENCY}`;
    this.getLatest();
  }

  async getRate(currency: string): Promise<number> {
    const latest = await this.getLatest();
    return Number(latest[currency] ?? 1);
  }

  async getLatest(): Promise<Rates> {
    try {
      const cached = await this.cacheManager.get<Rates>(this.cacheKey);
      if (cached) return cached;

      const response = await axios.get(this.oxrUri);
      const { rates } = response.data as OxrResponse;

      if (rates && Object.keys(rates).length) {
        ExchangeService.latestRates = rates;
        await this.cacheManager.set(this.cacheKey, rates, this.appConfig.exchange.EX_CACHE_TIMEOUT);
      }
    } catch (ex) {
      console.error(ex);
    }
    return ExchangeService.latestRates;
  }
}
