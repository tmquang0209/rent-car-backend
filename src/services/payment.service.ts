import { PaymentCreateDto, PaymentInfoDto } from '@dto/payment.dto';
import { PaymentEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(PaymentEntity)
    private readonly paymentModel: typeof PaymentEntity,
  ) {}

  async createPayment(payment: PaymentCreateDto): Promise<PaymentInfoDto> {
    const randomTransactionId = Math.floor(Math.random() * 1000000);

    const createdPayment = await this.paymentModel.create({
      ...payment,
      transactionId: randomTransactionId,
    } as unknown as PaymentEntity);
    return createdPayment as unknown as PaymentInfoDto;
  }
}
