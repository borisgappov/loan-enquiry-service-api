import {
  CustomerEntity,
  EXCHANGE_TCP_CLIENT,
  EX_HOST,
  EX_TCP_PORT,
  LoanBalanceEntity,
  LoanEntity,
  getTcpClientProvider,
} from '@app/common';
import { AppConfigModule } from '@app/common/app-config/app-config.module';
import { AppConfigService } from '@app/common/app-config/app-config.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoansController } from './loans.controller';
import { LoansService } from './services/loans.service';
import { SeedService } from './services/seed-service';

@Module({
  imports: [
    AppConfigModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (config: AppConfigService) => ({
        type: config.loans.DB_CONNECTION,
        host: config.loans.DB_HOST,
        port: config.loans.DB_PORT,
        username: config.loans.DB_USERNAME,
        password: config.loans.DB_PASSWORD,
        database: config.loans.DB_DATABASE,
        entities: [LoanEntity, LoanBalanceEntity, CustomerEntity],
        migrations: ['apps/loans/src/migrations/**/*.js'],
        synchronize: false,
        migrationsRun: true,
      }),
      inject: [AppConfigService],
    }),
  ],
  controllers: [LoansController],
  providers: [LoansService, SeedService, getTcpClientProvider(EXCHANGE_TCP_CLIENT, EX_HOST, EX_TCP_PORT)],
})
export class LoansModule {}
