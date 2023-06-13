import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class QueryParams {
  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  limit?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Type(() => String)
  @IsString()
  search?: string;
}
