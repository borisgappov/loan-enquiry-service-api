import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { TransformFnParams } from 'class-transformer';

export const getTcpClientProvider = (name: string, configHost: string, configPort: string): Provider => ({
  provide: name,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: configService.get<string>(configHost),
        port: Number(configService.get<string>(configPort)),
      },
    }),
});

export const BooleanTransform = (params: TransformFnParams) =>
  params.value ? String(params.value).toLowerCase().trim() === 'true' : false;
