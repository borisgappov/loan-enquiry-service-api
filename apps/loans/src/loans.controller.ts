import {
  GetDefaultedByYearAndCurrencyRequest,
  GetDefaultedByYearRequest,
  GetDistributionResponse,
  GetLoanByIdRequest,
  GetLoansRequest,
  LoanEntity,
  cmdGetById,
  cmdGetDefaultedByYear,
  cmdGetDefaultedByYearAndCurrency,
  cmdGetDistribution,
  cmdGetLoans,
} from '@app/common';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { LoansService } from './services/loans.service';
import { GetDistributionRequest } from '@app/common/dtos/get-distribution-request.dto';

@Controller()
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @MessagePattern({ cmd: cmdGetById })
  async sendMail(request: GetLoanByIdRequest): Promise<LoanEntity> {
    return await this.loansService.getLoanById(request.loanId);
  }

  @MessagePattern({ cmd: cmdGetDefaultedByYear })
  async getDefaultedLoanByYear(request: GetDefaultedByYearRequest): Promise<LoanEntity[]> {
    return await this.loansService.getDefaultedLoanByYear(request.year);
  }

  @MessagePattern({ cmd: cmdGetDefaultedByYearAndCurrency })
  async getDefaultedLoanByYearAndCurrency(request: GetDefaultedByYearAndCurrencyRequest): Promise<LoanEntity[]> {
    const loans = await this.loansService.getDefaultedLoanByYear(request.year);
    const rate = await this.loansService.getRate({ currency: request.currency });
    loans.forEach((e) => (e.balance.balance = e.balance.balance * rate));
    return loans;
  }

  @MessagePattern({ cmd: cmdGetDistribution })
  async getDistribution(request: GetDistributionRequest): Promise<GetDistributionResponse> {
    return await this.loansService.getDistribution(request);
  }

  @MessagePattern({ cmd: cmdGetLoans })
  async getLoans(request: GetLoansRequest): Promise<LoanEntity[]> {
    return await this.loansService.getLoans(request);
  }
}
