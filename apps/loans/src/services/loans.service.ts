import {
  EXCHANGE_TCP_CLIENT,
  GetDistributionResponse,
  GetLoansRequest,
  GetRateRequest,
  LoanEntity,
  cmdGetRate,
} from '@app/common';
import { GetDistributionRequest } from '@app/common/dtos/get-distribution-request.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as moment from 'moment';
import { lastValueFrom as promise } from 'rxjs';
import { DataSource, ILike, Repository } from 'typeorm';

@Injectable()
export class LoansService {
  private loanRepository: Repository<LoanEntity> = undefined;

  constructor(
    private readonly dataSource: DataSource,
    @Inject(EXCHANGE_TCP_CLIENT) private readonly exchangeClient: ClientProxy,
  ) {
    this.loanRepository = this.dataSource.getRepository(LoanEntity);
  }

  async getLoanById(loanId: number): Promise<LoanEntity> {
    return await this.loanRepository.findOne({
      where: {
        id: loanId,
      },
    });
  }

  async getDefaultedLoanByYear(year: number): Promise<LoanEntity[]> {
    return await this.loanRepository
      .createQueryBuilder('loan')
      .leftJoinAndSelect('loan.balance', 'balance')
      .where({ balance: { default: true } })
      .andWhere(`EXTRACT(YEAR FROM loan.loanDate) = :year`, { year })
      .select()
      .getMany();
  }

  async getRate(request: GetRateRequest): Promise<number> {
    return await promise(this.exchangeClient.send({ cmd: cmdGetRate }, request));
  }

  async getDistribution(request: GetDistributionRequest): Promise<GetDistributionResponse> {
    const from = moment(request.from).format('YYYY-MM-DD');
    const to = moment(request.to).format('YYYY-MM-DD');

    const totalCount = await this.loanRepository
      .createQueryBuilder('loan')
      .where(`loan.loanDate >= :from AND loan.loanDate < :to`, { from, to })
      .select()
      .getCount();

    const defaultedCount = await this.loanRepository
      .createQueryBuilder('loan')
      .leftJoinAndSelect('loan.balance', 'balance')
      .where({ balance: { default: true } })
      .andWhere(`loan.loanDate >= :from AND loan.loanDate < :to`, { from, to })
      .select()
      .getCount();

    const defaultedPercent = totalCount === 0 ? 0 : Math.round((100 * defaultedCount) / totalCount);

    return {
      totalCount,
      defaultedCount,
      defaultedPercent,
      nonDefaultedPercent: totalCount === 0 ? 0 : 100 - defaultedPercent,
    };
  }

  async getLoans(request: GetLoansRequest): Promise<LoanEntity[]> {
    let query = this.loanRepository
      .createQueryBuilder('loan')
      .leftJoinAndSelect('loan.balance', 'balance')
      .leftJoinAndSelect('loan.customer', 'customer')
      .where(`EXTRACT(YEAR FROM loan.loanDate) = :year`, { year: request.year });

    if (request.age > 0) {
      query = query.andWhere({ customer: { age: request.age } });
    }

    if (request.education) {
      query = query.andWhere({ customer: { education: ILike(`%${request.education || ''}%`) } });
    }

    if (request.job) {
      query = query.andWhere({ customer: { job: ILike(`%${request.job || ''}%`) } });
    }

    if (request.marital) {
      query = query.andWhere({ customer: { marital: ILike(`%${request.marital || ''}%`) } });
    }

    if (request.default !== undefined) {
      query = query.andWhere({ balance: { default: request.default } });
    }

    return query.select().getMany();
  }
}
