import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DB_CONNECTION,
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
  EX_BASE_CURRENCY,
  EX_CACHE_TIMEOUT,
  EX_HOST,
  EX_OXR_APP_ID,
  EX_OXR_URI,
  EX_TCP_PORT,
  GATEWAY_HOST,
  GATEWAY_HTTP_PORT,
  LOANS_HOST,
  LOANS_TCP_PORT,
} from '../shared/constants';

@Injectable()
export class AppConfigService {
  gateway: GatewayConfig = undefined;
  loans: LoansConfig = undefined;
  exchange: ExchangeConfig = undefined;

  constructor(private configService: ConfigService) {
    this.loans = new LoansConfig(configService);
    this.gateway = new GatewayConfig(configService);
    this.exchange = new ExchangeConfig(configService);
  }
}

export class GatewayConfig {
  constructor(private configService: ConfigService) {}

  get GATEWAY_HOST(): string {
    return this.configService.get<string>(GATEWAY_HOST);
  }
  get GATEWAY_HTTP_PORT(): number {
    return this.configService.get<number>(GATEWAY_HTTP_PORT);
  }
  get LOANS_HOST(): string {
    return this.configService.get<string>(LOANS_HOST);
  }
  get LOANS_TCP_PORT(): number {
    return this.configService.get<number>(LOANS_TCP_PORT);
  }
}

export class LoansConfig {
  constructor(private configService: ConfigService) {}

  get LOANS_TCP_PORT(): number {
    return this.configService.get<number>(LOANS_TCP_PORT);
  }
  get DB_CONNECTION(): any {
    return this.configService.get<any>(DB_CONNECTION);
  }
  get DB_HOST(): string {
    return this.configService.get<string>(DB_HOST);
  }
  get DB_USERNAME(): string {
    return this.configService.get<string>(DB_USERNAME);
  }
  get DB_PASSWORD(): string {
    return this.configService.get<string>(DB_PASSWORD);
  }
  get DB_DATABASE(): string {
    return this.configService.get<string>(DB_DATABASE);
  }
  get DB_PORT(): number {
    return Number(this.configService.get<string>(DB_PORT));
  }
  get EX_HOST(): string {
    return this.configService.get<string>(EX_HOST);
  }
  get EX_TCP_PORT(): number {
    return this.configService.get<number>(EX_TCP_PORT);
  }
}

export class ExchangeConfig {
  constructor(private configService: ConfigService) {}

  get EX_TCP_PORT(): number {
    return this.configService.get<number>(EX_TCP_PORT);
  }
  get EX_OXR_URI(): string {
    return this.configService.get<string>(EX_OXR_URI);
  }
  get EX_OXR_APP_ID(): string {
    return this.configService.get<string>(EX_OXR_APP_ID);
  }
  get EX_BASE_CURRENCY(): string {
    return this.configService.get<string>(EX_BASE_CURRENCY);
  }
  get EX_CACHE_TIMEOUT(): number {
    return this.configService.get<number>(EX_CACHE_TIMEOUT);
  }
}
