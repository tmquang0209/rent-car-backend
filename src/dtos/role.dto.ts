import { IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  readonly code: string;

  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString({ each: true })
  readonly permissions: string[];
}

export class UpdateRoleDto extends CreateRoleDto {
  @IsString()
  readonly id: string;
}
