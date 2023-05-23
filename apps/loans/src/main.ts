import { AppConfigService, LOCAL } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { LoansModule } from './loans.module';
import { SeedService } from './services/seed-service';

async function bootstrap() {
  const app = await NestFactory.create(LoansModule);
  const seedService = app.get(SeedService);
  await seedService.seed();

  const config = app.get(AppConfigService);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: { host: LOCAL, port: config.loans.LOANS_TCP_PORT },
  });

  await app.startAllMicroservices();
}
bootstrap();
