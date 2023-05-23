import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { LoanYear } from '../interfaces/loan-year';

export class GetDefaultedByYearRequest implements LoanYear {
  constructor(partial: Partial<GetDefaultedByYearRequest>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  year: number;
}
