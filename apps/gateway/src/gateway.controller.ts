import {
  GetDefaultedByYearAndCurrencyRequest,
  GetDefaultedByYearRequest,
  GetDistributionResponse,
  GetLoanByIdRequest,
  GetLoansRequest,
  LoanEntity,
} from '@app/common';
import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GetDistributionRequest } from '@app/common/dtos/get-distribution-request.dto';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get('loans/id')
  async getLoanById(@Query() request: GetLoanByIdRequest): Promise<LoanEntity> {
    return await this.gatewayService.getLoanById(request);
  }

  @Get('loans/defaulted')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getDefaultedLoanByYear(@Query() request: GetDefaultedByYearRequest): Promise<LoanEntity[]> {
    return await this.gatewayService.getDefaultedLoanByYear(request);
  }

  @Get('loans/defaultedcurrency')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getDefaultedLoanByYearAndCurrency(
    @Query() request: GetDefaultedByYearAndCurrencyRequest,
  ): Promise<LoanEntity[]> {
    return await this.gatewayService.getDefaultedLoanByYearAndCurrency(request);
  }

  @Get('loans/distribution')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getDistribution(@Query() request: GetDistributionRequest): Promise<GetDistributionResponse> {
    return await this.gatewayService.getDistribution(request);
  }

  @Get('loans')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getLoans(@Query() request: GetLoansRequest): Promise<LoanEntity[]> {
    return await this.gatewayService.getLoans(request);
  }
}
