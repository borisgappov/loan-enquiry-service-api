import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { LoanYear } from '../interfaces/loan-year';
import { BooleanTransform } from '../shared/tools';

export class GetLoansRequest implements LoanYear {
  constructor(partial: Partial<GetLoansRequest>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  year: number;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
  age: number;

  @ApiPropertyOptional()
  @Type(() => String)
  @IsOptional()
  job: string;

  @ApiPropertyOptional()
  @Type(() => String)
  @IsOptional()
  marital: string;

  @ApiPropertyOptional()
  @Type(() => String)
  @IsOptional()
  education: string;

  @ApiPropertyOptional()
  @Transform(BooleanTransform)
  @IsOptional()
  default: boolean;
}
