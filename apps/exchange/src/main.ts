import { AppConfigService, LOCAL } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { ExchangeModule } from './exchange.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ExchangeModule);
  const config = app.get(AppConfigService);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: { host: LOCAL, port: config.exchange.EX_TCP_PORT },
  });

  await app.startAllMicroservices();
}
bootstrap();
