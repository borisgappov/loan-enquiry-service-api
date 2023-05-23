import {
  GetDefaultedByYearAndCurrencyRequest,
  GetDefaultedByYearRequest,
  GetDistributionResponse,
  GetLoanByIdRequest,
  GetLoansRequest,
  LOANS_TCP_CLIENT,
  LoanEntity,
  cmdGetById,
  cmdGetDefaultedByYear,
  cmdGetDefaultedByYearAndCurrency,
  cmdGetDistribution,
  cmdGetLoans,
} from '@app/common';
import { GetDistributionRequest } from '@app/common/dtos/get-distribution-request.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom as promise } from 'rxjs';

@Injectable()
export class GatewayService {
  constructor(@Inject(LOANS_TCP_CLIENT) private readonly loansClient: ClientProxy) {}

  async getLoanById(request: GetLoanByIdRequest): Promise<LoanEntity> {
    return await promise(this.loansClient.send({ cmd: cmdGetById }, request));
  }

  async getDefaultedLoanByYear(request: GetDefaultedByYearRequest): Promise<LoanEntity[]> {
    return await promise(this.loansClient.send({ cmd: cmdGetDefaultedByYear }, request));
  }

  async getDefaultedLoanByYearAndCurrency(request: GetDefaultedByYearAndCurrencyRequest): Promise<LoanEntity[]> {
    return await promise(this.loansClient.send({ cmd: cmdGetDefaultedByYearAndCurrency }, request));
  }

  async getDistribution(request: GetDistributionRequest): Promise<GetDistributionResponse> {
    return await promise(this.loansClient.send({ cmd: cmdGetDistribution }, request));
  }

  async getLoans(request: GetLoansRequest): Promise<LoanEntity[]> {
    return await promise(this.loansClient.send({ cmd: cmdGetLoans }, request));
  }
}
