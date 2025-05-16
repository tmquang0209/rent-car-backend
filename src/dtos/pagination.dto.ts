import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  readonly page: number;

  @IsOptional()
  @IsNumber()
  readonly pageSize: number;
}

export class PaginationResponseDto<T> {
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
  readonly data: T[];
}
