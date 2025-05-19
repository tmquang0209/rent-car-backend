import { EHiringStatus } from '@common/enums';
import { RenterInfoDto, VehicleInfoDto } from '@dto';
import { PaginationDto, PaginationResponseDto } from '@dto/pagination.dto';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class HiringInfoDto {
  readonly id: string;
  readonly vehicle: Omit<
    VehicleInfoDto,
    | 'owner'
    | 'reviews'
    | 'categories'
    | 'status'
    | 'isActive'
    | 'averageRating'
    | 'createdAt'
    | 'updatedAt'
    | 'title'
    | 'description'
  >;
  readonly renter: RenterInfoDto;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly pickupLocation: string;
  readonly dropoffLocation: string;
  readonly totalPrice: number;
  readonly status: EHiringStatus;
  readonly extraInfo: Record<string, string | number | boolean>;
}

export class HiringCreateDto {
  @IsUUID('4')
  readonly vehicleId: string;

  @IsUUID('4')
  readonly renterId: string;

  @IsDate()
  readonly startDate: Date;

  @IsDate()
  readonly endDate: Date;

  @IsString()
  readonly pickupLocation: string;

  @IsString()
  readonly dropoffLocation: string;

  @IsNumber()
  readonly totalPrice: number;

  @IsOptional()
  @IsArray()
  readonly extraInfo: Record<string, string | number | boolean>;
}

export class HiringUpdateDto extends HiringCreateDto {
  @IsUUID('4')
  readonly id: string;
}

export class HiringDeleteDto {
  @IsUUID('4')
  readonly id: string;
}

export class HiringListRequestDto extends PaginationDto {
  @IsOptional()
  @IsUUID('4')
  readonly vehicleId: string;

  @IsOptional()
  @IsUUID('4')
  readonly renterId: string;

  @IsOptional()
  @IsString()
  readonly pickupLocation: string;

  @IsOptional()
  @IsString()
  readonly dropoffLocation: string;
}

export class HiringListResponseDto extends PaginationResponseDto<HiringInfoDto> {}
