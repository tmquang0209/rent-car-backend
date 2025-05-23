import { EReviewStatus } from '@common/enums';
import {
  HiringInfoDto,
  PaginationDto,
  PaginationResponseDto,
  ReviewerInfoDto,
} from '@dto';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class ReviewInfoDto {
  readonly id: string;
  readonly hiring: HiringInfoDto;
  readonly reviewer: ReviewerInfoDto;
  readonly rating: number;
  readonly comment: string;
  readonly status: EReviewStatus;
  readonly createdAt: Date;
}

export class ReviewCreateDto {
  @IsUUID('4')
  readonly hiringId: string;

  @IsUUID('4')
  readonly reviewerId: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  readonly rating: number;

  @IsString()
  readonly comment: string;
}

export class ReviewApproveDto {
  @IsUUID('4')
  readonly id: string;

  @IsString()
  readonly status: EReviewStatus;
}

export class ReviewDeleteDto {
  @IsUUID('4')
  readonly id: string;
}

export class ReviewInfo {
  readonly id: string;
  readonly fullName: string;
  readonly rating: number;
  readonly comment: string;
}

export class ReviewListRequestDto extends PaginationDto {
  @IsOptional()
  @IsUUID('4')
  readonly hiringId?: HiringInfoDto;

  @IsUUID('4')
  readonly vehicleId?: string;

  @IsOptional()
  @IsUUID('4')
  readonly reviewer?: ReviewerInfoDto;

  @IsOptional()
  @IsString()
  readonly status?: EReviewStatus;
}

export class ReviewListResponseDto extends PaginationResponseDto<ReviewInfoDto> {}
