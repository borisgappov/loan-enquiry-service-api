import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class GetDistributionRequest {
  constructor(partial: Partial<GetDistributionRequest>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  from: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  to: Date;
}
