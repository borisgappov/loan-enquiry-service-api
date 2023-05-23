import { ApiProperty } from '@nestjs/swagger';

export class GetDistributionResponse {
  constructor(partial: Partial<GetDistributionResponse>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  defaultedCount: number;

  @ApiProperty()
  totalCount: number;

  @ApiProperty()
  defaultedPercent: number;

  @ApiProperty()
  nonDefaultedPercent: number;
}
