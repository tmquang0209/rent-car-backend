import { EPaymentMethod, EPaymentStatus } from '@common/enums';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class PaymentCreateDto {
  @IsUUID('4')
  hiringId: string;

  @IsString()
  @IsIn(Object.values(EPaymentMethod))
  paymentMethod: EPaymentMethod;

  @IsOptional()
  @IsString()
  @IsIn(Object.values(EPaymentStatus))
  status: EPaymentStatus;

  @IsNumber()
  @Min(0)
  amount: number;
}

export class PaymentUpdateDto extends PaymentCreateDto {
  @IsUUID('4')
  id: string;
}

export class PaymentDeleteDto {
  @IsUUID('4')
  id: string;
}
export class PaymentInfoDto {
  readonly id: string;
  readonly hiringId: string;
  readonly method: EPaymentMethod;
  readonly status: EPaymentStatus;
  readonly amount: number;
}
