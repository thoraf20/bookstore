import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddBookDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  isbn: string;
}

export class UpdateBookDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  isbn: string;
}
