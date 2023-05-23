import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as joi from 'joi';
import { AppConfigService } from './app-config.service';

const GatewayConfigModule = ConfigModule.forRoot({
  isGlobal: true,
  validationSchema: joi.object({
    GATEWAY_HOST: joi.string().required(),
    GATEWAY_HTTP_PORT: joi.number().required(),
    LOANS_HOST: joi.string().required(),
    LOANS_TCP_PORT: joi.number().required(),
  }),
  envFilePath: './apps/gateway/.env',
});

const LoansConfigModule = ConfigModule.forRoot({
  isGlobal: true,
  validationSchema: joi.object({
    LOANS_TCP_PORT: joi.number().required(),
    DB_CONNECTION: joi.string().required(),
    DB_HOST: joi.string().required(),
    DB_USERNAME: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_DATABASE: joi.string().required(),
    DB_PORT: joi.number().required(),
    EX_HOST: joi.string().required(),
    EX_TCP_PORT: joi.number().required(),
  }),
  envFilePath: './apps/loans/.env',
});

const ExchangeConfigModule = ConfigModule.forRoot({
  isGlobal: true,
  validationSchema: joi.object({
    EX_TCP_PORT: joi.number().required(),
    EX_OXR_URI: joi.string().required(),
    EX_OXR_APP_ID: joi.string().required(),
    EX_BASE_CURRENCY: joi.string().required(),
    EX_CACHE_TIMEOUT: joi.number().required(),
  }),
  envFilePath: './apps/exchange/.env',
});

@Module({
  imports: [ConfigModule, GatewayConfigModule, LoansConfigModule, ExchangeConfigModule],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigModule, AppConfigService],
})
export class AppConfigModule {}
