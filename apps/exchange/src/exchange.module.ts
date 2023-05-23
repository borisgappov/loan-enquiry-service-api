import { AppConfigModule } from '@app/common';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ExchangeController } from './exchange.controller';
import { ExchangeService } from './exchange.service';

@Module({
  imports: [AppConfigModule, CacheModule.register()],
  controllers: [ExchangeController],
  providers: [ExchangeService],
})
export class ExchangeModule {}
