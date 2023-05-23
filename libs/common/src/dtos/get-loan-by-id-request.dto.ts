import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class GetLoanByIdRequest {
  constructor(partial: Partial<GetLoanByIdRequest>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  loanId: number;
}
