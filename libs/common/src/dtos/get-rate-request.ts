import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetRateRequest {
  constructor(partial: Partial<GetRateRequest>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @IsString()
  currency: string;
}
