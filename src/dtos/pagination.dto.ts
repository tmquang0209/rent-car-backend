import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  readonly page: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  readonly pageSize: number;
}

export class PaginationResponseDto<T> {
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
  readonly data: T[];
}
