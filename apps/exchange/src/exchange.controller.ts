import { cmdGetRate } from '@app/common';
import { GetRateRequest } from '@app/common/dtos/get-rate-request';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ExchangeService } from './exchange.service';

@Controller()
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @MessagePattern({ cmd: cmdGetRate })
  async getRate(request: GetRateRequest): Promise<number> {
    return await this.exchangeService.getRate(request.currency);
  }
}
