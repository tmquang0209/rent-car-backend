import { EReviewStatus } from '@common/enums';
import { HiringInfoDto, PaginationDto, ReviewerInfoDto } from '@dto';
import { IsNumber, IsString, IsUUID, Max, Min } from 'class-validator';

export class ReviewInfoDto {
  readonly id: string;
  readonly hiring: HiringInfoDto;
  readonly reviewer: ReviewerInfoDto;
  readonly rating: number;
  readonly comment: string;
  readonly status: EReviewStatus;
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

export class ReviewListRequestDto extends PaginationDto {
  @IsUUID('4')
  readonly hiringId: HiringInfoDto;

  @IsUUID('4')
  readonly reviewer: ReviewerInfoDto;

  @IsString()
  readonly status: EReviewStatus;
}
