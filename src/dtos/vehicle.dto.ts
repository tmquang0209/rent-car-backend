import { EFuelType, ETransmission, EVehicleStatus } from '@common/enums';
import { OwnerInfoDto, PaginationDto } from '@dto';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class VehicleInfoDto {
  readonly id: string;
  readonly ownerId: OwnerInfoDto;
  readonly name: string;
  readonly brand: string;
  readonly model: string;
  readonly year: number;
  readonly licensePlate: string;
  readonly location: string;
  readonly seats: number;
  readonly transmission: ETransmission;
  readonly fuelType: EFuelType;
  readonly pricePerDay: number;
  readonly description: string;
  readonly title: string;
  readonly isActive: boolean;
  readonly status: EVehicleStatus;
}

export class VehicleCreateDto {
  @IsUUID('4')
  readonly ownerId: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  @IsString()
  readonly model: string;

  @IsNumber()
  readonly year: number;

  @IsString()
  readonly licensePlate: string;

  @IsString()
  readonly location: string;

  @IsNumber()
  readonly seats: number;

  @IsString()
  @IsIn([...Object.values(ETransmission)])
  readonly transmission: ETransmission;

  @IsString()
  @IsIn([...Object.values(EFuelType)])
  readonly fuelType: EFuelType;

  @IsNumber()
  @Min(0)
  readonly pricePerDay: number;

  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  @IsIn([...Object.values(EVehicleStatus)])
  readonly status: EVehicleStatus;

  @IsString({ each: true })
  readonly categories: string[];
}

export class VehicleUpdateDto extends VehicleCreateDto {
  @IsUUID('4')
  readonly id: string;
}

export class VehicleDeleteDto {
  @IsUUID('4')
  readonly id: string;
}

export class VehicleListRequestDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly brand: string;

  @IsOptional()
  @IsString()
  readonly model: string;

  @IsOptional()
  @IsString()
  readonly licensePlate: string;

  @IsOptional()
  @IsString()
  readonly location: string;

  @IsOptional()
  @IsIn([...Object.values(ETransmission)])
  readonly transmission: ETransmission;

  @IsOptional()
  @IsIn([...Object.values(EFuelType)])
  readonly fuelType: EFuelType;

  @IsOptional()
  @IsIn([...Object.values(EVehicleStatus)])
  readonly status: EVehicleStatus;
}
