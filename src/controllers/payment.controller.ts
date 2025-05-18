import { ResponseMessage } from '@common/decorators';
import { PaymentCreateDto, PaymentInfoDto } from '@dto/payment.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from '@services';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create')
  @ResponseMessage('Thanh toán thành công')
  async createPayment(
    @Body() payment: PaymentCreateDto,
  ): Promise<PaymentInfoDto> {
    return this.paymentService.createPayment(payment);
  }
}
