import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GatewayModule } from './gateway.module';
import { AppConfigService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.useGlobalPipes(new ValidationPipe());

  SwaggerModule.setup(
    'swagger',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Loan Enquiry service API')
        .setDescription('Test app for a Full Stack Developer position')
        .setVersion('1.0')
        .addTag('enquiry')
        .build(),
    ),
  );

  const config = app.get(AppConfigService);
  await app.listen(config.gateway.GATEWAY_HTTP_PORT);
}
bootstrap();
