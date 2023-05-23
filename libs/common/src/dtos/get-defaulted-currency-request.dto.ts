import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { LoanYear } from '../interfaces/loan-year';

export class GetDefaultedByYearAndCurrencyRequest implements LoanYear {
  constructor(partial: Partial<GetDefaultedByYearAndCurrencyRequest>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  year: number;

  @ApiProperty()
  @IsString()
  currency: string;
}
