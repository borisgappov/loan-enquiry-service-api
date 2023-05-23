import { AppConfigModule, getTcpClientProvider, LOANS_HOST, LOANS_TCP_CLIENT, LOANS_TCP_PORT } from '@app/common';
import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';

@Module({
  imports: [AppConfigModule],
  controllers: [GatewayController],
  providers: [GatewayService, getTcpClientProvider(LOANS_TCP_CLIENT, LOANS_HOST, LOANS_TCP_PORT)],
})
export class GatewayModule {}
