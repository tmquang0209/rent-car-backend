import { PaginationDto } from '@dto';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MinLength,
} from 'class-validator';

export class OwnerInfoDto {
  readonly id: string;
  readonly fullName: string;
  readonly email: string;
  readonly phoneNumber: string;
}

export class RenterInfoDto {
  readonly id: string;
  readonly fullName: string;
  readonly email: string;
  readonly phoneNumber: string;
}

export class ReviewerInfoDto {
  readonly id: string;
  readonly fullName: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly fullName: string;

  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsOptional()
  @IsString()
  readonly phoneNumber: string;

  @IsOptional()
  @IsDate()
  readonly birthday: Date;

  @IsOptional()
  @IsString()
  readonly address: string;

  @IsOptional()
  @IsUUID()
  readonly roleId: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly fullName: string;

  @IsOptional()
  @IsString()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly phoneNumber: string;

  @IsOptional()
  @IsDate()
  readonly birthday: Date;

  @IsOptional()
  @IsString()
  readonly address: string;

  @IsOptional()
  @IsUUID()
  readonly roleId: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly id: string;
}

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty({ message: 'Old password cannot be empty' })
  oldPassword: string;

  @IsNotEmpty({ message: 'New password cannot be empty' })
  @IsString()
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message: `Must contain at least 8 characters, one lowercase letter, one uppercase letter, one digit, one special character(!,@,#,$,%,...)`,
    },
  )
  @Transform(({ value }: TransformFnParams) => value?.trim())
  newPassword: string;
}

export class UserListDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly id?: string;

  @IsOptional()
  @IsString()
  readonly fullName: string;

  @IsOptional()
  @IsString()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly phoneNumber: string;

  @IsOptional()
  @IsDate()
  readonly birthday: Date;

  @IsOptional()
  @IsString()
  readonly address: string;

  @IsOptional()
  @IsString()
  readonly status: string;

  @IsOptional()
  @IsString()
  readonly role: string;
}
