import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { PaginationDto, PaginationResponseDto } from './pagination.dto';

export class CategoryInfoDto {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly isActive: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export class CategoryCreateDto {
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsBoolean()
  readonly isActive: boolean;
}

export class CategoryUpdateDto extends CategoryCreateDto {
  @IsString()
  readonly id: string;
}

export class CategoryDetailDto {
  @IsString()
  readonly id: string;
}
export class CategoryDeleteDto extends CategoryDetailDto {}

export class CategoryListRequestDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsBoolean()
  readonly isActive: boolean;
}

export class CategoryListResponseDto extends PaginationResponseDto<CategoryInfoDto> {}
