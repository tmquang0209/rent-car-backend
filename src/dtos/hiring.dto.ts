import { EHiringStatus } from '@common/enums';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { PaginationDto } from './pagination.dto';
import { VehicleInfoDto } from './vehicle.dto';

export class HiringInfoDto {
  readonly id: string;
  readonly vehicle: VehicleInfoDto;
  readonly userId: string;
  readonly startDate: Date;
  readonly endDate: Date;
  readonly pickupLocation: string;
  readonly dropoffLocation: string;
  readonly totalPrice: number;
  readonly status: EHiringStatus;
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
  @IsUUID('4')
  readonly vehicleId: string;

  @IsUUID('4')
  readonly renterId: string;

  @IsString()
  readonly pickupLocation: string;

  @IsString()
  readonly dropoffLocation: string;
}
